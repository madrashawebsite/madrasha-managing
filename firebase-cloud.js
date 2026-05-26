// ===== Firebase Cloud Backup Module (Auto-Sync) =====
// Handles Google Auth, Firestore auto-sync, and cloud restore.
// Data automatically syncs to cloud whenever localStorage changes.

(function () {
    'use strict';

    // --- Firebase Configuration ---
    const firebaseConfig = {
        apiKey: "AIzaSyApQjIn74w7uEQ5UXetBKG58gFeDnRqcOk",
        authDomain: "madrasha-a6a28.firebaseapp.com",
        projectId: "madrasha-a6a28",
        storageBucket: "madrasha-a6a28.firebasestorage.app",
        messagingSenderId: "980330803283",
        appId: "1:980330803283:web:669ecccfc4ab2c6e82d6a6",
        measurementId: "G-TGX09B0BB0"
    };

    // --- Initialize Firebase ---
    let app, auth, db;
    try {
        app = firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();

        // Enable offline persistence for Firestore
        db.enablePersistence({ synchronizeTabs: true }).catch(err => {
            console.warn('Firestore persistence error:', err.code);
        });

        // Handle redirect result to show errors or success
        auth.getRedirectResult().then((result) => {
            if (result && result.user) {
                if (typeof showToast === 'function') showToast('✅ সাইন ইন সফল! অটো-সিঙ্ক চালু।');
            }
        }).catch((e) => {
            console.error('Redirect sign in error:', e);
            if (e.code === 'auth/unauthorized-domain') {
                if (typeof showToast === 'function') showToast('⚠️ এই ডোমেইন authorize নেই। Firebase Console → Settings → Authorized domains এ github.io ডোমেইন যোগ করুন।');
            } else {
                if (typeof showToast === 'function') showToast('❌ সাইন ইন ব্যর্থ: ' + e.message);
            }
        });

        console.log('✅ Firebase initialized (Auto-Sync Mode)');
    } catch (e) {
        console.error('❌ Firebase init failed:', e);
    }

    // --- Storage Keys to watch ---
    const SYNC_KEYS = {
        students: 'cc_students',
        classes: 'cc_classes',
        customFields: 'cc_custom_fields',
        hiddenFixedFields: 'cc_hidden_fixed_fields',
        feeTypes: 'cc_fee_types',
        instituteInfo: 'cc_institute_info',
        feePayments: 'cc_fee_payments',
        currentCollector: 'cc_current_collector',
        photoNames: 'cc_photo_names',
        expenses: 'cc_expenses',
        incomes: 'cc_incomes',
        expenseTypes: 'cc_expense_types',
        incomeTypes: 'cc_income_types',
        sortConfig: 'cc_sort_config'
    };

    const SYNC_KEY_SET = new Set(Object.values(SYNC_KEYS));

    // --- Auto-Sync State ---
    let syncTimer = null;
    let isSyncing = false;
    let pendingSync = false;
    let lastSyncTime = 0;
    const SYNC_DELAY = 3000; // 3 seconds debounce
    const MIN_SYNC_INTERVAL = 10000; // Minimum 10 seconds between syncs

    // --- Intercept localStorage.setItem for auto-sync ---
    const originalSetItem = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function (key, value) {
        // Call original first
        originalSetItem(key, value);

        // If this key is one of our app keys and user is signed in, trigger sync
        if (SYNC_KEY_SET.has(key) && auth.currentUser) {
            scheduleSyncToCloud();
        }
    };

    // --- Schedule debounced sync ---
    function scheduleSyncToCloud() {
        if (syncTimer) clearTimeout(syncTimer);

        pendingSync = true;
        updateSyncIndicator('pending');

        syncTimer = setTimeout(() => {
            syncToCloud();
        }, SYNC_DELAY);
    }

    // --- Sync all data to Firestore ---
    async function syncToCloud(force = false) {
        const user = auth.currentUser;
        if (!user || isSyncing) {
            if (isSyncing && !force) pendingSync = true;
            return;
        }

        // Rate limiting
        const now = Date.now();
        if (!force && now - lastSyncTime < MIN_SYNC_INTERVAL) {
            syncTimer = setTimeout(() => syncToCloud(), MIN_SYNC_INTERVAL - (now - lastSyncTime));
            return;
        }

        isSyncing = true;
        pendingSync = false;
        updateSyncIndicator('syncing');

        try {
            // Collect all data
            const syncData = {};
            for (const [name, key] of Object.entries(SYNC_KEYS)) {
                const raw = localStorage.getItem(key);
                if (raw) {
                    try {
                        syncData[name] = JSON.parse(raw);
                    } catch (e) {
                        syncData[name] = raw;
                    }
                }
            }

            // Add metadata
            syncData._meta = {
                timestamp: new Date().toISOString(),
                deviceInfo: navigator.userAgent.substring(0, 100),
                appVersion: localStorage.getItem('cc_app_version') || '2.1',
                totalStudents: (syncData.students || []).length,
                totalClasses: (syncData.classes || []).length
            };

            // Check data size
            const dataStr = JSON.stringify(syncData);
            const sizeKB = Math.round(dataStr.length / 1024);

            if (sizeKB > 900) {
                // Chunked upload for large data
                await uploadChunked(user.uid, syncData);
            } else {
                // Single document
                await db.collection('users').doc(user.uid)
                    .collection('backups').doc('latest')
                    .set(syncData);
            }

            // Update user doc with timestamp
            const nowISO = new Date().toISOString();
            await db.collection('users').doc(user.uid).set({
                lastBackup: nowISO,
                email: user.email,
                name: user.displayName
            }, { merge: true });

            lastSyncTime = Date.now();
            updateLastBackupLabel(nowISO);
            updateSyncIndicator('synced');

            console.log(`☁️ Auto-synced (${sizeKB} KB)`);

        } catch (e) {
            console.error('Auto-sync failed:', e);
            updateSyncIndicator('error');
        } finally {
            isSyncing = false;

            // If there were changes during sync, sync again
            if (pendingSync) {
                setTimeout(() => syncToCloud(), SYNC_DELAY);
            }
        }
    }

    // --- Chunked upload for large data ---
    async function uploadChunked(uid, data) {
        const dataStr = JSON.stringify(data);
        const CHUNK_SIZE = 800 * 1024;
        const chunks = [];

        for (let i = 0; i < dataStr.length; i += CHUNK_SIZE) {
            chunks.push(dataStr.substring(i, i + CHUNK_SIZE));
        }

        const batch = db.batch();
        const backupRef = db.collection('users').doc(uid).collection('backups');

        // Clear old chunks
        const oldChunks = await backupRef.where('__isChunk', '==', true).get();
        oldChunks.forEach(doc => batch.delete(doc.ref));

        // Write new chunks
        for (let i = 0; i < chunks.length; i++) {
            const chunkRef = backupRef.doc(`chunk_${i}`);
            batch.set(chunkRef, {
                __isChunk: true,
                __chunkIndex: i,
                __totalChunks: chunks.length,
                data: chunks[i]
            });
        }

        // Metadata doc
        batch.set(backupRef.doc('latest'), {
            __isChunked: true,
            __totalChunks: chunks.length,
            _meta: data._meta
        });

        await batch.commit();
    }

    // --- Update Sync Indicator in sidebar ---
    function updateSyncIndicator(state) {
        const label = document.getElementById('cloud-last-backup');
        const indicator = document.getElementById('cloud-sync-indicator');
        if (!indicator) return;

        const states = {
            pending: { icon: '🟡', text: 'সিঙ্ক হচ্ছে...', color: 'text-yellow-600', animate: true },
            syncing: { icon: '🔄', text: 'আপলোড হচ্ছে...', color: 'text-blue-600', animate: true },
            synced: { icon: '✅', text: 'সিঙ্ক সম্পন্ন', color: 'text-green-600', animate: false },
            error: { icon: '❌', text: 'সিঙ্ক ব্যর্থ', color: 'text-red-500', animate: false },
            offline: { icon: '📴', text: 'অফলাইন', color: 'text-gray-400', animate: false }
        };

        const s = states[state] || states.synced;
        indicator.innerHTML = `<span class="${s.color} text-[10px] font-bold ${s.animate ? 'animate-pulse' : ''}">${s.icon} ${s.text}</span>`;

        // Auto-hide success after 5 seconds
        if (state === 'synced') {
            setTimeout(() => {
                if (indicator) indicator.innerHTML = `<span class="text-green-500 text-[10px]">☁️ অটো-সিঙ্ক চালু</span>`;
            }, 5000);
        }
    }

    // --- Auth State Listener ---
    auth.onAuthStateChanged(async function (user) {
        updateCloudUI(user);
        if (user) {
            // Load last backup time
            loadLastBackupTime(user.uid);

            // Auto-restore if local data is empty (new device / cleared browser)
            const hasLocalData = localStorage.getItem(SYNC_KEYS.students);
            const autoRestored = sessionStorage.getItem('cc_auto_restored');
            
            if (!autoRestored && (!hasLocalData || hasLocalData === '[]' || hasLocalData === 'null')) {
                sessionStorage.setItem('cc_auto_restored', 'true');
                await autoRestoreFromCloud(user.uid);
            } else {
                // Do an initial sync of current data
                setTimeout(() => syncToCloud(), 2000);
            }
        }
    });

    // --- Auto Restore from cloud (on sign in with empty data) ---
    async function autoRestoreFromCloud(uid) {
        try {
            const latestDoc = await db.collection('users').doc(uid)
                .collection('backups').doc('latest').get();

            if (!latestDoc.exists) return;

            let backupData;
            const latestData = latestDoc.data();

            if (latestData.__isChunked) {
                const totalChunks = latestData.__totalChunks;
                let fullStr = '';
                for (let i = 0; i < totalChunks; i++) {
                    const chunkDoc = await db.collection('users').doc(uid)
                        .collection('backups').doc(`chunk_${i}`).get();
                    if (chunkDoc.exists) fullStr += chunkDoc.data().data;
                }
                backupData = JSON.parse(fullStr);
            } else {
                backupData = latestData;
            }

            const meta = backupData._meta || {};
            // Restore if there's any data in backup (not just students)
            if (backupData && Object.keys(backupData).length > 0) {
                // Restore all keys
                for (const [name, key] of Object.entries(SYNC_KEYS)) {
                    if (backupData[name] !== undefined) {
                        originalSetItem(key, JSON.stringify(backupData[name]));
                        if (typeof ShadowStorage !== 'undefined' && typeof ShadowStorage.save === 'function') {
                            ShadowStorage.save(key, backupData[name]);
                        }
                    }
                }

                if (typeof showToast === 'function') {
                    showToast(`☁️ ক্লাউড থেকে ডাটা অটো-রিস্টোর হয়েছে!`);
                }

                // Reload to apply data
                setTimeout(() => window.location.reload(), 1500);
            }
        } catch (e) {
            console.error('Auto-restore failed:', e);
        }
    }

    // --- Google Sign In ---
    window.cloudSignIn = async function () {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            
            // Check if mobile, WebView, or file protocol to use Redirect instead of Popup
            const isMobileOrWebView = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.location.protocol === 'file:';
            
            if (isMobileOrWebView) {
                if (typeof showToast === 'function') showToast('🔄 গুগল সাইন-ইন পেজে নিয়ে যাওয়া হচ্ছে...');
                await auth.signInWithRedirect(provider);
            } else {
                await auth.signInWithPopup(provider);
                if (typeof showToast === 'function') showToast('✅ সাইন ইন সফল! অটো-সিঙ্ক চালু।');
            }
        } catch (e) {
            console.error('Sign in error:', e);
            if (e.code === 'auth/popup-closed-by-user') {
                if (typeof showToast === 'function') showToast('সাইন ইন বাতিল করা হয়েছে');
            } else if (e.code === 'auth/unauthorized-domain') {
                if (typeof showToast === 'function') showToast('⚠️ এই ডোমেইন authorize নেই। Firebase Console → Authentication → Settings → Authorized domains এ এই ডোমেইন যোগ করুন।');
            } else {
                if (typeof showToast === 'function') showToast('❌ সাইন ইন ব্যর্থ: ' + e.message);
            }
        }
    };

    // --- Google Sign Out ---
    window.cloudSignOut = async function () {
        try {
            await auth.signOut();
            updateSyncIndicator('offline');
            if (typeof showToast === 'function') showToast('সাইন আউট হয়েছে। অটো-সিঙ্ক বন্ধ।');
        } catch (e) {
            console.error('Sign out error:', e);
        }
    };

    // --- Manual Cloud Backup (keep for force sync) ---
    window.cloudBackup = async function () {
        const user = auth.currentUser;
        if (!user) {
            if (typeof showToast === 'function') showToast('⚠️ আগে সাইন ইন করুন');
            return;
        }
        await syncToCloud(true);
        if (typeof showToast === 'function') showToast('✅ ক্লাউডে ব্যাকআপ সম্পন্ন!');
    };

    // --- Manual Cloud Restore ---
    window.cloudRestore = async function () {
        const user = auth.currentUser;
        if (!user) {
            if (typeof showToast === 'function') showToast('⚠️ আগে সাইন ইন করুন');
            return;
        }

        try {
            const latestDoc = await db.collection('users').doc(user.uid)
                .collection('backups').doc('latest').get();

            if (!latestDoc.exists) {
                if (typeof showToast === 'function') showToast('❌ ক্লাউডে কোনো ব্যাকআপ নেই');
                return;
            }

            let backupData;
            const latestData = latestDoc.data();

            if (latestData.__isChunked) {
                const totalChunks = latestData.__totalChunks;
                let fullStr = '';
                for (let i = 0; i < totalChunks; i++) {
                    const chunkDoc = await db.collection('users').doc(user.uid)
                        .collection('backups').doc(`chunk_${i}`).get();
                    if (chunkDoc.exists) fullStr += chunkDoc.data().data;
                }
                backupData = JSON.parse(fullStr);
            } else {
                backupData = latestData;
            }

            const meta = backupData._meta || {};
            const backupDate = meta.timestamp ? new Date(meta.timestamp).toLocaleString('bn-BD') : 'অজানা';
            const studentCount = meta.totalStudents || 0;

            const confirmed = confirm(
                `☁️ ক্লাউড থেকে রিস্টোর করবেন?\n\n` +
                `📅 ব্যাকআপ: ${backupDate}\n` +
                `👨‍🎓 শিক্ষার্থী: ${studentCount} জন\n\n` +
                `⚠️ বর্তমান সব ডাটা ক্লাউডের ডাটা দিয়ে প্রতিস্থাপিত হবে।`
            );

            if (!confirmed) return;

            for (const [name, key] of Object.entries(SYNC_KEYS)) {
                if (backupData[name] !== undefined) {
                    originalSetItem(key, JSON.stringify(backupData[name]));
                    if (typeof ShadowStorage !== 'undefined' && typeof ShadowStorage.save === 'function') {
                        ShadowStorage.save(key, backupData[name]);
                    }
                }
            }

            if (typeof showToast === 'function') showToast('✅ রিস্টোর সফল! পেজ রিলোড হচ্ছে...');
            setTimeout(() => window.location.reload(), 1500);

        } catch (e) {
            console.error('Cloud restore error:', e);
            if (typeof showToast === 'function') showToast('❌ রিস্টোর ব্যর্থ: ' + e.message);
        }
    };

    // --- Update UI based on auth state ---
    function updateCloudUI(user) {
        const loggedOut = document.getElementById('cloud-logged-out');
        const loggedIn = document.getElementById('cloud-logged-in');
        const userName = document.getElementById('cloud-user-name');
        const userEmail = document.getElementById('cloud-user-email');
        const userPhoto = document.getElementById('cloud-user-photo');
        const loginWall = document.getElementById('login-wall');

        if (!loggedOut || !loggedIn) return;

        if (user) {
            if (loginWall) loginWall.classList.add('hidden');
            loggedOut.classList.add('hidden');
            loggedIn.classList.remove('hidden');

            if (userName) userName.textContent = user.displayName || 'User';
            if (userEmail) userEmail.textContent = user.email || '';
            if (userPhoto) {
                userPhoto.src = user.photoURL || '';
                userPhoto.onerror = function () {
                    this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect fill="%234f46e5" width="40" height="40" rx="20"/><text x="20" y="26" text-anchor="middle" fill="white" font-size="18">' + (user.displayName ? user.displayName[0] : 'U') + '</text></svg>';
                };
            }

            // Show sync indicator
            const indicator = document.getElementById('cloud-sync-indicator');
            if (indicator) indicator.innerHTML = '<span class="text-green-500 text-[10px]">☁️ অটো-সিঙ্ক চালু</span>';
        } else {
            if (loginWall) loginWall.classList.remove('hidden');
            loggedOut.classList.remove('hidden');
            loggedIn.classList.add('hidden');
        }

        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 100);
        }
    }

    // --- Load last backup time ---
    async function loadLastBackupTime(uid) {
        try {
            const userDoc = await db.collection('users').doc(uid).get();
            if (userDoc.exists && userDoc.data().lastBackup) {
                updateLastBackupLabel(userDoc.data().lastBackup);
            }
        } catch (e) {
            console.error('Failed to load backup time:', e);
        }
    }

    // --- Update "last backup" label ---
    function updateLastBackupLabel(isoTime) {
        const label = document.getElementById('cloud-last-backup');
        if (!label) return;

        try {
            const date = new Date(isoTime);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            let timeAgo;
            if (diffMins < 1) timeAgo = 'এইমাত্র';
            else if (diffMins < 60) timeAgo = `${diffMins} মিনিট আগে`;
            else if (diffHours < 24) timeAgo = `${diffHours} ঘণ্টা আগে`;
            else if (diffDays < 7) timeAgo = `${diffDays} দিন আগে`;
            else timeAgo = date.toLocaleDateString('bn-BD');

            label.textContent = `শেষ সিঙ্ক: ${timeAgo}`;
            label.classList.remove('text-indigo-500');
            label.classList.add('text-green-600');
        } catch (e) {
            label.textContent = 'শেষ সিঙ্ক: ' + isoTime;
        }
    }

    // --- Online/Offline detection ---
    window.addEventListener('online', () => {
        if (auth.currentUser && pendingSync) {
            syncToCloud();
        }
    });

    window.addEventListener('offline', () => {
        updateSyncIndicator('offline');
    });

})();
