// ===== Block 1: Status Label Update =====
        // Update Status Label dynamically
        document.getElementById('student-modal').addEventListener('change', (e) => {
            if (e.target.id === 'inp-status') {
                const label = document.getElementById('status-label');
                const isActive = e.target.checked;
                label.textContent = isActive ? 'Active' : 'Disabled';
                label.className = isActive ? 'ml-2 text-xs font-bold text-indigo-600' : 'ml-2 text-xs font-bold text-red-500';
            }
        });

// ===== Block 2: Fee Type Toggle =====
                    document.getElementById('fee-type').addEventListener('change', function () {
                        const monthlySettings = document.getElementById('monthly-fee-settings');
                        const optionalSettings = document.getElementById('optional-fee-settings');

                        // Reset visibility
                        monthlySettings.classList.add('hidden');
                        optionalSettings.classList.add('hidden');

                        if (this.value === 'monthly') {
                            monthlySettings.classList.remove('hidden');
                        } else if (this.value === 'optional') {
                            optionalSettings.classList.remove('hidden');
                        }
                    });

// ===== Block 3: Main App Logic =====
        // --- Storage Configuration & Security ---
        window.toBanglaNum = function (n) {
            if (n === null || n === undefined) return "";
            return n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);
        };
        const APP_STORAGE_VERSION = "2.1.1";
        const STORAGE_KEYS = {
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
            version: 'cc_app_version',
            formDraft: 'cc_student_form_draft',
            sortConfig: 'cc_sort_config'
        };

        const COUNTRIES = [
            { name: "Afghanistan", code: "+93" }, { name: "Albania", code: "+355" }, { name: "Algeria", code: "+213" },
            { name: "Andorra", code: "+376" }, { name: "Angola", code: "+244" }, { name: "Argentina", code: "+54" },
            { name: "Armenia", code: "+374" }, { name: "Australia", code: "+61" }, { name: "Austria", code: "+43" },
            { name: "Azerbaijan", code: "+994" }, { name: "Bahamas", code: "+1-242" }, { name: "Bahrain", code: "+973" },
            { name: "Bangladesh", code: "+880" }, { name: "Barbados", code: "+1-246" }, { name: "Belarus", code: "+375" },
            { name: "Belgium", code: "+32" }, { name: "Belize", code: "+501" }, { name: "Benin", code: "+229" },
            { name: "Bermuda", code: "+1-441" }, { name: "Bhutan", code: "+975" }, { name: "Bolivia", code: "+591" },
            { name: "Bosnia and Herzegovina", code: "+387" }, { name: "Botswana", code: "+267" }, { name: "Brazil", code: "+55" },
            { name: "Brunei", code: "+673" }, { name: "Bulgaria", code: "+359" }, { name: "Burkina Faso", code: "+226" },
            { name: "Burundi", code: "+257" }, { name: "Cambodia", code: "+855" }, { name: "Cameroon", code: "+237" },
            { name: "Canada", code: "+1" }, { name: "Cape Verde", code: "+238" }, { name: "Cayman Islands", code: "+1-345" },
            { name: "Central African Republic", code: "+236" }, { name: "Chad", code: "+235" }, { name: "Chile", code: "+56" },
            { name: "China", code: "+86" }, { name: "Colombia", code: "+57" }, { name: "Comoros", code: "+269" },
            { name: "Congo", code: "+242" }, { name: "Costa Rica", code: "+506" }, { name: "Croatia", code: "+385" },
            { name: "Cuba", code: "+53" }, { name: "Cyprus", code: "+357" }, { name: "Czech Republic", code: "+420" },
            { name: "Denmark", code: "+45" }, { name: "Djibouti", code: "+253" }, { name: "Dominica", code: "+1-767" },
            { name: "Dominican Republic", code: "+1-809" }, { name: "Ecuador", code: "+593" }, { name: "Egypt", code: "+20" },
            { name: "El Salvador", code: "+503" }, { name: "Equatorial Guinea", code: "+240" }, { name: "Eritrea", code: "+291" },
            { name: "Estonia", code: "+372" }, { name: "Ethiopia", code: "+251" }, { name: "Fiji", code: "+679" },
            { name: "Finland", code: "+358" }, { name: "France", code: "+33" }, { name: "Gabon", code: "+241" },
            { name: "Gambia", code: "+220" }, { name: "Georgia", code: "+995" }, { name: "Germany", code: "+49" },
            { name: "Ghana", code: "+233" }, { name: "Greece", code: "+30" }, { name: "Grenada", code: "+1-473" },
            { name: "Guatemala", code: "+502" }, { name: "Guinea", code: "+224" }, { name: "Guyana", code: "+592" },
            { name: "Haiti", code: "+509" }, { name: "Honduras", code: "+504" }, { name: "Hong Kong", code: "+852" },
            { name: "Hungary", code: "+36" }, { name: "Iceland", code: "+354" }, { name: "India", code: "+91" },
            { name: "Indonesia", code: "+62" }, { name: "Iran", code: "+98" }, { name: "Iraq", code: "+964" },
            { name: "Ireland", code: "+353" }, { name: "Israel", code: "+972" }, { name: "Italy", code: "+39" },
            { name: "Jamaica", code: "+1-876" }, { name: "Japan", code: "+81" }, { name: "Jordan", code: "+962" },
            { name: "Kazakhstan", code: "+7" }, { name: "Kenya", code: "+254" }, { name: "Kiribati", code: "+686" },
            { name: "Korea, North", code: "+850" }, { name: "Korea, South", code: "+82" }, { name: "Kuwait", code: "+965" },
            { name: "Kyrgyzstan", code: "+996" }, { name: "Laos", code: "+856" }, { name: "Latvia", code: "+371" },
            { name: "Lebanon", code: "+961" }, { name: "Lesotho", code: "+266" }, { name: "Liberia", code: "+231" },
            { name: "Libya", code: "+218" }, { name: "Liechtenstein", code: "+423" }, { name: "Lithuania", code: "+370" },
            { name: "Luxembourg", code: "+352" }, { name: "Macao", code: "+853" }, { name: "Macedonia", code: "+389" },
            { name: "Madagascar", code: "+261" }, { name: "Malawi", code: "+265" }, { name: "Malaysia", code: "+60" },
            { name: "Maldives", code: "+960" }, { name: "Mali", code: "+223" }, { name: "Malta", code: "+356" },
            { name: "Marshall Islands", code: "+692" }, { name: "Mauritania", code: "+222" }, { name: "Mauritius", code: "+230" },
            { name: "Mexico", code: "+52" }, { name: "Micronesia", code: "+691" }, { name: "Moldova", code: "+373" },
            { name: "Monaco", code: "+377" }, { name: "Mongolia", code: "+976" }, { name: "Montenegro", code: "+382" },
            { name: "Morocco", code: "+212" }, { name: "Mozambique", code: "+258" }, { name: "Myanmar", code: "+95" },
            { name: "Namibia", code: "+264" }, { name: "Nauru", code: "+674" }, { name: "Nepal", code: "+977" },
            { name: "Netherlands", code: "+31" }, { name: "New Zealand", code: "+64" }, { name: "Nicaragua", code: "+505" },
            { name: "Niger", code: "+227" }, { name: "Nigeria", code: "+234" }, { name: "Norway", code: "+47" },
            { name: "Oman", code: "+968" }, { name: "Pakistan", code: "+92" }, { name: "Palau", code: "+680" },
            { name: "Panama", code: "+507" }, { name: "Papua New Guinea", code: "+675" }, { name: "Paraguay", code: "+595" },
            { name: "Peru", code: "+51" }, { name: "Philippines", code: "+63" }, { name: "Poland", code: "+48" },
            { name: "Portugal", code: "+351" }, { name: "Puerto Rico", code: "+1-787" }, { name: "Qatar", code: "+974" },
            { name: "Romania", code: "+40" }, { name: "Russia", code: "+7" }, { name: "Rwanda", code: "+250" },
            { name: "Samoa", code: "+685" }, { name: "San Marino", code: "+378" }, { name: "Saudi Arabia", code: "+966" },
            { name: "Senegal", code: "+221" }, { name: "Serbia", code: "+381" }, { name: "Seychelles", code: "+248" },
            { name: "Sierra Leone", code: "+232" }, { name: "Singapore", code: "+65" }, { name: "Slovakia", code: "+421" },
            { name: "Slovenia", code: "+386" }, { name: "Solomon Islands", code: "+677" }, { name: "Somalia", code: "+252" },
            { name: "South Africa", code: "+27" }, { name: "Spain", code: "+34" }, { name: "Sri Lanka", code: "+94" },
            { name: "Sudan", code: "+249" }, { name: "Suriname", code: "+597" }, { name: "Swaziland", code: "+268" },
            { name: "Sweden", code: "+46" }, { name: "Switzerland", code: "+41" }, { name: "Syria", code: "+963" },
            { name: "Taiwan", code: "+886" }, { name: "Tajikistan", code: "+992" }, { name: "Tanzania", code: "+255" },
            { name: "Thailand", code: "+66" }, { name: "Togo", code: "+228" }, { name: "Tonga", code: "+676" },
            { name: "Trinidad and Tobago", code: "+1-868" }, { name: "Tunisia", code: "+216" }, { name: "Turkey", code: "+90" },
            { name: "Turkmenistan", code: "+993" }, { name: "Tuvalu", code: "+688" }, { name: "Uganda", code: "+256" },
            { name: "Ukraine", code: "+380" }, { name: "United Arab Emirates", code: "+971" }, { name: "United Kingdom", code: "+44" },
            { name: "United States", code: "+1" }, { name: "Uruguay", code: "+598" }, { name: "Uzbekistan", code: "+998" },
            { name: "Vanuatu", code: "+678" }, { name: "Venezuela", code: "+58" }, { name: "Vietnam", code: "+84" },
            { name: "Yemen", code: "+967" }, { name: "Zambia", code: "+260" }, { name: "Zimbabwe", code: "+263" }
        ].sort((a, b) => a.name.localeCompare(b.name));

        const COUNTRY_CODES_SORTED = [...new Set(COUNTRIES.map(c => c.code))].sort((a, b) => b.length - a.length);


        /**
         * ShadowStorage: Provides dual-layer persistence (LocalStorage + IndexedDB)
         * to protect against accidental data loss from other apps/browser resets.
         */
        class ShadowStorage {
            static dbName = 'EasyCM_ShadowStore';
            static dbVersion = 1;

            static async initDB() {
                return new Promise((resolve, reject) => {
                    const request = indexedDB.open(this.dbName, this.dbVersion);
                    request.onupgradeneeded = (e) => {
                        const db = e.target.result;
                        if (!db.objectStoreNames.contains('shadow')) {
                            db.createObjectStore('shadow');
                        }
                    };
                    request.onsuccess = (e) => resolve(e.target.result);
                    request.onerror = (e) => reject(e.target.error);
                });
            }

            static async save(key, data) {
                // 1. Try Saving to localStorage (Primary)
                try {
                    localStorage.setItem(key, JSON.stringify(data));
                } catch (e) {
                    console.error('LocalStorage save failed for key:', key, e);
                    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        showToast('Local Storage Full! Saving to Database only.', 'error');
                    }
                }

                // 2. Always Attempt Saving to IndexedDB (Shadow Copy)
                try {
                    const db = await this.initDB();
                    const tx = db.transaction('shadow', 'readwrite');
                    tx.objectStore('shadow').put(data, key);
                } catch (e) {
                    console.error('ShadowDB save failed for key:', key, e);
                }
            }

            static async restore() {
                try {
                    const db = await this.initDB();
                    const tx = db.transaction('shadow', 'readonly');
                    const store = tx.objectStore('shadow');

                    let restoredCount = 0;
                    const keys = Object.values(STORAGE_KEYS);

                    for (const key of keys) {
                        const lsData = localStorage.getItem(key);
                        if (lsData === null || lsData === 'null') {
                            const shadowData = await new Promise((res) => {
                                const req = store.get(key);
                                req.onsuccess = () => res(req.result);
                                req.onerror = () => res(null);
                            });

                            if (shadowData !== null && shadowData !== undefined) {
                                localStorage.setItem(key, JSON.stringify(shadowData));
                                restoredCount++;
                            }
                        }
                    }

                    if (restoredCount > 0) {
                        showToast(`ডাটাবেজ থেকে ${toBanglaNum(restoredCount)}টি ডাটা রিস্টোর করা হয়েছে।`);
                        return true;
                    }
                } catch (e) {
                    console.error('Shadow restore failed:', e);
                }
                return false;
            }

            static async migrate() {
                const currentVersion = localStorage.getItem(STORAGE_KEYS.version);
                if (currentVersion !== APP_STORAGE_VERSION) {
                    try {
                        const db = await this.initDB();
                        const tx = db.transaction('shadow', 'readwrite');
                        const store = tx.objectStore('shadow');

                        for (const key of Object.values(STORAGE_KEYS)) {
                            const data = localStorage.getItem(key);
                            if (data) {
                                try { store.put(JSON.parse(data), key); }
                                catch (e) { store.put(data, key); }
                            }
                        }
                    } catch (e) {
                        console.error('Shadow migration sync failed:', e);
                    }
                    localStorage.setItem(STORAGE_KEYS.version, APP_STORAGE_VERSION);
                }
            }

            static async clearAll() {
                try {
                    const db = await this.initDB();
                    const tx = db.transaction('shadow', 'readwrite');
                    tx.objectStore('shadow').clear();
                    console.log('ShadowStorage cleared.');
                } catch (e) {
                    console.error('Shadow clearance failed:', e);
                }
            }
        }

        // Field Library Definition (Bangla)
        const FIELD_LIBRARY = {
            "ব্যক্তিগত তথ্য": ["রক্তের গ্রুপ", "জন্ম তারিখ", "লিঙ্গ", "ধর্ম", "জাতীয়তা", "জন্ম নিবন্ধন নম্বর"],
            "অভিভাবক তথ্য": ["পিতার পেশা", "মাতার পেশা", "অভিভাবকের নাম", "অভিভাবকের মোবাইল", "অভিভাবকের সম্পর্ক", "বার্ষিক আয়"],
            "শিক্ষাগত তথ্য": ["পূর্ববর্তী স্কুল", "পিএসসি জিপিএ", "জেএসসি জিপিএ", "এসএসসি জিপিএ", "টিসি নম্বর"],
            "একাডেমিক তথ্য": ["সেশন", "গ্রুপ", "সেকশন", "শিফট", "শিক্ষার্থীর ধরন"],
            "জরুরি যোগাযোগ": ["যোগাযোগের ব্যক্তি", "সম্পর্ক", "মোবাইল নম্বর"],
            "নথিপত্র": ["শিক্ষার্থীর ছবি", "জন্ম নিবন্ধন"]
        };

        // State Management
        let students = JSON.parse(localStorage.getItem(STORAGE_KEYS.students)) || [];
        let classes = JSON.parse(localStorage.getItem(STORAGE_KEYS.classes)) || [];
        if (classes.length === 0) {
            classes = ['হেফজ হাফেজ', 'হাফেজ', 'নাজেরা', 'মক্তব'];
            localStorage.setItem(STORAGE_KEYS.classes, JSON.stringify(classes));
        }
        // Default Student Photo if fields are empty or initialize defaults
        let activeFormFields = JSON.parse(localStorage.getItem(STORAGE_KEYS.customFields));
        if (!activeFormFields || activeFormFields.length === 0) {
            activeFormFields = ["শিক্ষার্থীর ছবি"];
        }
        let customFields = activeFormFields; // Alias for compatibility
        let hiddenFixedFields = JSON.parse(localStorage.getItem(STORAGE_KEYS.hiddenFixedFields)) || [];
        let feeTypes = JSON.parse(localStorage.getItem(STORAGE_KEYS.feeTypes)) || [];

        // Report Fields Configuration
        const REPORT_FIELDS_CONFIG = [
            { key: 'photo', label: 'ছবি', default: false },
            { key: 'roll', label: 'রোল', default: true },
            { key: 'class', label: 'ক্লাস', default: true },
            { key: 'name', label: 'নাম', default: true, disabled: true }, // Name is always required
            { key: 'father_name', label: 'পিতার নাম', default: false },
            { key: 'mother_name', label: 'মাতার নাম', default: false },
            { key: 'mobile', label: 'মোবাইল', default: true },
            { key: 'birth_registration', label: 'জন্ম নিবন্ধন', default: false },
            { key: 'dob', label: 'জন্ম তারিখ', default: false },
            { key: 'blood_group', label: 'রক্তের গ্রুপ', default: false },
            { key: 'address', label: 'ঠিকানা/নোট', default: false },
            // Custom fields will be appended dynamically
        ];

        function renderReportFieldOptions() {
            const container = document.getElementById('report-fields');
            if (!container) return;
            container.innerHTML = '';

            // Merge standard config with active custom fields
            const allFields = [...REPORT_FIELDS_CONFIG];

            // Add custom fields that are not already in the config
            if (activeFormFields && activeFormFields.length > 0) {
                activeFormFields.forEach(field => {
                    // Check if it's already a standard field key or strictly a custom field
                    // Simple check: if not in standard config keys (mapped)
                    const isStandard = REPORT_FIELDS_CONFIG.some(f => f.label === field || f.key === field || (field === "শিক্ষার্থীর ছবি" && f.key === 'photo'));
                    if (!isStandard) {
                        allFields.push({ key: field, label: field, default: false, isCustom: true });
                    }
                });
            }

            allFields.forEach(field => {
                const label = document.createElement('label');
                label.className = 'flex items-center gap-2.5 cursor-pointer group';

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.value = field.key;
                input.checked = field.default;
                input.disabled = field.disabled || false;
                input.className = `w-4 h-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 ${field.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`;
                input.onchange = generateReport; // Re-generate on change

                const span = document.createElement('span');
                span.className = `text-sm ${field.disabled ? 'text-gray-400' : 'text-gray-600 group-hover:text-gray-900'}`;
                span.textContent = field.label;

                label.appendChild(input);
                label.appendChild(span);
                container.appendChild(label);
            });
        }
        let expenses = [];
        let incomes = [];
        try {
            const savedExpenses = localStorage.getItem(STORAGE_KEYS.expenses);
            expenses = savedExpenses ? JSON.parse(savedExpenses) : [];
            const savedIncomes = localStorage.getItem(STORAGE_KEYS.incomes);
            incomes = savedIncomes ? JSON.parse(savedIncomes) : [];
            console.log('Expenses Initialized:', expenses.length);
            console.log('Incomes Initialized:', incomes.length);
        } catch (e) {
            console.error('Error initializing expenses or incomes:', e);
            expenses = [];
            incomes = [];
        }
        let currentFilter = 'All';
        let currentMode = 'dashboard'; // Default mode
        let studentPhotoMap = {}; // Maps ID to local Object URL

        // Institute Information
        let instituteInfo = JSON.parse(localStorage.getItem(STORAGE_KEYS.instituteInfo)) || {
            name: 'Class Connect Academy',
            address: '',
            contact: '',
            eiin: '',
            established: '',
            idLimit: 3
        };

        // Selection Mode State
        let selectionMode = false;
        let selectedStudents = [];
        let isReportSelectionMode = false;
        let expenseSelectionMode = false;
        let selectedExpenseIds = [];

        // Advanced Filter State
        let currentAdvStatusFilter = 'all';
        let currentAdvFeeFilter = '';
        let currentAdvStudentStatusFilter = 'active';



        // Custom Confirm Dialog
        let confirmResolve = null;

        // Navigation Functions
        function showPage(pageId) {
            try {
                // Hide all pages first
                const pages = ['dashboard-page', 'students-page', 'fees-page', 'expenses-view', 'incomes-view', 'dashboard-view', 'students-view'];
                pages.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.classList.add('hidden');
                        el.style.display = 'none';
                    }
                });

                // Show target page
                const target = document.getElementById(pageId);
                if (target) {
                    target.classList.remove('hidden');
                    target.style.display = '';
                } else {
                    // Alert if target page is missing (Critical debug info)
                    // alert('Error: Page ID not found - ' + pageId); 
                    // Commented out alert to avoid annoyance if it's just a timing issue, 
                    // but if user reports "nothing happens", this is the cause.
                    console.error('Page ID not found:', pageId);
                }
            } catch (e) {
                alert('Navigation Error: ' + e.message);
            }
            if (pageId === 'fees-page') currentMode = 'fees';
            else if (pageId === 'students-page') currentMode = 'students';
            else if (pageId === 'dashboard-page') currentMode = 'dashboard';
            else if (pageId === 'expenses-view') currentMode = 'expenses';

            // Update FAB color based on mode/context
            const fab = document.getElementById('main-fab');
            if (fab) {
                const isExpenseMode = (currentMode === 'expenses' || (currentMode === 'dashboard' && window.dashboardContext === 'expenses'));
                if (isExpenseMode) {
                    fab.classList.remove('bg-indigo-600');
                    fab.classList.add('bg-rose-600');
                } else {
                    fab.classList.remove('bg-rose-600');
                    fab.classList.add('bg-indigo-600');
                }
            }
        }

        function openExpensesPage() {
            // Collapse search if expanded to show the new title
            const searchContainer = document.getElementById('main-search-container');
            const searchInput = document.getElementById('student-search');
            if (searchContainer && searchContainer.style.width !== '40px') {
                if (searchInput) searchInput.value = ''; // Clear search to allow collapse
                toggleMainSearch();
            }

            closeSidebar();
            showPage('expenses-view');

            // Update header title
            const h1 = document.querySelector('header h1');
            const p = document.querySelector('header p');
            if (h1) h1.textContent = 'খরচ ট্র্যাকার';
            if (p) p.textContent = 'Expense Vouchers';


            renderExpenses();
            if (typeof renderDashboard === 'function') renderDashboard();
            updateMobileNavActiveState('nav-expenses');
        }

        function updateMobileNavActiveState(activeId) {
            const buttons = document.querySelectorAll('.mobile-nav-btn');
            buttons.forEach(btn => {
                if (btn.id === activeId) {
                    btn.classList.add('text-indigo-600');
                    btn.classList.remove('text-gray-500');
                } else {
                    btn.classList.remove('text-indigo-600');
                    btn.classList.add('text-gray-500');
                }
            });

            // Dynamic Action Button
            const actionBtn = document.getElementById('mobile-action-btn');
            const actionIcon = document.getElementById('mobile-action-icon');
            if (actionBtn && actionIcon) {
                let iconName = 'plus';
                let actionFn = () => openModal('quick-add-modal');
                let bgColor = 'bg-indigo-600';
                let shadowColor = 'shadow-indigo-300';

                switch (activeId) {
                    case 'nav-students':
                        iconName = 'user-plus';
                        actionFn = () => openAddModal();
                        bgColor = 'bg-indigo-600';
                        shadowColor = 'shadow-indigo-300';
                        break;
                    case 'nav-fees':
                        iconName = 'banknote';
                        actionFn = () => openAddFeeTypeModal();
                        bgColor = 'bg-indigo-600';
                        shadowColor = 'shadow-indigo-300';
                        break;
                    case 'nav-incomes':
                        iconName = 'trending-up';
                        actionFn = () => openAddIncomeModal();
                        bgColor = 'bg-emerald-600';
                        shadowColor = 'shadow-emerald-300';
                        break;
                    case 'nav-expenses':
                        iconName = 'wallet';
                        actionFn = () => openAddExpenseModal();
                        bgColor = 'bg-rose-600';
                        shadowColor = 'shadow-rose-300';
                        break;
                }

                actionIcon.setAttribute('data-lucide', iconName);
                actionBtn.onclick = actionFn;

                // Update Colors
                actionBtn.className = actionBtn.className.replace(/bg-\w+-\d+/, bgColor);
                actionBtn.className = actionBtn.className.replace(/shadow-\w+-\d+/, shadowColor);

                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        }

        function openIncomesPage() {
            updateMobileNavActiveState('nav-incomes');
            // Collapse search if expanded to show the new title
            const searchContainer = document.getElementById('main-search-container');
            const searchInput = document.getElementById('student-search');
            if (searchContainer && searchContainer.style.width !== '40px') {
                if (searchInput) searchInput.value = ''; // Clear search to allow collapse
                toggleMainSearch();
            }

            closeSidebar();
            showPage('incomes-view');

            // Update header title
            const h1 = document.querySelector('header h1');
            const p = document.querySelector('header p');
            if (h1) h1.textContent = 'আয় ট্র্যাকার';
            if (p) p.textContent = 'Income Receipts';

            if (typeof renderIncomes === 'function') renderIncomes();
            if (typeof renderDashboard === 'function') renderDashboard();
        }

        function openDashboard() {
            try {
                // Collapse search if expanded to show the new title
                const searchContainer = document.getElementById('main-search-container');
                const searchInput = document.getElementById('student-search');
                if (searchContainer && searchContainer.style.width !== '40px') {
                    if (searchInput) searchInput.value = ''; // Clear search to allow collapse
                    toggleMainSearch();
                }

                showPage('dashboard-page');

                // Safe Header Update
                const h1 = document.querySelector('header h1');
                const p = document.querySelector('header p');
                if (h1) h1.textContent = 'সামারি';
                if (p) p.textContent = 'রিপোর্ট';

                // Manage filter containers visibility
                const classFiltersContainer = document.getElementById('class-filters-container');
                if (classFiltersContainer) classFiltersContainer.classList.add('hidden');

                const dashFilters = document.getElementById('dashboard-class-filters');
                const isFees = (window.dashboardContext === 'fees' || !window.dashboardContext);
                if (dashFilters) {
                    dashFilters.style.display = isFees ? 'flex' : 'none';
                    if (isFees && typeof renderDashboardFilters === 'function') {
                        renderDashboardFilters();
                    }
                }

                // Set default date range for dashboard filter
                if (typeof setDashFilterDate === 'function') setDashFilterDate('this_year');

                // Remove any back button if exists
                const backBtn = document.getElementById('back-to-students-btn');
                if (backBtn) backBtn.remove();

                // Add Custom Report Button to Header Action Area if not exists
                const headerActions = document.getElementById('header-actions');
                if (headerActions && !document.getElementById('dash-report-btn')) {
                    const reportBtn = document.createElement('button');
                    reportBtn.id = 'dash-report-btn';
                    reportBtn.onclick = () => {
                        const reportFilter = document.getElementById('dash-report-class-filter');
                        const activeFilter = window.dashboardCurrentFilter || 'All';

                        if (reportFilter) {
                            reportFilter.value = activeFilter;
                        }

                        document.getElementById('dash-report-modal').classList.remove('hidden');
                        if (typeof setDashFilterDate === 'function') setDashFilterDate('this_month');
                    };
                    reportBtn.className = 'p-2 bg-white text-indigo-600 rounded-full hover:bg-indigo-50 transition shadow-sm';
                    reportBtn.title = 'কাস্টম রিপোর্ট';
                    reportBtn.innerHTML = '<i data-lucide="file-text" class="w-5 h-5"></i>';

                    headerActions.prepend(reportBtn);
                    setTimeout(() => lucide.createIcons(), 10);
                }

                // Trigger Render
                if (typeof renderDashboard === 'function') renderDashboard();

            } catch (err) {
                console.error("Error in openDashboard:", err);
            }

            closeSidebar();
        }


        // --- Dashboard Context Toggle ---
        let currentDashboardContext = 'fees'; // Default to fees/income mode

        function setDashboardContext(mode) {
            console.log('=== setDashboardContext called with mode:', mode, '===');
            currentDashboardContext = mode;
            window.dashboardContext = mode; // Also set on window for FAB logic

            // Update button states
            const feesBtn = document.getElementById('ctx-fees-btn');
            const expensesBtn = document.getElementById('ctx-expenses-btn');

            if (mode === 'fees') {
                // Fees/Income mode
                feesBtn.classList.add('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-100');
                feesBtn.classList.remove('text-slate-500', 'hover:bg-slate-50');

                expensesBtn.classList.remove('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-100');
                expensesBtn.classList.add('text-slate-500', 'hover:bg-slate-50');

                // Show class filters
                const classFilters = document.getElementById('dashboard-class-filters');
                if (classFilters) {
                    classFilters.style.display = 'flex';
                    console.log('✓ Class filters shown (display: flex)');
                }

                // Hide expense breakdown
                const expenseBreakdown = document.getElementById('dash-expense-breakdown');
                if (expenseBreakdown) expenseBreakdown.classList.add('hidden');

                // Show fees breakdown (chart placeholder)
                const feesBreakdown = document.getElementById('dash-fees-breakdown');
                if (feesBreakdown) feesBreakdown.classList.remove('hidden');

            } else if (mode === 'expenses') {
                // Expense mode
                expensesBtn.classList.add('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-100');
                expensesBtn.classList.remove('text-slate-500', 'hover:bg-slate-50');

                feesBtn.classList.remove('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-100');
                feesBtn.classList.add('text-slate-500', 'hover:bg-slate-50');

                // Hide class filters
                const classFilters = document.getElementById('dashboard-class-filters');
                if (classFilters) {
                    classFilters.style.display = 'none';
                    console.log('✓ Class filters hidden (display: none)');
                } else {
                    console.error('✗ dashboard-class-filters element not found');
                }

                // Show expense breakdown
                const expenseBreakdown = document.getElementById('dash-expense-breakdown');
                if (expenseBreakdown) expenseBreakdown.classList.remove('hidden');

                // Hide fees breakdown
                const feesBreakdown = document.getElementById('dash-fees-breakdown');
                if (feesBreakdown) feesBreakdown.classList.add('hidden');
            }

            // Update dashboard cards with new context
            updateDashboardCards();
        }

        function updateDashboardCards() {
            // Priority: Use the New Unified Dashboard Logic if available
            if (typeof renderDashboard === 'function') {
                renderDashboard();
                return;
            }

            // Fallback for older logic
            if (currentDashboardContext === 'fees') {
                calculateAndRenderStats();
            } else {
                calculateAndRenderExpenseStats();
            }
        }

        function calculateAndRenderExpenseStats() {
            // Get all expenses from storage (using correct key!)
            const expensesData = JSON.parse(localStorage.getItem('cc_expenses') || '[]');

            console.log('Expense data loaded:', expensesData.length, 'vouchers');

            // Calculate stats
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay()); // Saturday as start
            startOfWeek.setHours(0, 0, 0, 0);

            let totalExpense = 0;
            let todayExpense = 0;
            let monthExpense = 0;
            let weekExpense = 0;

            expensesData.forEach(exp => {
                const expDate = new Date(exp.date);
                const amount = parseFloat(exp.total) || 0;

                totalExpense += amount;

                if (expDate >= today && expDate < new Date(today.getTime() + 86400000)) {
                    todayExpense += amount;
                }

                if (expDate >= startOfMonth) {
                    monthExpense += amount;
                }

                if (expDate >= startOfWeek) {
                    weekExpense += amount;
                }
            });

            console.log('Expense stats:', { totalExpense, monthExpense, todayExpense, weekExpense });

            // Update card labels and values using innerText
            document.getElementById('label-total-students').innerText = 'TOTAL EXP';
            document.getElementById('sublabel-total-students').innerText = 'সর্বমোট খরচ';
            document.getElementById('dash-total-students').innerText = `৳${totalExpense.toLocaleString()}`;

            document.getElementById('label-total-coll').innerText = 'MONTH EXP';
            document.getElementById('sublabel-total-coll').innerText = 'চলতি মাসের খরচ';
            document.getElementById('dash-total-coll').innerText = `৳${monthExpense.toLocaleString()}`;

            document.getElementById('label-total-due').innerText = 'TODAY EXP';
            document.getElementById('sublabel-total-due').innerText = 'আজকের খরচ';
            document.getElementById('dash-total-due').innerText = `৳${todayExpense.toLocaleString()}`;

            document.getElementById('label-month-coll').innerText = 'THIS MONTH';
            document.getElementById('dash-month-coll').innerText = `৳${monthExpense.toLocaleString()}`;

            document.getElementById('label-week-coll').innerText = 'THIS WEEK';
            document.getElementById('dash-week-coll').innerText = `৳${weekExpense.toLocaleString()}`;

            // Hide sub-stats in student card (Due/Paid counts)
            const subStats = document.querySelector('#dash-total-students').closest('.relative').querySelector('.mt-4');
            if (subStats) subStats.classList.add('hidden');
        }

        // Defined missing function for Dashboard 'Detailed Report' button
        // Helper for Dashboard Date Presets

        window.toggleDashDateDropdown = function () {
            const menu = document.getElementById('dash-date-menu');
            if (menu) menu.classList.toggle('hidden');
        };

        // Close dropdown when clicking outside
        window.addEventListener('click', function (e) {
            const container = document.getElementById('dash-date-dropdown-container');
            const menu = document.getElementById('dash-date-menu');
            if (container && !container.contains(e.target)) {
                if (menu) menu.classList.add('hidden');
            }
        });

        window.setDashFilterDate = function (range) {
            const sInput = document.getElementById('dash-filter-start');
            const eInput = document.getElementById('dash-filter-end');
            const customContainer = document.getElementById('dash-custom-date-container');
            const wrapper = document.getElementById('dash-custom-inputs-wrapper');
            const labelSpan = document.getElementById('dash-date-current');
            const today = new Date();

            // Labels mapping
            const labels = {
                'today': 'আজ',
                'this_week': 'এই সপ্তাহ',
                'this_month': 'এই মাস',
                'last_month': 'গত মাস',
                'this_year': 'এই বছর',
                'lifetime': 'লাইফটাইম',
                'month_selector': 'কাস্টম মাস',
                'custom': '<i data-lucide="calendar" class="w-4 h-4"></i>'
            };

            // Update Label
            if (labelSpan) {
                labelSpan.innerHTML = labels[range] || range;
                if (range === 'custom') {
                    setTimeout(() => lucide.createIcons(), 0);
                }
            }

            // Close Menu
            const menu = document.getElementById('dash-date-menu');
            if (menu) menu.classList.add('hidden');

            // Handle Custom UI Visibility
            const monthSelectorContainer = document.getElementById('dash-month-selector-container');

            if (customContainer) {
                if (range === 'custom') {
                    customContainer.classList.remove('hidden');
                    if (wrapper) wrapper.classList.remove('hidden');
                } else {
                    customContainer.classList.add('hidden');
                    if (wrapper) wrapper.classList.add('hidden');
                }
            }

            if (monthSelectorContainer) {
                const feeSelectorContainer = document.getElementById('dash-fee-selector-container');
                if (range === 'month_selector') {
                    monthSelectorContainer.classList.remove('hidden');
                    if (feeSelectorContainer) feeSelectorContainer.classList.remove('hidden');
                    initCustomMonthSelectors();
                    initDashFeeSelector(); // Populate fees
                } else {
                    monthSelectorContainer.classList.add('hidden');
                    if (feeSelectorContainer) feeSelectorContainer.classList.add('hidden');
                }
            }

            let start, end;

            if (range === 'today') {
                start = new Date();
                end = new Date();
            } else if (range === 'this_week') {
                // Start of week (Sunday)
                start = new Date(today);
                start.setDate(today.getDate() - today.getDay());
                end = new Date();
            } else if (range === 'this_month') {
                start = new Date(today.getFullYear(), today.getMonth(), 1);
                end = new Date();
            } else if (range === 'last_month') {
                start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                end = new Date(today.getFullYear(), today.getMonth(), 0);
            } else if (range === 'this_year') {
                start = new Date(today.getFullYear(), 0, 1);
                end = new Date();
            } else if (range === 'lifetime') {
                // Set start to a very old date to cover all records
                start = new Date('2000-01-01');
                end = new Date();
            } else if (range === 'month_selector') {
                updateCustomMonthDates();
                return;
            } else if (range === 'custom') {
                // For custom, we don't automatically set dates; let user choose.
                // However, we might want to default them to this month if empty.
                if (sInput && !sInput.value) {
                    const d = new Date(today.getFullYear(), today.getMonth(), 1);
                    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
                    sInput.value = d.toISOString().split('T')[0];
                }
                if (eInput && !eInput.value) {
                    const d = new Date();
                    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
                    eInput.value = d.toISOString().split('T')[0];
                }
                return; // Wait for user onchange on inputs
            }

            if (sInput && eInput) {
                const setDate = (input, date) => {
                    if (!date) { input.value = ''; return; }
                    const d = new Date(date);
                    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
                    input.value = d.toISOString().split('T')[0];
                };

                setDate(sInput, start);
                setDate(eInput, end);

                if (typeof window.renderDashboard === 'function') window.renderDashboard();
            }
        };

        window.initCustomMonthSelectors = function () {
            const yearSelect = document.getElementById('dash-filter-year');
            const monthSelect = document.getElementById('dash-filter-month');
            if (!yearSelect || !monthSelect) return;

            // 1. Get available years from feePayments (lifetime)
            let years = new Set();
            years.add(new Date().getFullYear());
            feePayments.forEach(p => {
                if (p.date) {
                    years.add(new Date(p.date).getFullYear());
                }
            });

            const sortedYears = Array.from(years).sort((a, b) => b - a);
            yearSelect.innerHTML = sortedYears.map(y => `<option value="${y}" ${y === new Date().getFullYear() ? 'selected' : ''}>${y}</option>`).join('');

            // 2. Populate months
            const monthNames = [
                'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
                'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
            ];
            monthSelect.innerHTML = monthNames.map((m, i) => `<option value="${i}" ${i === new Date().getMonth() ? 'selected' : ''}>${m}</option>`).join('');

            updateCustomMonthDates();
        };

        window.updateCustomMonthDates = function () {
            const year = parseInt(document.getElementById('dash-filter-year').value);
            const month = parseInt(document.getElementById('dash-filter-month').value);
            const sInput = document.getElementById('dash-filter-start');
            const eInput = document.getElementById('dash-filter-end');

            if (!isNaN(year) && !isNaN(month)) {
                const start = new Date(year, month, 1);
                const end = new Date(year, month + 1, 0);

                const setDate = (input, date) => {
                    if (!date || !input) return;
                    const d = new Date(date);
                    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
                    input.value = d.toISOString().split('T')[0];
                };

                setDate(sInput, start);
                setDate(eInput, end);

                if (typeof window.renderDashboard === 'function') window.renderDashboard();
            }
        };

        // --- Multi-Select Filter Logic (Dual Mode: Fees/Expenses) ---
        window.selectedDashFilterIds = [];

        window.toggleDashFeeDropdown = function (e) {
            if (e) e.stopPropagation();
            const menu = document.getElementById('dash-fee-menu');
            if (!menu) return;
            menu.classList.toggle('hidden');
            if (!menu.classList.contains('hidden')) {
                initDashFeeSelector();

                // Close on outside click
                const closeMenu = (ev) => {
                    const btn = document.getElementById('dash-fee-filter-btn');
                    if (!menu.contains(ev.target) && (btn && !btn.contains(ev.target))) {
                        menu.classList.add('hidden');
                        window.removeEventListener('click', closeMenu);
                    }
                };
                window.addEventListener('click', closeMenu);
            }
        };

        window.initDashFeeSelector = function () {
            const menu = document.getElementById('dash-fee-menu');
            if (!menu) return;
            const isExpense = (window.dashboardContext === 'expenses');

            menu.innerHTML = '';

            // Select All option
            const allChecked = window.selectedDashFilterIds.length === 0;
            const allDiv = document.createElement('div');
            allDiv.className = "flex items-center gap-2 px-2 py-1.5 hover:bg-indigo-50 rounded-lg cursor-pointer transition-colors group";
            allDiv.onclick = (e) => { e.stopPropagation(); onDashFeeCheckboxChange('all'); };
            allDiv.innerHTML = `
                <input type="checkbox" ${allChecked ? 'checked' : ''} 
                    class="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 pointer-events-none">
                <label class="text-[11px] font-bold text-slate-600 cursor-pointer flex-1 group-hover:text-indigo-600 uppercase tracking-wider">${isExpense ? 'সব ভাউচার' : 'সব ফি'}</label>
            `;
            menu.appendChild(allDiv);

            if (isExpense) {
                // Unique expense titles
                const titles = [...new Set((expenses || []).map(e => e.title))].filter(t => t);
                titles.forEach(title => {
                    const isSelected = window.selectedDashFilterIds.includes(title);
                    const div = document.createElement('div');
                    div.className = "flex items-center gap-2 px-2 py-1.5 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors group";
                    div.onclick = (e) => { e.stopPropagation(); onDashFeeCheckboxChange(title); };
                    div.innerHTML = `
                        <input type="checkbox" ${isSelected ? 'checked' : ''} 
                            class="w-3.5 h-3.5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 pointer-events-none">
                        <label class="text-[11px] font-bold text-slate-600 cursor-pointer flex-1 group-hover:text-rose-600">${title}</label>
                    `;
                    menu.appendChild(div);
                });
            } else {
                // Fee Types
                if (typeof feeTypes !== 'undefined') {
                    feeTypes.filter(f => !f.deletedAt).forEach(fee => {
                        const isSelected = window.selectedDashFilterIds.includes(fee.id.toString());
                        const div = document.createElement('div');
                        div.className = "flex items-center gap-2 px-2 py-1.5 hover:bg-indigo-50 rounded-lg cursor-pointer transition-colors group";
                        div.onclick = (e) => { e.stopPropagation(); onDashFeeCheckboxChange(fee.id); };
                        div.innerHTML = `
                            <input type="checkbox" ${isSelected ? 'checked' : ''} 
                                class="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 pointer-events-none">
                            <label class="text-[11px] font-bold text-slate-600 cursor-pointer flex-1 group-hover:text-indigo-600">${fee.name}</label>
                        `;
                        menu.appendChild(div);
                    });
                }
            }
        };

        window.onDashFeeCheckboxChange = function (id) {
            const isExpense = (window.dashboardContext === 'expenses');
            if (id === 'all') {
                window.selectedDashFilterIds = [];
            } else {
                const idStr = id.toString();
                const index = window.selectedDashFilterIds.indexOf(idStr);
                if (index === -1) {
                    window.selectedDashFilterIds.push(idStr);
                } else {
                    window.selectedDashFilterIds.splice(index, 1);
                }
            }

            updateDashFeeFilterLabel();
            initDashFeeSelector();
            if (typeof window.renderDashboard === 'function') window.renderDashboard();
        };

        window.updateDashFeeFilterLabel = function () {
            const label = document.getElementById('dash-fee-filter-label');
            const isExpense = (window.dashboardContext === 'expenses');
            if (label) {
                if (window.selectedDashFilterIds.length === 0) {
                    label.innerText = isExpense ? 'সকল ভাউচার' : 'সকল ফি';
                    label.className = "text-[11px] font-bold text-gray-700";
                } else {
                    label.className = "text-[11px] font-bold " + (isExpense ? "text-rose-600" : "text-indigo-600");
                    if (window.selectedDashFilterIds.length === 1) {
                        if (isExpense) {
                            label.innerText = window.selectedDashFilterIds[0];
                        } else {
                            const fee = feeTypes.find(f => f.id.toString() === window.selectedDashFilterIds[0]);
                            label.innerText = fee ? fee.name : '১টি ফি';
                        }
                    } else {
                        label.innerText = window.selectedDashFilterIds.length + (isExpense ? 'টি ভাউচার' : 'টি ফি');
                    }
                }
            }
        };

        window.printDashCustomReport = function () {
            openReportConfigModal();
        };

        window.openReportConfigModal = function () {
            const modal = document.getElementById('dash-report-modal');
            if (!modal) return;

            // Sync Dates from Dashboard to Modal
            const dStart = document.getElementById('dash-filter-start');
            const dEnd = document.getElementById('dash-filter-end');
            const mStart = document.getElementById('report-start-date');
            const mEnd = document.getElementById('report-end-date');

            if (dStart && mStart) mStart.value = dStart.value;
            if (dEnd && mEnd) mEnd.value = dEnd.value;

            // Class Filter Removed from Modal Logic

            modal.classList.remove('hidden');
        };

        window.applyConfigToDashboard = function () {
            const mStart = document.getElementById('report-start-date');
            const mEnd = document.getElementById('report-end-date');
            const dStart = document.getElementById('dash-filter-start');
            const dEnd = document.getElementById('dash-filter-end');

            if (mStart && dStart) dStart.value = mStart.value;
            if (mEnd && dEnd) dEnd.value = mEnd.value;

            // Update Dashboard
            if (typeof window.renderDashboard === 'function') {
                window.renderDashboard();
            }

            closeModal('dash-report-modal');
        };

        // --- Dashboard Stats Calculation ---

        function calculateAndRenderStats() {
            // Restore original labels for fees mode
            document.getElementById('label-total-students').textContent = 'STUDENTS';
            document.getElementById('sublabel-total-students').textContent = 'মোট শিক্ষার্থী';

            document.getElementById('label-total-coll').textContent = 'COLLECTED';
            document.getElementById('sublabel-total-coll').textContent = 'সর্বমোট সংগ্রহ';

            document.getElementById('label-total-due').textContent = 'DUE';
            document.getElementById('sublabel-total-due').textContent = 'বর্তমান বকেয়া';

            document.getElementById('label-month-coll').textContent = 'THIS MONTH';
            document.getElementById('label-week-coll').textContent = 'THIS WEEK';

            // Show sub-stats in student card (Due/Paid counts)
            const subStats = document.querySelector('#dash-total-students').closest('.relative').querySelector('.mt-4');
            if (subStats) subStats.classList.remove('hidden');

            const sInput = document.getElementById('dash-filter-start');
            const eInput = document.getElementById('dash-filter-end');
            const startDate = sInput?.value ? new Date(sInput.value) : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            const endDate = eInput?.value ? new Date(eInput.value) : new Date();
            // Include end date full day
            endDate.setHours(23, 59, 59, 999);

            // 1. Filter Students by Class
            const activeFilter = window.dashboardCurrentFilter || 'All';
            const filteredStudents = activeFilter === 'All'
                ? students
                : students.filter(s => s.class === activeFilter);

            let grandTotalDue = 0;
            let grandTotalCollection = 0;
            let dueStudentsCount = 0;

            // Class Wise Map
            const classStats = {};
            classes.forEach(c => classStats[c] = { count: 0, due: 0, collectedInRange: 0 });
            if (!classStats['Unassigned']) classStats['Unassigned'] = { count: 0, due: 0, collectedInRange: 0 };

            // Process filtered list for Card 1 stats
            filteredStudents.forEach(s => {
                const fin = calculateStudentFinancials(s, endDate);
                const bal = Number(fin.balance) || 0;
                if (bal > 0) dueStudentsCount++;
                grandTotalDue += bal;

                const cName = s.class || 'Unassigned';
                if (!classStats[cName]) classStats[cName] = { count: 0, due: 0, collectedInRange: 0 };
                classStats[cName].count++;
                classStats[cName].due += bal;
            });

            // For Grand Total Collection, we need to filter payments by student class
            const filteredStudentUids = new Set(filteredStudents.map(s => s.uid));

            let rangeCollection = 0;
            let thisMonthCollection = 0;
            let thisWeekCollection = 0;
            let studentsWhoPaidInRange = new Set();

            const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            const startOfWeek = new Date();
            startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() || 7)); // Monday start
            startOfWeek.setHours(0, 0, 0, 0);

            feePayments.forEach(p => {
                if (p.deleted) return;

                // If filtering by class, skip payments from other students
                if (activeFilter !== 'All' && !filteredStudentUids.has(p.uid)) return;

                const amount = parseFloat(p.amount) || 0;
                const pDate = new Date(p.date);
                grandTotalCollection += amount;

                if (pDate >= startDate && pDate <= endDate) {
                    rangeCollection += amount;
                    // Track unique students in range
                    const student = students.find(s => s.uid === p.uid);
                    if (student) {
                        studentsWhoPaidInRange.add(p.uid);
                        const cName = student.class || 'Unassigned';
                        if (classStats[cName]) classStats[cName].collectedInRange += amount;
                    }
                }
                if (pDate >= startOfMonth) thisMonthCollection += amount;
                if (pDate >= startOfWeek) thisWeekCollection += amount;
            });

            // Update UI
            const totalStudents = filteredStudents.length;
            const paidStudentsCount = totalStudents - dueStudentsCount;

            document.getElementById('dash-total-students').innerText = totalStudents;
            document.getElementById('dash-due-students').innerText = dueStudentsCount;
            document.getElementById('dash-paid-students').innerText = paidStudentsCount;

            document.getElementById('dash-total-due').innerText = '৳' + grandTotalDue.toLocaleString();
            document.getElementById('dash-total-coll').innerText = '৳' + rangeCollection.toLocaleString();
            document.getElementById('dash-month-coll').innerText = '৳' + thisMonthCollection.toLocaleString();
            document.getElementById('dash-week-coll').innerText = '৳' + thisWeekCollection.toLocaleString();
            document.getElementById('dash-range-collection').innerText = '৳' + rangeCollection.toLocaleString();

            // New sub-stats
            const collStudentsCountEl = document.getElementById('dash-coll-students-count');
            if (collStudentsCountEl) collStudentsCountEl.innerText = studentsWhoPaidInRange.size;

            const dueStudentsTotalEl = document.getElementById('dash-due-students-total-count');
            const globalDueStudentsCount = students.filter(s => calculateStudentFinancials(s).balance > 0).length;
            if (dueStudentsTotalEl) dueStudentsTotalEl.innerText = globalDueStudentsCount;

            // Render Class Table
            const tbody = document.getElementById('dash-class-table');
            tbody.innerHTML = '';

            Object.keys(classStats).sort().forEach(cls => {
                const stat = classStats[cls];
                if (stat.count === 0 && stat.collectedInRange === 0) return; // Skip empty

                const tr = document.createElement('tr');
                tr.className = 'border-b hover:bg-gray-50';
                tr.innerHTML = `
                    <td class="px-4 py-3 font-medium text-gray-900">${cls}</td>
                    <td class="px-4 py-3 text-right text-gray-500">${stat.count}</td>
                    <td class="px-4 py-3 text-right text-red-600 font-semibold">৳${stat.due.toLocaleString()}</td>
                    <td class="px-4 py-3 text-right text-green-600 font-bold">৳${stat.collectedInRange.toLocaleString()}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        function backToStudentsPage() {
            // Collapse search if expanded to show the new title
            const searchContainer = document.getElementById('main-search-container');
            const searchInput = document.getElementById('student-search');
            if (searchContainer && searchContainer.style.width !== '40px') {
                if (searchInput) searchInput.value = ''; // Clear search to allow collapse
                toggleMainSearch();
            }

            closeSidebar();
            showPage('students-page');
            document.querySelector('header h1').textContent = 'ক্লাস কানেক্ট';
            document.querySelector('header p').textContent = `মোট ${students.length} জন শিক্ষার্থী`;
            document.getElementById('class-filters-container').classList.remove('hidden');
            const backBtn = document.getElementById('back-to-students-btn');
            if (backBtn) backBtn.remove();

            // Restore footer/fabs if hidden
            document.querySelectorAll('.fixed.bottom-6').forEach(el => el.classList.remove('hidden'));

            // Force Render Students
            if (typeof renderClassFilters === 'function') renderClassFilters();
            if (typeof renderStudents === 'function') renderStudents();
            updateMobileNavActiveState('nav-students');
        }

        function addBackToStudentsButton() {
            // Functionality removed as per user request (Arrow button removed)
            // Replaced by persistent Search Bar in HTML header
        }

        // Helper to get student photo src
        // Helper to copy text to clipboard (works on file:// and older browsers)
        function copyToClipboard(text) {
            return new Promise((resolve, reject) => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text).then(resolve).catch(err => {
                        // Fallback to execCommand if clipboard API fails
                        fallbackCopy(text) ? resolve() : reject(err);
                    });
                } else {
                    fallbackCopy(text) ? resolve() : reject('Copy failed');
                }
            });
        }

        function fallbackCopy(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            let success = false;
            try {
                success = document.execCommand('copy');
            } catch (err) { }
            textArea.remove();
            return success;
        }

        // Global cache to prevent slow localStorage lookups during rendering
        let cachedPhotoNames = null;

        function getStudentPhoto(s) {
            if (!s) return '';

            // 1.5. Saved Filename (Priority) - Web URLs do not require a student ID
            if (s.custom_fields && s.custom_fields.imageFilename) {
                const imgFn = s.custom_fields.imageFilename;
                if (imgFn.startsWith('http://') || imgFn.startsWith('https://') || imgFn.startsWith('data:')) {
                    return imgFn;
                }
            }

            if (!s.id) return '';
            const idKey = String(s.id).trim().toLowerCase();

            // 1. Current Session (Object URLs from sync)
            if (studentPhotoMap[idKey]) return studentPhotoMap[idKey];

            // 1.5. Saved Filename (Priority) - Local file fallback
            if (s.custom_fields && s.custom_fields.imageFilename) {
                return (s.custom_fields.imageFilename).replace(/#/g, '%23');
            }

            // 2. Persisted Names (Remembers 'ID Name.jpg' after refresh)
            if (cachedPhotoNames === null) {
                try {
                    cachedPhotoNames = JSON.parse(localStorage.getItem('cc_photo_names') || '{}');
                } catch (e) { cachedPhotoNames = {}; }
            }

            if (cachedPhotoNames[idKey]) {
                return encodeURI(cachedPhotoNames[idKey]).replace(/#/g, '%23');
            }

            // 3. First Guess Fallback: [PhotoID.jpg] -> [ID Name.jpg]
            const id = String(s.id || '').trim();
            const name = String(s.name || '').trim();
            const photoId = String(s.photoId || '').trim();

            if (photoId) {
                return encodeURI(`${photoId}.jpg`).replace(/#/g, '%23');
            }
            if (id && name) {
                return encodeURI(`${id} ${name}.jpg`).replace(/#/g, '%23');
            }
            return encodeURI(`${id}.jpg`).replace(/#/g, '%23');
        }

        // --- NEW: Unified Photo Rendering Helper ---
        function getStudentPhotoHTML(s, sizeClass = 'w-12 h-12', isLarge = false) {
            if (!s) return '';
            const photoSrc = getStudentPhoto(s);
            const initial = String(s.name || '?').charAt(0).toUpperCase();

            // For large panels, we might want slightly different styling
            const borderClass = isLarge ? 'border-2 border-white/30 backdrop-blur-sm' : 'border border-white/20 shadow-md';
            const gradientClass = s.status === 'disabled' ? 'from-gray-500 to-gray-600' : 'from-indigo-500 to-indigo-600';

            return `
                <div class="${sizeClass} rounded-full bg-gradient-to-br ${gradientClass} text-white flex items-center justify-center font-bold ${isLarge ? 'text-2xl' : 'text-lg'} flex-shrink-0 relative overflow-hidden ${borderClass}">
                    <img src="${photoSrc}" 
                         class="absolute inset-0 w-full h-full object-cover z-10" 
                         onerror="handlePhotoError(this, '${s.id}', '${(s.name || '').replace(/'/g, "\\'")}')">
                    <span class="relative z-0">${initial}</span>
                </div>
            `;
        }

        /**
         * Enhanced Photo Fallback Handler
         * Cyclically tries: [ID Name.jpg] -> [IDName.jpg] -> [ID.jpg] -> [.png versions]
         */
        function handlePhotoError(img, sId, sName) {
            if (!img || !sId || img.getAttribute('data-fallback-done')) return;

            let stage = parseInt(img.getAttribute('data-fallback-stage') || '0');
            stage++;
            img.setAttribute('data-fallback-stage', stage);

            const id = String(sId).trim();
            const name = String(sName || '').trim();
            const idKey = id.toLowerCase();
            const idNameNoSpace = (id + name).replace(/\s+/g, '');
            const idNameSpace = `${id} ${name}`;

            // Fallback Queue in order of priority
            const fallbacks = [
                `${idNameSpace}.jpg`,
                `${idNameNoSpace}.jpg`,
                `${id}.jpg`,
                `${idNameSpace}.png`,
                `${idNameNoSpace}.png`,
                `${id}.png`,
                `${idNameSpace}.jpeg`,
                `${idNameNoSpace}.jpeg`,
                `${id}.jpeg`,
                `${idNameSpace}.webp`,
                `${idNameNoSpace}.webp`,
                `${id}.webp`
            ];

            if (stage <= fallbacks.length) {
                const nextFile = fallbacks[stage - 1];
                const nextSrc = encodeURI(nextFile).replace(/#/g, '%23');

                // If it's effectively the same source, skip to next stage
                const currentSrc = decodeURI(img.src);
                if (currentSrc.endsWith(nextFile) || img.src.endsWith(nextSrc)) {
                    handlePhotoError(img, sId, sName);
                    return;
                }

                img.src = nextSrc;
            } else {
                // If all fallbacks fail, hide the image to show the fallback <span>
                img.style.display = 'none';
                img.setAttribute('data-fallback-done', 'true');
                if (img.nextElementSibling && img.nextElementSibling.tagName === 'SPAN') {
                    img.nextElementSibling.style.display = 'block';
                }
            }
        }

        async function handlePhotoSync(event) {
            const files = event.target.files || event.dataTransfer.files;
            if (!files || files.length === 0) return;

            let matchCount = 0;
            let importCandidates = [];
            const newMap = {};

            // 1. Prepare student IDs for fast lookup
            const sortedStudents = [...students].sort((a, b) => String(b.id).length - String(a.id).length);
            const photoNames = cachedPhotoNames || JSON.parse(localStorage.getItem('cc_photo_names') || '{}');

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileName = file.name;
                const extensionIndex = fileName.lastIndexOf('.');
                const originalBaseName = fileName.substring(0, extensionIndex);
                const searchBaseName = originalBaseName.toLowerCase();
                const objectUrl = URL.createObjectURL(file);

                let foundExisting = false;

                // 2. Scan for any student ID in this filename
                for (const s of sortedStudents) {
                    const sId = String(s.id || '').toLowerCase().trim();
                    if (!sId) continue;

                    let matchFound = false;

                    // Check all occurrences of ID in filename
                    let pos = searchBaseName.indexOf(sId);
                    while (pos !== -1) {
                        const charBefore = pos > 0 ? searchBaseName[pos - 1] : null;
                        const charAfter = pos + sId.length < searchBaseName.length ? searchBaseName[pos + sId.length] : null;

                        const startsWithDigit = /^\d/.test(sId);
                        const endsWithDigit = /\d$/.test(sId);
                        const startsWithLetter = /[a-z\u00A0-\uFFFF]/.test(sId[0]);
                        const endsWithLetter = /[a-z\u00A0-\uFFFF]/.test(sId[sId.length - 1]);

                        let beforeOk = true;
                        if (charBefore) {
                            if (startsWithDigit && /\d/.test(charBefore)) beforeOk = false;
                            if (startsWithLetter && /[a-z\u00A0-\uFFFF]/.test(charBefore)) beforeOk = false;
                        }

                        let afterOk = true;
                        if (charAfter) {
                            if (endsWithDigit && /\d/.test(charAfter)) afterOk = false;
                            if (endsWithLetter && /[a-z\u00A0-\uFFFF]/.test(charAfter)) afterOk = false;
                        }

                        if (beforeOk && afterOk) {
                            matchFound = true;
                            break;
                        }
                        pos = searchBaseName.indexOf(sId, pos + 1);
                    }

                    if (matchFound) {
                        newMap[sId] = objectUrl;
                        photoNames[sId] = fileName;
                        foundExisting = true;
                        matchCount++;
                        break;
                    }

                    // 2.2 NEW: Check against auto-generated photoId (IDName joined)
                    const pId = String(s.photoId || '').toLowerCase().trim();
                    if (pId && searchBaseName === pId) {
                        newMap[sId] = objectUrl;
                        photoNames[sId] = fileName;
                        foundExisting = true;
                        matchCount++;
                        break;
                    }

                    // Fallback: Remove ALL mixed separators and try a very specific match
                    const sIdNoSpace = sId.replace(/[^a-z0-9\u00A0-\uFFFF]/g, '');
                    const baseNoSpace = searchBaseName.replace(/[^a-z0-9\u00A0-\uFFFF]/g, '');

                    if (sIdNoSpace && baseNoSpace === sIdNoSpace) {
                        newMap[sId] = objectUrl;
                        photoNames[sId] = fileName;
                        foundExisting = true;
                        matchCount++;
                        break;
                    }
                }

                if (!foundExisting) {
                    // 3. 'Easy Format' Support: ID Name.jpg (Space-less support)
                    // Try to split by non-alphanumeric first
                    let parts = originalBaseName.split(/[ \._-]/).filter(p => p.trim() !== "");

                    // FALLBACK: If no separator, try to split where Numbers end and anything else begins
                    if (parts.length === 1) {
                        const splitMatch = originalBaseName.match(/^(\d+)([^0-9].*)$/);
                        if (splitMatch) {
                            parts = [splitMatch[1], splitMatch[2]];
                        }
                    }

                    if (parts.length > 0) {
                        const candidateId = parts[0].trim();
                        const extractedName = parts.slice(1).join(" ").trim();
                        const candIdKey = candidateId.toLowerCase().trim();

                        newMap[candIdKey] = objectUrl;
                        photoNames[candIdKey] = fileName; // Persist for refresh

                        if (candidateId && extractedName) {
                            importCandidates.push({
                                id: candidateId.trim(),
                                name: extractedName,
                                photo: objectUrl
                            });
                        }
                    }
                }
            }

            cachedPhotoNames = photoNames;
            ShadowStorage.save(STORAGE_KEYS.photoNames, photoNames);

            // Apply matches
            studentPhotoMap = { ...studentPhotoMap, ...newMap };

            // Offer to Auto-Create Students
            if (importCandidates.length > 0) {
                const msg = `${matchCount} টি ছবি সিঙ্ক হয়েছে।\n\n${importCandidates.length} টি নতুন স্টুডেন্ট পাওয়া গেছে (ফাইলের নাম থেকে)।\nআপনি কি এই স্টুডেন্টগুলোকে অটোমেটিক লিস্টে যোগ করতে চান?`;
                if (confirm(msg)) {
                    importCandidates.forEach(cand => {
                        const newStudent = {
                            uid: 'st' + Date.now() + Math.random().toString(36).substr(2, 5),
                            id: cand.id,
                            name: cand.name,
                            class: currentFilter === 'All' ? (classes[0] || 'Default') : currentFilter,
                            roll: '',
                            mobile: '',
                            admitDate: new Date().toISOString().split('T')[0],
                            custom_fields: {}
                        };
                        students.push(newStudent);
                        studentPhotoMap[cand.id] = cand.photo;
                    });
                    localStorage.setItem('cc_students', JSON.stringify(students));
                    await syncClasses();
                    showToast(`${importCandidates.length} জন নতুন শিক্ষার্থী এবং ছবি যুক্ত করা হয়েছে!`);
                } else {
                    showToast(`${matchCount} টি ছবি আপডেট করা হয়েছে।`);
                }
            } else if (matchCount > 0) {
                showToast(`${matchCount} টি ছবি সফলভাবে সিঙ্ক হয়েছে!`);
            } else {
                showToast("কোনো ম্যাচিং ছবি পাওয়া যায়নি। ফাইলের শুরুতে আইডি আছে কিনা নিশ্চিত করুন।");
            }

            renderStudents();
            if (document.getElementById('fees-page')?.style.display !== 'none') {
                renderFeesStudentGrid();
            }

            // Cleanup
            if (event.target) event.target.value = '';
        }

        // --- Drag & Drop Support ---
        window.addEventListener('dragover', (e) => {
            // Only show overlay if dragging files
            if (e.dataTransfer.types && Array.from(e.dataTransfer.types).includes('Files')) {
                e.preventDefault();
                const overlay = document.getElementById('drop-overlay');
                if (overlay) overlay.classList.remove('hidden');
            }
        });

        window.addEventListener('dragleave', (e) => {
            if (e.relatedTarget === null) {
                const overlay = document.getElementById('drop-overlay');
                if (overlay) overlay.classList.add('hidden');
            }
        });

        window.addEventListener('drop', (e) => {
            e.preventDefault();
            const overlay = document.getElementById('drop-overlay');
            if (overlay) overlay.classList.add('hidden');
            handlePhotoSync(e);
        });

        function customConfirm(message, title = 'নিশ্চিত করুন') {
            return new Promise((resolve) => {
                confirmResolve = resolve;
                const modal = document.getElementById('custom-confirm-modal');
                const content = document.getElementById('confirm-content');
                const titleEl = document.getElementById('confirm-title');
                const messageEl = document.getElementById('confirm-message');

                titleEl.textContent = title;
                messageEl.textContent = message;

                modal.classList.remove('hidden');
                setTimeout(() => {
                    content.classList.remove('scale-95', 'opacity-0');
                    content.classList.add('scale-100', 'opacity-100');
                }, 10);

                lucide.createIcons();
            });
        }

        function resolveConfirm(result) {
            const modal = document.getElementById('custom-confirm-modal');
            const content = document.getElementById('confirm-content');

            content.classList.add('scale-95', 'opacity-0');
            content.classList.remove('scale-100', 'opacity-100');

            setTimeout(() => {
                modal.classList.add('hidden');
                if (confirmResolve) {
                    confirmResolve(result);
                    confirmResolve = null;
                }
            }, 200);
        }

        // Custom Prompt Dialog
        let promptResolve = null;

        function customPrompt(message, defaultValue = '', title = 'তথ্য দিন') {
            return new Promise((resolve) => {
                promptResolve = resolve;
                const modal = document.getElementById('custom-prompt-modal');
                const content = document.getElementById('prompt-content');
                const titleEl = document.getElementById('prompt-title');
                const messageEl = document.getElementById('prompt-message');
                const inputEl = document.getElementById('prompt-input');

                titleEl.textContent = title;
                messageEl.textContent = message;
                inputEl.value = defaultValue;

                modal.classList.remove('hidden');
                setTimeout(() => {
                    content.classList.remove('scale-95', 'opacity-0');
                    content.classList.add('scale-100', 'opacity-100');
                    inputEl.focus();
                }, 10);

                // Allow Enter key to submit
                inputEl.onkeydown = function (e) {
                    if (e.key === 'Enter') {
                        resolvePrompt(inputEl.value);
                    }
                };

                lucide.createIcons();
            });
        }

        function resolvePrompt(result) {
            const modal = document.getElementById('custom-prompt-modal');
            const content = document.getElementById('prompt-content');

            content.classList.add('scale-95', 'opacity-0');
            content.classList.remove('scale-100', 'opacity-100');

            setTimeout(() => {
                modal.classList.add('hidden');
                if (promptResolve) {
                    promptResolve(result);
                    promptResolve = null;
                }
            }, 200);
        }

        // Fees Management Functions
        function openFeesModal() {
            updateMobileNavActiveState('nav-fees');
            // Collapse search if expanded to show the new title
            const searchContainer = document.getElementById('main-search-container');
            const searchInput = document.getElementById('student-search');
            if (searchContainer && searchContainer.style.width !== '40px') {
                if (searchInput) searchInput.value = ''; // Clear search to allow collapse
                toggleMainSearch();
            }

            closeSidebar();
            showPage('fees-page');
            document.querySelector('header h1').textContent = 'ফি ম্যানেজমেন্ট';
            document.querySelector('header p').textContent = 'শিক্ষার্থীদের ফি সংগ্রহ ও ম্যানেজমেন্ট';
            const classFilters = document.getElementById('class-filters-container');
            if (classFilters) classFilters.classList.add('hidden');
            document.querySelectorAll('.fixed.bottom-6').forEach(el => el.classList.add('hidden')); // filtered FABs

            // Conflict Fix: Close Student Detail Panel if open
            if (typeof closeStudentDetailPanel === 'function') closeStudentDetailPanel();
            else {
                const panel = document.getElementById('student-detail-panel');
                if (panel) panel.remove();
            }

            renderFeesClassColumns();
            addBackToStudentsButton();
            setTimeout(() => lucide.createIcons(), 10);
        }

        function switchFeesTab(tab) {
            // Update tab buttons
            const manageBtn = document.getElementById('fees-tab-manage');
            const collectBtn = document.getElementById('fees-tab-collect');

            if (tab === 'manage') {
                manageBtn.classList.add('border-green-600', 'text-green-600');
                manageBtn.classList.remove('border-transparent', 'text-gray-500');
                collectBtn.classList.remove('border-green-600', 'text-green-600');
                collectBtn.classList.add('border-transparent', 'text-gray-500');

                document.getElementById('fees-content-manage').classList.remove('hidden');
                document.getElementById('fees-content-collect').classList.add('hidden');
            } else {
                collectBtn.classList.add('border-green-600', 'text-green-600');
                collectBtn.classList.remove('border-transparent', 'text-gray-500');
                manageBtn.classList.remove('border-green-600', 'text-green-600');
                manageBtn.classList.add('border-transparent', 'text-gray-500');

                document.getElementById('fees-content-manage').classList.add('hidden');
                document.getElementById('fees-content-collect').classList.remove('hidden');

                // Load students for collect tab
                loadStudentsForFeeCollection();
            }

            setTimeout(() => lucide.createIcons(), 10);
        }

        function loadStudentsForFeeCollection() {
            const select = document.getElementById('fee-student-select');
            select.innerHTML = '<option value="">-- শিক্ষার্থী নির্বাচন করুন --</option>';

            students.forEach(s => {
                const option = document.createElement('option');
                option.value = s.uid;
                option.textContent = `${s.name} - ${s.class} (${s.roll || 'N/A'})`;
                select.appendChild(option);
            });
        }

        function loadStudentFeeStatus() {
            const selectedUid = document.getElementById('fee-student-select').value;
            if (!selectedUid) {
                document.getElementById('student-fee-status').classList.add('hidden');
                return;
            }

            const student = students.find(s => s.uid === selectedUid);
            if (!student) return;

            // Update student info
            const avatar = document.getElementById('student-avatar');
            if (avatar) {
                avatar.innerHTML = `
                    <div class="w-full h-full rounded-full relative overflow-hidden flex items-center justify-center">
                        <img src="${getStudentPhoto(student)}" class="absolute inset-0 w-full h-full object-cover z-10" onerror="handlePhotoError(this, '${student.id}', '${student.name?.replace(/'/g, "\\'")}')">
                        <span class="relative z-0">${String(student.name || '?').charAt(0).toUpperCase()}</span>
                    </div>
                `;
            }
            document.getElementById('selected-student-name').textContent = student.name || 'N/A';
            document.getElementById('selected-student-class').textContent = `${student.class} - Roll: ${student.roll || 'N/A'}`;

            // Show the status card
            document.getElementById('student-fee-status').classList.remove('hidden');

            // TODO: Calculate and show fee status
            showToast('ফি ক্যালকুলেশন শীঘ্রই আসছে!');
        }

        function openAddFeeTypeModal() {
            showToast('ফি টাইপ যোগ করার ফিচার শীঘ্রই আসছে!');
        }


        // --- Photo Organizer Logic ---
        let organizerFiles = []; // Array of {file, objectUrl, name}

        function openPhotoOrganizer() {
            closeSidebar();
            const select = document.getElementById('organizer-class-select');
            select.innerHTML = '<option value="All">All Classes</option>' +
                classes.map(c => `<option value="${c}">${c}</option>`).join('');

            select.value = currentFilter !== 'All' ? currentFilter : 'All';

            document.getElementById('photo-organizer-modal').classList.remove('hidden');
            renderPhotoOrganizer();
        }

        function addPhotosToOrganizer(event) {
            const files = Array.from(event.target.files);
            const photoNames = cachedPhotoNames || JSON.parse(localStorage.getItem('cc_photo_names') || '{}');

            files.forEach(f => {
                const url = URL.createObjectURL(f);
                organizerFiles.push({
                    file: f,
                    url: url,
                    name: f.name
                });

                // Auto-restore match if this filename was previously linked to a student
                for (const studentId in photoNames) {
                    if (photoNames[studentId] === f.name) {
                        studentPhotoMap[studentId] = url;
                    }
                }
            });

            cachedPhotoNames = photoNames;
            renderPhotoOrganizer();
            event.target.value = '';
        }

        function renderPhotoOrganizer() {
            const library = document.getElementById('organizer-library');
            const studentList = document.getElementById('organizer-student-list');
            const targetCls = document.getElementById('organizer-class-select').value;

            // 1. Render Library (Square Compact Grid + Reordering support)
            library.className = "p-3 overflow-y-auto grid grid-cols-3 gap-2 flex-1 content-start bg-gray-50/50";
            library.innerHTML = organizerFiles.map((item, idx) => `
                <div draggable="true" 
                    ondragstart="photoDragStart(event, ${idx})" 
                    ondragover="allowLibraryDrop(event)"
                    ondragleave="this.classList.remove('ring-2', 'ring-indigo-400')"
                    ondrop="libraryDrop(event, ${idx})"
                    class="aspect-square bg-white rounded-lg shadow-sm border border-gray-100 relative group cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-indigo-400 transition-all overflow-hidden">
                    <img src="${item.url}" class="w-full h-full object-cover">
                    <div class="absolute bottom-0 inset-x-0 bg-black/50 text-[8px] text-white truncate px-1 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${item.name}</div>
                    <div class="absolute top-1 left-1 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">${idx + 1}</div>
                </div>
            `).join('');

            if (organizerFiles.length === 0) {
                library.innerHTML = '<div class="col-span-full py-12 text-center text-gray-400"><i data-lucide="upload-cloud" class="w-10 h-10 mx-auto mb-2 opacity-50"></i><p class="text-xs">ছবি যোগ করুন</p></div>';
            }

            // 2. Render Student List (Clear List View)
            const list = targetCls === 'All' ? students : students.filter(s => s.class === targetCls);
            // Sort list by Roll for predictable serial matching
            list.sort((a, b) => (parseInt(a.roll) || 0) - (parseInt(b.roll) || 0));

            studentList.className = "flex flex-col gap-2 pb-8";
            studentList.innerHTML = `
                <div class="flex items-center justify-between mb-2 px-2">
                    <h4 class="text-xs font-bold text-gray-500 uppercase tracking-widest">স্টুডেন্ট লিস্ট (${list.length})</h4>
                    <button onclick="autoMatchBySerial()" class="text-[10px] bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-bold hover:bg-indigo-200 transition flex items-center gap-1">
                        <i data-lucide="list-ordered" class="w-3 h-3"></i> সিরিয়াল অনুযায়ী সব ম্যাচ করুন
                    </button>
                </div>
            ` + list.map((s, idx) => {
                const sId = String(s.id).trim().toLowerCase();
                const sessionUrl = studentPhotoMap[sId];
                const targetName = `${s.id} ${s.name}.jpg`;

                return `
                <div ondragover="allowDrop(event)" ondragleave="this.classList.remove('border-indigo-500', 'bg-indigo-50')" ondrop="photoDrop(event, '${s.uid}')"
                    class="bg-white p-2 rounded-xl border ${sessionUrl ? 'border-green-200 bg-green-50/30' : 'border-gray-200'} flex items-center gap-3 transition-all duration-200 group">
                    <div class="w-6 text-[10px] font-bold text-gray-300 text-center">${idx + 1}</div>
                    <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-lg flex-shrink-0 relative overflow-hidden ring-1 ring-black/5">
                        ${sessionUrl ? `<img src="${sessionUrl}" class="absolute inset-0 w-full h-full object-cover">` : `<span class="text-gray-300">${s.roll || '?'}</span>`}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-gray-800 text-sm truncate">${s.name}</h4>
                        <div class="flex items-center gap-2">
                             <span class="text-[10px] font-bold text-indigo-600">ID: ${s.id}</span>
                             <span class="text-[10px] text-gray-400 truncate">রোল: ${s.roll || 'N/A'}</span>
                        </div>
                    </div>
                    <div class="hidden lg:block text-right px-2">
                        <div class="text-[9px] text-gray-400">Target Filename:</div>
                        <div class="text-[10px] font-mono text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">${targetName}</div>
                    </div>
                    <div class="flex items-center gap-1">
                        ${sessionUrl ? `
                            <button onclick="downloadRenamedPhoto('${s.uid}')" class="p-2 text-green-600 hover:bg-green-100 rounded-full transition" title="ডাউনলোড">
                                <i data-lucide="download" class="w-4 h-4"></i>
                            </button>
                            <button onclick="removeMatch('${s.id}')" class="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-full transition" title="মুছে ফেলুন">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                            </button>
                        ` : `
                            <div class="p-2 text-gray-300 italic text-[10px]">Empty</div>
                        `}
                    </div>
                </div>
                `;
            }).join('');

            lucide.createIcons();
            document.getElementById('organizer-matched-count').textContent = Object.keys(studentPhotoMap).length;
        }

        function autoMatchBySerial() {
            const targetCls = document.getElementById('organizer-class-select').value;
            const list = targetCls === 'All' ? students : students.filter(s => s.class === targetCls);
            list.sort((a, b) => (parseInt(a.roll) || 0) - (parseInt(b.roll) || 0));

            if (organizerFiles.length === 0) return showToast("আগে লাইব্রেরিতে ছবি যোগ করুন!");

            const count = Math.min(list.length, organizerFiles.length);
            const photoNames = cachedPhotoNames || JSON.parse(localStorage.getItem('cc_photo_names') || '{}');

            for (let i = 0; i < count; i++) {
                const s = list[i];
                const item = organizerFiles[i];
                const sIdKey = String(s.id).trim().toLowerCase();

                studentPhotoMap[sIdKey] = item.url;
                photoNames[sIdKey] = item.name;
            }

            cachedPhotoNames = photoNames;
            showToast(`${count} টি ছবি সিরিয়াল অনুযায়ী ম্যাচ করা হয়েছে!`);
            renderPhotoOrganizer();
        }

        function removeMatch(sId) {
            const key = String(sId).trim().toLowerCase();
            delete studentPhotoMap[key];
            if (cachedPhotoNames) delete cachedPhotoNames[key];
            renderPhotoOrganizer();
        }

        // Drag & Drop Handlers
        function allowDrop(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.currentTarget.classList.add('border-indigo-500', 'bg-indigo-50');
        }

        function allowLibraryDrop(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.currentTarget.classList.add('ring-2', 'ring-indigo-400');
        }

        function libraryDrop(ev, targetIndex) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.currentTarget.classList.remove('ring-2', 'ring-indigo-400');
            const sourceIndex = parseInt(ev.dataTransfer.getData("photoIndex"));

            if (isNaN(sourceIndex) || sourceIndex === targetIndex) return;

            // Reorder array
            const movedItem = organizerFiles.splice(sourceIndex, 1)[0];
            organizerFiles.splice(targetIndex, 0, movedItem);

            renderPhotoOrganizer();
        }

        function photoDragStart(ev, index) { ev.dataTransfer.setData("photoIndex", index); }
        function photoDrop(ev, studentUid) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
            const photoIndex = ev.dataTransfer.getData("photoIndex");
            const student = students.find(s => s.uid === studentUid);
            if (!student || photoIndex === "") return;

            const item = organizerFiles[photoIndex];
            const sIdKey = String(student.id).trim().toLowerCase();

            // Link in session
            studentPhotoMap[sIdKey] = item.url;

            // Persist name mapping
            const photoNames = cachedPhotoNames || JSON.parse(localStorage.getItem('cc_photo_names') || '{}');
            photoNames[sIdKey] = item.name;
            cachedPhotoNames = photoNames;

            showToast(`${student.name} এর জন্য ছবি সেট হয়েছে!`);
            renderPhotoOrganizer();
        }

        function saveOrganizerSession() {
            ShadowStorage.save(STORAGE_KEYS.photoNames, cachedPhotoNames || {});
            showToast("সব পরিবর্তন সফলভাবে সেভ করা হয়েছে!");
            renderStudents();
            if (document.getElementById('fees-page')?.style.display !== 'none') renderFeesStudentGrid();
        }

        function clearOrganizerMatches() {
            if (confirm("সবগুলো ম্যাচ মুছে ফেলতে চান?")) {
                cachedPhotoNames = {};
                studentPhotoMap = {};
                ShadowStorage.save(STORAGE_KEYS.photoNames, {});
                renderPhotoOrganizer();
                renderStudents();
            }
        }

        function downloadRenamedPhoto(uid) {
            const student = students.find(s => s.uid === uid);
            if (!student) return;
            const sIdKey = String(student.id).trim().toLowerCase();
            const objectUrl = studentPhotoMap[sIdKey];
            if (!objectUrl) return;

            const a = document.createElement('a');
            a.href = objectUrl;
            // The magic: Set the precise ID Name format as filename
            a.download = `${student.id} ${student.name}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        async function downloadAllMatchedPhotos() {
            const matchedIds = Object.keys(studentPhotoMap);
            const total = matchedIds.length;
            if (total === 0) return showToast("কোন ছবি ম্যাচ করা নেই!");

            if (!confirm(`আপনি কি ${total} টি ছবি ডাউনলোড করতে চান? (ব্রাউজারে 'Multiple Downloads' অনুমতি দিন)`)) return;

            let successCount = 0;
            for (let i = 0; i < total; i++) {
                const sIdKey = matchedIds[i];
                const student = students.find(s => String(s.id).trim().toLowerCase() === sIdKey);
                const objectUrl = studentPhotoMap[sIdKey];

                if (student && objectUrl) {
                    const a = document.createElement('a');
                    a.href = objectUrl;
                    a.download = `${student.id} ${student.name}.jpg`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);

                    successCount++;
                    if (i % 5 === 0 || i === total - 1) {
                        showToast(`ডাউনলোড হচ্ছে: ${i + 1}/${total}`);
                    }

                    // Increased delay to 500ms for better reliability
                    await new Promise(r => setTimeout(r, 500));
                }
            }
            showToast(`মোট ${successCount} টি ছবি ডাউনলোড সম্পন্ন হয়েছে!`);
        }

        function openTransactionHistoryModal() {
            // Placeholder for existing feature
            showToast("লেনদেন ইতিহাস ফিচার লোড হচ্ছে...");
        }


        // --- Custom Dropdown Logic for Bulk Import ---
        function renderImportClassDropdown(filterText = '') {
            const dropdown = document.getElementById('import-class-dropdown');
            const input = document.getElementById('import-target-class');
            const normalizedFilter = filterText.toLowerCase();

            // Filter classes
            let matches = classes.filter(c => c.toLowerCase().includes(normalizedFilter));

            // Should we show "Create new"? Only if valid text and not exact match
            const exactMatch = classes.some(c => c.toLowerCase() === normalizedFilter);
            const showCreate = filterText.trim() !== '' && !exactMatch;

            if (matches.length === 0 && !showCreate) {
                dropdown.classList.add('hidden');
                return;
            }

            let html = '';
            matches.forEach(cls => {
                html += `
                    <div onclick="selectImportClass('${cls}')" 
                        class="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer transition-colors border-b last:border-0 border-gray-50 flex items-center justify-between">
                        <span>${cls}</span>
                    </div>
                `;
            });

            if (showCreate) {
                html += `
                    <div onclick="selectImportClass('${filterText}')" 
                        class="px-4 py-2 text-sm text-indigo-600 font-semibold bg-indigo-50/50 hover:bg-indigo-100 cursor-pointer transition-colors border-t border-indigo-100 flex items-center gap-2">
                        <i data-lucide="plus" class="w-3 h-3"></i>
                        <span>নতুন ক্লাস: "${filterText}"</span>
                    </div>
                `;
            }

            dropdown.innerHTML = html;
            dropdown.classList.remove('hidden');
            lucide.createIcons();
        }

        function selectImportClass(className) {
            const input = document.getElementById('import-target-class');
            const dropdown = document.getElementById('import-class-dropdown');
            input.value = className;
            dropdown.classList.add('hidden');
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            const dropdown = document.getElementById('import-class-dropdown');
            const input = document.getElementById('import-target-class');
            if (!dropdown.classList.contains('hidden')) {
                if (!dropdown.contains(e.target) && e.target !== input) {
                    dropdown.classList.add('hidden');
                }
            }
        });

        // --- Sidebar Logic ---
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            const isClosed = sidebar.classList.contains('sidebar-closed');

            if (isClosed) {
                sidebar.classList.remove('sidebar-closed');
                sidebar.classList.add('sidebar-open');
                overlay.classList.remove('hidden');
            } else {
                sidebar.classList.add('sidebar-closed');
                sidebar.classList.remove('sidebar-open');
                overlay.classList.add('hidden');
            }
        }

        function closeSidebar() {
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            if (sidebar && !sidebar.classList.contains('sidebar-closed')) {
                sidebar.classList.add('sidebar-closed');
                sidebar.classList.remove('sidebar-open');
                overlay?.classList.add('hidden');
            }
        }

        async function resetAllData() {
            const confirmed = await customConfirm(
                'আপনি কি নিশ্চিত যে আপনি সম্পূর্ণ ডাটা মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফিরিয়ে আনা যাবে না। প্রথমে ব্যাকআপ ডাউনলোড করে নিন।',
                'সতর্কতা: সব ডাটা মুছে ফেলুন'
            );

            if (confirmed) {
                localStorage.clear();
                await ShadowStorage.clearAll();
                showToast('সমস্ত ডাটা মুছে ফেলা হয়েছে');
                setTimeout(() => {
                    location.reload();
                }, 500);
            }
        }

        // --- Backup & Restore Logic ---
        let pendingRestoreData = null;

        window.exportData = function () {
            try {
                const backupData = {};
                Object.values(STORAGE_KEYS).forEach(key => {
                    const val = localStorage.getItem(key);
                    try {
                        backupData[key] = val ? JSON.parse(val) : null;
                    } catch (e) {
                        backupData[key] = val; // Store as raw if not JSON
                    }
                });

                backupData.exportTimestamp = new Date().toISOString();
                backupData.appVersion = APP_STORAGE_VERSION;

                const jsonStr = JSON.stringify(backupData, null, 2);

                // Show Backup Preview Modal
                showBackupPreview(backupData, jsonStr);
            } catch (err) {
                console.error("Export Error:", err);
                showToast("ব্যাকআপ নিতে সমস্যা হয়েছে");
            }
        };

        function showBackupPreview(data, jsonStr) {
            const modal = document.getElementById('backup-modal');
            if (!modal) {
                window.downloadBackupAction(jsonStr);
                return;
            }

            const studentCount = Array.isArray(data[STORAGE_KEYS.students]) ? data[STORAGE_KEYS.students].length : 0;
            const feeCount = Array.isArray(data[STORAGE_KEYS.feeTypes]) ? data[STORAGE_KEYS.feeTypes].length : 0;
            const paymentCount = Array.isArray(data[STORAGE_KEYS.feePayments]) ? data[STORAGE_KEYS.feePayments].length : 0;

            let totalIncome = 0;
            if (Array.isArray(data[STORAGE_KEYS.feePayments])) {
                totalIncome = data[STORAGE_KEYS.feePayments].reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
            }

            const summaryArea = document.getElementById('backup-summary-txt');
            if (summaryArea) {
                summaryArea.innerHTML = `
                        <div class="grid grid-cols-2 gap-2 text-[11px] font-bold">
                            <div class="bg-indigo-50 p-2 rounded-lg text-indigo-700">ছাত্র: ${toBanglaNum(studentCount)} জন</div>
                            <div class="bg-green-50 p-2 rounded-lg text-green-700">মোট আদায়: ৳${toBanglaNum(totalIncome.toFixed(0))}</div>
                            <div class="bg-orange-50 p-2 rounded-lg text-orange-700">ফি ধরন: ${toBanglaNum(feeCount)}টি</div>
                            <div class="bg-blue-50 p-2 rounded-lg text-blue-700">লেনদেন: ${toBanglaNum(paymentCount)}টি</div>
                        </div>
                    `;
            }

            const jsonArea = document.getElementById('backup-json-area');
            if (jsonArea) jsonArea.value = jsonStr;

            modal.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        window.downloadBackupAction = function (jsonStr) {
            try {
                let backupStr = jsonStr;
                if (!backupStr || typeof backupStr !== 'string') {
                    const area = document.getElementById('backup-json-area');
                    if (area && area.value) backupStr = area.value;
                }

                if (!backupStr) {
                    if (typeof showToast === 'function') showToast("ডাউনলোড করার মত কোনো ডাটা নেই");
                    else alert("ডাউনলোড করার মত কোনো ডাটা নেই");
                    return;
                }

                const fileName = `EasyCM_Backup_${new Date().toISOString().slice(0, 10)}.json`;

                // Helper for standard download
                const triggerStandardDownload = () => {
                    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(backupStr);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = dataUri;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                        if (document.body.contains(a)) document.body.removeChild(a);
                    }, 1000);
                    if (typeof showToast === 'function') showToast("ব্যাকআপ ফাইল ডাউনলোড শুরু হয়েছে");
                };

                // Try Web Share API first (Excellent for WebViews to bypass download restrictions)
                if (navigator.share && navigator.canShare) {
                    try {
                        const file = new File([backupStr], fileName, { type: 'application/json' });
                        if (navigator.canShare({ files: [file] })) {
                            navigator.share({
                                files: [file],
                                title: 'EasyCM Backup',
                                text: 'Easy Class Management Backup File'
                            }).then(() => {
                                if (typeof showToast === 'function') showToast("ব্যাকআপ শেয়ার করা হয়েছে");
                            }).catch((e) => {
                                console.log("Share API cancelled or failed:", e);
                                triggerStandardDownload();
                            });
                            return; // Exit if share was invoked
                        } else {
                            triggerStandardDownload();
                        }
                    } catch (e) {
                        console.log("Share API error:", e);
                        triggerStandardDownload();
                    }
                } else {
                    triggerStandardDownload();
                }

            } catch (e) {
                console.error("Download Error:", e);
                if (typeof showToast === 'function') showToast("ডাউনলোড করতে সমস্যা হয়েছে: " + e.message);
                else alert("ডাউনলোড করতে সমস্যা হয়েছে: " + e.message);
            }
        };

        window.copyBackupText = function () {
            const area = document.getElementById('backup-json-area');
            if (area) {
                area.select();
                document.execCommand('copy');
                showToast("JSON কপি করা হয়েছে");
            }
        };

        // --- NEW IMPORT LOGIC ---
        window.importData = async function (arg) {
            const input = arg.target || arg;
            const file = input && input.files ? input.files[0] : null;
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async function (e) {
                try {
                    const rawData = JSON.parse(e.target.result);
                    pendingRestoreData = standardizeBackupData(rawData);
                    showRestorePreview(pendingRestoreData);
                } catch (err) {
                    console.error('Import Error:', err);
                    showToast('❌ ব্যাকআপ ফাইলটি সঠিক নয়');
                }
            };
            reader.readAsText(file);
            input.value = '';
        };

        function standardizeBackupData(data) {
            const standardized = {};
            const keys = Object.values(STORAGE_KEYS); // e.g. 'cc_students', 'cc_classes'

            // Mapping for legacy keys (V1.0 - V2.3)
            const legacyMap = {
                'cc_students': ['students', 'studentList'],
                'cc_classes': ['classes', 'classList'],
                'cc_custom_fields': ['customFields', 'custom_fields'],
                'cc_fee_types': ['feeTypes', 'fee_types'],
                'cc_fee_payments': ['feePayments', 'fee_payments', 'transactions'],
                'cc_institute_info': ['instituteInfo', 'institute_info', 'schoolInfo'],
                'cc_expenses': ['expenses', 'expenseList'],
                'cc_incomes': ['incomes', 'incomeList'],
                'cc_expense_types': ['expenseTypes', 'expense_types'],
                'cc_income_types': ['incomeTypes', 'income_types'],
                'cc_photo_names': ['photoNames', 'studentPhotos'],
                'cc_student_form_draft': ['formDraft', 'student_draft'],
                'cc_sort_config': ['sortConfig', 'sort_config'],
                'cc_app_version': ['version', 'appVersion'],
                'cc_hidden_fixed_fields': ['hiddenFixedFields', 'hidden_fields']
            };

            keys.forEach(key => {
                let foundVal = null;

                // 1. Check Root for direct key (Modern V2.4+)
                if (data[key] !== undefined) foundVal = data[key];

                // 2. Check Root for legacy key
                if (foundVal === null && legacyMap[key]) {
                    for (const legacyKey of legacyMap[key]) {
                        if (data[legacyKey] !== undefined) {
                            foundVal = data[legacyKey];
                            break;
                        }
                    }
                }

                // 3. Check within Nested 'globalData' (V2.2.5 format)
                if (foundVal === null && data.globalData) {
                    if (data.globalData[key] !== undefined) foundVal = data.globalData[key];
                    else if (legacyMap[key]) {
                        for (const legacyKey of legacyMap[key]) {
                            if (data.globalData[legacyKey] !== undefined) {
                                foundVal = data.globalData[legacyKey];
                                break;
                            }
                        }
                    }
                }

                // 4. Check within Nested 'localStorage' (V2.2.5 raw format)
                if (foundVal === null && data.localStorage) {
                    const rawVal = data.localStorage[key];
                    if (rawVal !== undefined) {
                        try { foundVal = JSON.parse(rawVal); } catch (e) { foundVal = rawVal; }
                    }
                }

                standardized[key] = foundVal;
            });

            return standardized;
        }

        function showRestorePreview(data) {
            const modal = document.getElementById('restore-preview-modal');
            if (!modal) { confirmRestoreAction('replace'); return; }

            const sc = (data[STORAGE_KEYS.students] || []).length;
            const fc = (data[STORAGE_KEYS.feeTypes] || []).length;
            const pc = (data[STORAGE_KEYS.feePayments] || []).length;

            document.getElementById('restore-summary-txt').innerHTML = `
                <div class="grid grid-cols-1 gap-1 text-[11px]">
                    <p class="flex justify-between"><span>মোট ছাত্র:</span> <span class="font-bold text-gray-800">${toBanglaNum(sc)} জন</span></p>
                    <p class="flex justify-between"><span>ফি ধরন:</span> <span class="font-bold text-gray-800">${toBanglaNum(fc)}টি</span></p>
                    <p class="flex justify-between"><span>আদায় রেকর্ড:</span> <span class="font-bold text-gray-800">${toBanglaNum(pc)}টি</span></p>
                </div>
            `;
            modal.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        async function confirmRestoreAction() {
            if (!pendingRestoreData) return;
            const mode = document.querySelector('input[name="restore-mode"]:checked')?.value || 'replace';

            try {
                showToast("রিস্টোর হচ্ছে...", 3000);
                for (const [key, value] of Object.entries(pendingRestoreData)) {
                    if (!value) continue;

                    if (mode === 'merge' && Array.isArray(value)) {
                        const existing = JSON.parse(localStorage.getItem(key) || '[]');
                        if (Array.isArray(existing)) {
                            const merged = [...existing];
                            value.forEach(item => {
                                const exists = merged.some(m => (m.uid && m.uid === item.uid) || (m.id && m.id === item.id));
                                if (!exists) merged.push(item);
                            });
                            await ShadowStorage.save(key, merged);
                            localStorage.setItem(key, JSON.stringify(merged));
                            continue;
                        }
                    }
                    // Default / Replace
                    await ShadowStorage.save(key, value);
                    localStorage.setItem(key, JSON.stringify(value));
                }
                showToast('✅ ব্যাকআপ রিস্টোর সফল হয়েছে!');
                setTimeout(() => location.reload(), 1500);
            } catch (err) {
                console.error('Restore Action Error:', err);
                showToast('❌ রিস্টোর প্রক্রিয়া ব্যর্থ হয়েছে');
            }
        }

        // Global variable to store parsed import data
        let pendingImportData = [];

        function processImport() {
            const rawText = document.getElementById('import-area').value;
            const targetClass = document.getElementById('import-target-class').value;
            const hasHeader = document.getElementById('has-header').checked;

            if (!targetClass.trim()) {
                showToast("দয়া করে ক্লাস নাম লিখুন");
                return;
            }

            // Parse Data with auto-detected delimiter
            const lines = rawText.trim().split(/\r?\n/);
            if (lines.length === 0) {
                showToast("কোন ডাটা পাওয়া যায়নি");
                return;
            }

            // Detect delimiter based on first line (Tab is preferred for Excel)
            const firstLine = lines[0];
            const delimiter = firstLine.includes('\t') ? '\t' : ',';

            const rows = lines.map(line => {
                // Handle basic splitting. For more complex CSV (quotes), a library is better, 
                // but for copy-paste from Excel (TSV), simple split is usually sufficient.
                return line.split(delimiter).map(cell => cell.trim());
            });

            if (rows.length === 0 || (rows.length === 1 && rows[0][0] === '')) {
                showToast("কোন ডাটা পাওয়া যায়নি");
                return;
            }

            // Store for preview
            pendingImportData = rows;
            displayImportPreview(rows, hasHeader);
        }

        function displayImportPreview(rows, hasHeader) {
            try {
                const modal = document.getElementById('import-preview-modal');
                const headerRowEl = document.getElementById('preview-header-row');
                const bodyEl = document.getElementById('preview-body');

                if (!modal || !headerRowEl || !bodyEl) {
                    alert("Preview modal elements not found!");
                    return;
                }

                // Determine columns count based on max columns in first few rows
                const maxCols = Math.max(...rows.slice(0, 5).map(r => r.length));

                // Guess column types
                const sampleDataRow = rows[hasHeader && rows.length > 1 ? 1 : 0];
                const columnGuesses = [];

                for (let i = 0; i < maxCols; i++) {
                    const val = (sampleDataRow[i] || '').trim();
                    if (/^01\d{9}$/.test(val)) columnGuesses.push('mobile');
                    else if (/^\d{1,4}$/.test(val)) columnGuesses.push('roll');
                    else if (/^\d{5,}$/.test(val)) columnGuesses.push('id');
                    else if (val.length > 2) columnGuesses.push('name');
                    else columnGuesses.push('ignore');
                }

                // Render Header with Dropdowns
                let headerHtml = '';
                const fieldOptions = [
                    { val: 'name', label: 'নাম (Name)' },
                    { val: 'id', label: 'আইডি (ID)' },
                    { val: 'roll', label: 'রোল (Roll)' },
                    { val: 'mobile', label: 'মোবাইল (Mobile)' },
                    { val: 'fname', label: 'পিতার নাম (Father Name)' },
                    { val: 'mname', label: 'মাতার নাম (Mother Name)' },
                    { val: 'note', label: 'নোট (Note)' },
                    { val: 'ignore', label: 'বাদ দিন (Ignore)' }
                ];

                // Add Custom Fields dynamically: Safety Check
                if (typeof activeFormFields !== 'undefined' && Array.isArray(activeFormFields)) {
                    activeFormFields.forEach(field => {
                        fieldOptions.push({ val: field, label: field });
                    });
                }

                for (let i = 0; i < maxCols; i++) {
                    const guess = columnGuesses[i] || 'ignore';
                    let optionsHtml = fieldOptions.map(opt =>
                        `<option value="${opt.val}" ${opt.val === guess ? 'selected' : ''}>${opt.label}</option>`
                    ).join('');

                    headerHtml += `
                        <th class="p-2 border bg-gray-100 min-w-[150px]">
                            <select class="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-indigo-500 outline-none column-mapping" data-index="${i}">
                                ${optionsHtml}
                            </select>
                        </th>
                    `;
                }
                headerRowEl.innerHTML = headerHtml;

                // Render Body (Preview first 10 rows)
                let bodyHtml = '';
                const startIndex = hasHeader ? 1 : 0;
                const previewRows = rows.slice(startIndex, startIndex + 10);

                previewRows.forEach(row => {
                    let rowHtml = '<tr class="border-b hover:bg-gray-50">';
                    for (let i = 0; i < maxCols; i++) {
                        rowHtml += `<td class="p-2 border truncate max-w-[150px]">${row[i] || ''}</td>`;
                    }
                    rowHtml += '</tr>';
                    bodyHtml += rowHtml;
                });
                bodyEl.innerHTML = bodyHtml;

                // Show Modal
                document.getElementById('import-modal').classList.add('hidden');
                modal.classList.remove('hidden');
            } catch (err) {
                console.error(err);
                alert("Error in displayImportPreview: " + err.message);
            }
        }

        let pendingConflicts = [];

        async function finalizeImport() {
            const hasHeader = document.getElementById('has-header').checked;
            const targetClass = document.getElementById('import-target-class').value;
            const mappings = Array.from(document.querySelectorAll('.column-mapping')).map(sel => sel.value);

            if (mappings.length === 0) {
                showToast("ম্যাপিং রিড করা যাচ্ছে না। আবার চেষ্টা করুন।");
                return;
            }

            if (!pendingImportData || pendingImportData.length === 0) {
                showToast("কোন ডাটা পাওয়া যায়নি।");
                return;
            }

            let newStudents = [];
            pendingConflicts = [];
            const startIndex = hasHeader ? 1 : 0;

            for (let i = startIndex; i < pendingImportData.length; i++) {
                const row = pendingImportData[i];
                if (!row || row.length === 0) continue;
                if (row.length === 1 && (!row[0] || row[0].trim() === '')) continue;

                let student = {
                    class: targetClass,
                    uid: Date.now().toString(36) + Math.random().toString(36).substr(2) + i,
                    history: []
                };

                let isValid = false;

                mappings.forEach((type, index) => {
                    const val = (row[index] || '').toString().trim();
                    if (type === 'ignore' || !val) return;

                    if (type === 'name') { student.name = val; isValid = true; }
                    else if (type === 'id') { student.id = val; isValid = true; }
                    else if (type === 'roll') { student.roll = val; isValid = true; }
                    else if (type === 'mobile') { student.mobile = val; isValid = true; }
                    else if (type === 'fname') { student.fathersName = val; isValid = true; }
                    else if (type === 'mname') { student.mothersName = val; isValid = true; }
                    else if (type === 'note') { student.note = val; isValid = true; }
                    else {
                        if (!student.custom_fields) student.custom_fields = {};
                        student.custom_fields[type] = val;
                        isValid = true;
                    }
                });

                if (!student.id) {
                    student.id = Math.floor(100000 + Math.random() * 900000).toString();
                }

                if (isValid) {
                    // Duplicate Check
                    if (students.some(s => s.id === student.id)) {
                        pendingConflicts.push(student);
                    } else {
                        newStudents.push(student);
                    }
                }
            }

            if (newStudents.length > 0) {
                students = [...students, ...newStudents];
                if (!classes.includes(targetClass)) {
                    classes.push(targetClass);
                    await saveClasses();
                }
                await saveData();
                showToast(`${newStudents.length} জন শিক্ষার্থী সফলভাবে ইম্পোর্ট করা হয়েছে!`);
            }

            if (pendingConflicts.length > 0) {
                renderConflictModal();
            } else if (newStudents.length > 0) {
                closeModal('import-preview-modal');
                document.getElementById('import-area').value = '';
            } else {
                showToast("কোন নতুন ডাটা ইম্পোর্ট করা যায়নি। কলাম ম্যাপিং চেক করুন।");
            }
        }

        function renderConflictModal() {
            closeModal('import-preview-modal');
            const modal = document.getElementById('duplicate-modal');
            const body = document.getElementById('duplicate-body');
            body.innerHTML = pendingConflicts.map((s, idx) => `
                <tr class="border-b hover:bg-gray-50">
                    <td class="p-2 border font-medium">${s.name || 'Unknown'}</td>
                    <td class="p-2 border">
                        <input type="text" value="${s.id}" oninput="updateConflictId(${idx}, this.value)" 
                               class="w-full p-1 border rounded text-xs focus:ring-1 focus:ring-red-500 outline-none">
                    </td>
                    <td class="p-2 border text-xs text-red-500 font-bold">Duplicate ID</td>
                </tr>
            `).join('');
            modal.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        function updateConflictId(idx, val) {
            if (pendingConflicts[idx]) pendingConflicts[idx].id = val.trim();
        }

        async function resolveConflicts() {
            let fixed = [];
            let stillDupes = [];

            pendingConflicts.forEach(s => {
                if (students.some(existing => existing.id === s.id)) {
                    stillDupes.push(s);
                } else {
                    fixed.push(s);
                }
            });

            if (fixed.length > 0) {
                students = [...students, ...fixed];
                await saveData();
                showToast(`${fixed.length} জন কনফ্লিক্ট ডাটা সফলভাবে যোগ করা হয়েছে!`);
            }

            if (stillDupes.length > 0) {
                pendingConflicts = stillDupes;
                renderConflictModal();
                showToast("কিছু আইডি এখনও ডুপ্লিকেট। ভিন্ন আইডি দিন।", "warning");
            } else {
                closeModal('duplicate-modal');
                pendingConflicts = [];
                document.getElementById('import-area').value = '';
                refreshAppUI();
            }
        }


        // --- Report Generator Logic ---
        function openReportModal(mode = 'LIST', fromSelection = false) {
            closeSidebar();

            const modal = document.getElementById('report-modal');
            if (!modal) {
                console.error('Report modal not found!');
                return;
            }

            isReportSelectionMode = !!fromSelection;
            const classSelect = document.getElementById('report-class-select');
            if (classSelect) {

                // Populate Class Select
                classSelect.innerHTML = `<option value="All">সব ক্লাস (All)</option>` +
                    classes.map(c => `<option value="${c}">${c}</option>`).join('');

                if (isReportSelectionMode) {
                    classSelect.innerHTML = `<option value="SELECTED">নির্বাচিত (${selectedStudents.length})</option>` + classSelect.innerHTML;
                    classSelect.value = 'SELECTED';
                    classSelect.disabled = true;
                } else {
                    classSelect.disabled = false;
                    // Sync with Dashboard Filter [FIXED]
                    const activeFilter = window.dashboardCurrentFilter || 'All';
                    classSelect.value = activeFilter;
                }

                modal.classList.remove('hidden');

                // Set Report Type from mode [FIXED]
                const reportTypeSelect = document.getElementById('report-type');
                if (reportTypeSelect) reportTypeSelect.value = mode;

                // Set default year to current year
                const yearSelect = document.getElementById('report-year-select');
                if (yearSelect) yearSelect.value = new Date().getFullYear().toString();

                toggleReportTypeSettings();

                generateReport(); // Initial generation
            }
        }

        function toggleReportTypeSettings() {
            const type = document.getElementById('report-type')?.value || 'LIST';
            const listSection = document.getElementById('section-column-select');
            const collectionSection = document.getElementById('section-collection-settings');
            const themeSection = document.getElementById('section-id-theme');

            if (!listSection || !collectionSection || !themeSection) return;

            if (type === 'LIST' || type === 'ID_CARD') {
                listSection.classList.remove('hidden');
                collectionSection.classList.add('hidden');

                if (type === 'ID_CARD') {
                    themeSection.classList.remove('hidden');
                } else {
                    themeSection.classList.add('hidden');
                }
            } else {
                // For Fee Collection, show *both* sections
                listSection.classList.remove('hidden');
                collectionSection.classList.remove('hidden');
                renderFeeAndMonthSelections();
            }
            generateReport();
        }

        function renderFeeAndMonthSelections() {
            // Fee Types
            const feeTypesContainer = document.getElementById('report-fee-types-select');
            if (feeTypesContainer) {
                // Default: All fees selected
                feeTypesContainer.innerHTML = (feeTypes || []).filter(f => !f.deletedAt).map(f => `
                    <label class="flex items-center gap-2 cursor-pointer hover:bg-white p-1 rounded transition">
                        <input type="checkbox" value="${f.id}" class="report-fee-checkbox w-4 h-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500" onchange="generateReport()" checked>
                        <span class="text-xs text-gray-700 font-medium">${f.name}</span>
                    </label>
                `).join('') || '<p class="text-[10px] text-gray-400 text-center py-2">কোনো ফি টাইপ নেই</p>';
            }

            // Months (Bengali) - Smart 4-month group selection
            const monthsContainer = document.getElementById('report-months-select');
            if (monthsContainer) {
                const banglaMonths = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
                const currentMonth = new Date().getMonth();

                // Determine 4-month group: [0-3], [4-7], [8-11]
                const groupIdx = Math.floor(currentMonth / 4);
                const startMonth = groupIdx * 4;
                const endMonth = startMonth + 3;

                monthsContainer.innerHTML = banglaMonths.map((m, idx) => {
                    const isChecked = idx >= startMonth && idx <= endMonth;
                    return `
                        <label class="flex items-center gap-2 cursor-pointer hover:bg-white p-1 rounded transition">
                            <input type="checkbox" value="${idx}" class="report-month-checkbox w-3.5 h-3.5 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500" onchange="generateReport()" ${isChecked ? 'checked' : ''}>
                            <span class="text-[10px] text-gray-600 font-medium">${m}</span>
                        </label>
                    `;
                }).join('');
            }
            setTimeout(() => lucide.createIcons(), 10);
        }

        function toggleReportSettings() {
            const popup = document.getElementById('report-settings-popup');
            const btn = document.getElementById('settings-toggle-btn');

            if (popup.classList.contains('hidden')) {
                popup.classList.remove('hidden');
                // Small delay to allow display:block to apply before opacity transition
                setTimeout(() => {
                    popup.classList.remove('scale-95', 'opacity-0');
                    popup.classList.add('scale-100', 'opacity-100');
                }, 10);
                btn.classList.add('bg-indigo-700', 'ring-2', 'ring-offset-2', 'ring-indigo-500');
            } else {
                popup.classList.add('scale-95', 'opacity-0');
                popup.classList.remove('scale-100', 'opacity-100');
                setTimeout(() => {
                    popup.classList.add('hidden');
                }, 200);
                btn.classList.remove('bg-indigo-700', 'ring-2', 'ring-offset-2', 'ring-indigo-500');
            }
        }

        function generateIDCardReport() {
            const selectedClass = document.getElementById('report-class-select').value;
            const previewContainer = document.getElementById('print-preview');
            const checkboxes = document.querySelectorAll('#report-fields input:checked');
            const activeFields = Array.from(checkboxes).map(cb => cb.value);
            const theme = document.getElementById('id-card-theme')?.value || 'blue';

            // Theme Colors Mapping
            const themes = {
                blue: { primary: '#0284c7', secondary: '#0ea5e9', sub: '#38bdf8', text: '#0c4a6e' },
                indigo: { primary: '#4f46e5', secondary: '#6366f1', sub: '#818cf8', text: '#312e81' },
                emerald: { primary: '#059669', secondary: '#10b981', sub: '#34d399', text: '#064e3b' },
                rose: { primary: '#e11d48', secondary: '#f43f5e', sub: '#fb7185', text: '#881337' },
                slate: { primary: '#475569', secondary: '#64748b', sub: '#94a3b8', text: '#0f172a' }
            };
            const colors = themes[theme] || themes.blue;

            // Filter Data
            let reportData = students;
            if (isReportSelectionMode) {
                reportData = students.filter(s => selectedStudents.includes(s.uid));
            } else if (selectedClass !== 'All') {
                reportData = students.filter(s => s.class === selectedClass);
            }
            reportData.sort((a, b) => (a.roll || '').localeCompare(b.roll || '', undefined, { numeric: true }));

            let html = `
                <style>
                    :root {
                        --id-primary: ${colors.primary};
                        --id-secondary: ${colors.secondary};
                        --id-sub: ${colors.sub};
                        --id-text: ${colors.text};
                    }
                    .id-card-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, 2.125in); /* Critical: Auto-fill for responsive grid */
                        gap: 12mm 6mm; /* Vertical and horizontal gap */
                        padding: 10mm;
                        justify-content: center;
                        background: #f1f5f9;
                        width: 100%;
                    }
                    .id-card-pair {
                        display: flex;
                        flex-direction: column; /* Stack front and back vertically */
                        gap: 2mm; /* Gap between front and back */
                        page-break-inside: avoid;
                        width: 2.125in;
                    }
                    .id-card {
                        width: 2.125in;  /* Portrait Width */
                        height: 3.375in; /* Portrait Height */
                        border-radius: 12px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        background: white;
                        box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1);
                        position: relative;
                        font-family: 'SolaimanLipi', 'Outfit', sans-serif;
                        color: #1e293b;
                        border: 0.2mm solid #e2e8f0;
                        flex-shrink: 0;
                    }
                    .id-card-header {
                        height: 35%; /* Adjusted for vertical ratio */
                        background: #fff;
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding-top: 12px;
                        z-index: 1;
                    }
                    .header-top-curves {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        z-index: -1;
                    }
                    .curve-1 {
                        position: absolute;
                        top: -10px;
                        left: -10%;
                        width: 120%;
                        height: 70px;
                        background: var(--id-primary);
                        border-radius: 0 0 50% 50%; /* Different curve for vertical */
                    }
                    .curve-2 {
                        position: absolute;
                        top: 25px;
                        right: -10%;
                        width: 120%;
                        height: 50px;
                        background: var(--id-secondary);
                        border-radius: 0 0 50% 50%;
                        opacity: 0.4;
                    }
                    .inst-name {
                        color: white !important;
                        font-size: 10px;
                        font-weight: 800;
                        text-align: center;
                        margin-bottom: 2px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        z-index: 2;
                        padding: 0 8px;
                        line-height: 1.2;
                        text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                    }
                    .inst-slogan {
                        color: rgba(255,255,255,0.95);
                        font-size: 7px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.8px;
                        z-index: 2;
                    }
                    .id-card-photo-box {
                        margin-top: auto;
                        margin-bottom: -26px; /* Slightly reduced */
                        width: 24mm; /* Slightly smaller for more body room */
                        height: 24mm;
                        border-radius: 50%;
                        border: 3px solid white;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                        overflow: hidden;
                        background: #f8fafc;
                        z-index: 5;
                        flex-shrink: 0;
                    }
                    .id-card-photo {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                    .id-card-body {
                        flex: 1;
                        padding: 30px 6px 4px; /* More compact padding */
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        z-index: 1;
                    }
                    .student-name {
                        font-size: 13px; /* Slightly smaller name */
                        font-weight: 800;
                        color: var(--id-text);
                        margin-bottom: 2px;
                        text-align: center;
                        line-height: 1.15;
                    }
                    .student-title {
                        font-size: 7px;
                        font-weight: 800;
                        color: #64748b;
                        margin-bottom: 8px; /* Compact */
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        background: #f1f5f9;
                        padding: 1px 8px;
                        border-radius: 12px;
                    }
                    .info-container {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        gap: 1.5px;
                        margin-top: 2px;
                    }
                    .info-item {
                        display: flex;
                        align-items: center;
                        font-size: 8.5px; /* Slightly smaller info font */
                        padding-bottom: 1.5px;
                        border-bottom: 0.1mm solid #f1f5f9;
                        line-height: 1.1;
                    }
                    .label-box {
                        width: 44px; /* Narrower labels for more value space */
                        font-weight: 700;
                        color: #64748b;
                        font-size: 7.5px;
                    }
                    .colon {
                        margin-right: 3px;
                        color: #cbd5e1;
                    }
                    .value-box {
                        font-weight: 700;
                        color: #334155;
                        flex: 1;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .id-card-footer {
                        height: 7%; /* Slightly smaller footer */
                        background: var(--id-primary);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 6.5px;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        position: relative;
                    }
                    
                    /* Backside Style */
                    .id-card-back { background: #fff; }
                    .id-card-back .id-card-header { height: 12%; padding-top: 8px; }
                    .id-card-back .id-card-body { padding: 8px 8px; align-items: stretch; }
                    .rules-heading {
                        font-size: 9px;
                        font-weight: 800;
                        color: var(--id-primary);
                        margin-bottom: 6px;
                        border-bottom: 1.5px solid var(--id-secondary);
                        padding-bottom: 1px;
                        text-transform: uppercase;
                        text-align: center;
                    }
                    .rule-item {
                        font-size: 7.5px; /* Slightly smaller rules */
                        line-height: 1.25;
                        color: #475569;
                        margin-bottom: 3.5px;
                        display: flex;
                        gap: 3px;
                    }
                    .rule-bullet { color: var(--id-secondary); font-weight: bold; }
                    .found-notice {
                        margin-top: auto;
                        background: #f8fafc;
                        padding: 6px;
                        border-radius: 6px;
                        border: 0.3mm dashed #cbd5e1;
                        text-align: center;
                    }
                    .found-notice p { font-size: 7px; color: #64748b; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }
                    .found-notice .address { font-size: 7.5px; color: #1e293b; font-weight: 700; margin-top: 1px; line-height: 1.15; }

                    @media print {
                        .id-card-grid {
                            padding: 0;
                            background: none;
                            gap: 5mm; /* Print gap */
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: flex-start; /* Better for reflow in print */
                        }
                        .id-card {
                            box-shadow: none;
                            border: 0.1mm solid #cbd5e1;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                    }
                </style>
                <div class="id-card-grid">
            `;

            reportData.forEach(student => {
                const sId = student.id || student.uid;
                const photoSrc = studentPhotoMap[sId] || getStudentPhoto(student);
                const placeholder = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23cbd5e1%22%3E%3Cpath d=%22M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z%22/%3E%3C/svg%3E";

                const showInfo = (field, label, value) => {
                    if (activeFields.includes(field)) {
                        return `<div class="info-item"><div class="label-box">${label}</div><div class="colon">:</div><div class="value-box">${value || '-'}</div></div>`;
                    }
                    return '';
                };

                html += `
                    <div class="id-card-pair">
                        <div class="id-card">
                            <div class="id-card-header">
                                <div class="header-top-curves">
                                    <div class="curve-1"></div>
                                    <div class="curve-2"></div>
                                </div>
                                <div class="inst-name">${instituteInfo.name || 'INSTITUTE NAME'}</div>
                                <div class="inst-slogan">${instituteInfo.slogan || 'Academic Excellence'}</div>
                                <div class="id-card-photo-box">
                                    <img src="${photoSrc}" class="id-card-photo" onerror="this.src='${placeholder}'; this.style.padding='5px'">
                                </div>
                            </div>
                            <div class="id-card-body">
                                <div class="student-name">${student.name || 'Student Name'}</div>
                                <div class="student-title">Student ID Card</div>
                                <div class="info-container">
                                    ${showInfo('id', 'Student ID', student.id)}
                                    ${showInfo('roll', 'Roll No', student.roll)}
                                    ${showInfo('class', 'Class', student.class)}
                                    ${showInfo('blood_group', 'Blood Grp', student.blood_group || student.bloodGroup || student.custom_fields?.['রক্তের গ্রুপ'])}
                                    ${showInfo('father_name', 'Guardian', student.fathersName || student.father_name || student.father || student.custom_fields?.['পিতার নাম'])}
                                    ${showInfo('mother_name', 'Mother', student.mothersName || student.mother_name || student.mother || student.custom_fields?.['মাতার নাম'])}
                                    ${showInfo('address', 'Address', student.address || student.present_address || student.notes || student.note || student.custom_fields?.['ঠিকানা'])}
                                    ${showInfo('mobile', 'Contact', student.mobile || student.custom_fields?.['মোবাইল নম্বর'])}
                                </div>
                            </div>
                            <div class="id-card-footer">Academic Session ${new Date().getFullYear()}</div>
                        </div>

                        <div class="id-card id-card-back">
                            <div class="id-card-header">
                                <div class="header-top-curves">
                                    <div class="curve-1"></div>
                                    <div class="curve-2"></div>
                                </div>
                                <div class="inst-name">${instituteInfo.name || 'INSTITUTE NAME'}</div>
                                <div class="inst-slogan">Identity Details</div>
                            </div>
                            <div class="id-card-body">
                                <div class="rules-heading">Instructions</div>
                                <div class="rule-item"><span class="rule-bullet">»</span> This card is non-transferable and valid for one session.</div>
                                <div class="rule-item"><span class="rule-bullet">»</span> Must be produced on demand by institute officials.</div>
                                <div class="rule-item"><span class="rule-bullet">»</span> Loss must be reported to the office immediately.</div>
                                <div class="rule-item"><span class="rule-bullet">»</span> Please return this card if found to the address below.</div>
                                
                                <div class="found-notice">
                                    <p>Mailing Address:</p>
                                    <div class="address">${instituteInfo.address || 'Institute Campus Address'}</div>
                                    <div class="address" style="margin-top: 2px; color: var(--id-primary);">Tel: ${instituteInfo.mobile || ''}</div>
                                </div>
                            </div>
                            <div class="id-card-footer">Valid Identity Card</div>
                        </div>
                    </div>
                `;
            });

            html += `</div>`;
            previewContainer.innerHTML = html;
        }

        function renderReportCustomFields() {
            const container = document.getElementById('report-fields');
            if (!container) return;

            activeFormFields.forEach(field => {
                const id = `chk-rpt-${field.replace(/\s+/g, '-')}`;
                if (!document.getElementById(id)) {
                    const label = document.createElement('label');
                    label.className = "flex items-center gap-2.5 cursor-pointer group";
                    label.innerHTML = `
                        <input type="checkbox" id="${id}" value="${field}" onchange="generateReport()"
                            class="w-4 h-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500">
                        <span class="text-sm text-gray-600 group-hover:text-gray-900">${field}</span>
                    `;
                    container.appendChild(label);
                }
            });
        }


        function generateFeeCollectionReport() {
            const selectedClass = document.getElementById('report-class-select').value;
            const previewContainer = document.getElementById('print-preview');
            const yearStr = document.getElementById('report-year-select').value;
            const year = parseInt(yearStr);

            // Get Selected Fees
            const selectedFeeIds = Array.from(document.querySelectorAll('.report-fee-checkbox:checked')).map(cb => cb.value);
            // Get Selected Months (indices 0-11)
            const selectedMonths = Array.from(document.querySelectorAll('.report-month-checkbox:checked')).map(cb => parseInt(cb.value));

            if (selectedFeeIds.length === 0 || selectedMonths.length === 0) {
                previewContainer.innerHTML = `<div class="p-12 text-center text-gray-400">অনুগ্রহ করে অন্তত একটি ফি এবং একটি মাস সিলেক্ট করুন।</div>`;
                return;
            }

            // Get Selected Dynamic Columns
            const fieldCheckboxes = document.querySelectorAll('#report-fields input:checked');
            const selectedFieldKeys = Array.from(fieldCheckboxes).map(cb => cb.value);

            const activeColumns = [];
            REPORT_FIELDS_CONFIG.forEach(field => {
                if (selectedFieldKeys.includes(field.key)) {
                    activeColumns.push(field);
                }
            });
            if (activeFormFields && activeFormFields.length > 0) {
                activeFormFields.forEach(field => {
                    const isStandard = REPORT_FIELDS_CONFIG.some(f => f.label === field || f.key === field);
                    if (!isStandard && selectedFieldKeys.includes(field) && field !== "শিক্ষার্থীর ছবি") {
                        activeColumns.push({ key: field, label: field, isCustom: true });
                    }
                });
            }
            // Ensure Name is present
            if (!activeColumns.some(c => c.key === 'name')) {
                const nameConfig = REPORT_FIELDS_CONFIG.find(c => c.key === 'name');
                if (nameConfig) activeColumns.splice(1, 0, nameConfig);
            }

            // Filter Data
            let reportData = students;
            if (isReportSelectionMode) {
                reportData = students.filter(s => selectedStudents.includes(s.uid));
            } else if (selectedClass !== 'All') {
                reportData = students.filter(s => s.class === selectedClass);
            }
            reportData.sort((a, b) => (a.roll || '').localeCompare(b.roll || ''));

            const banglaMonths = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

            // Set Calculation Date to end of selected year/months to see potential dues
            const maxMonthInSelected = Math.max(...selectedMonths);
            const calculationDate = new Date(year, maxMonthInSelected, 28);

            let html = getInstituteHeader(`ফি আদায় ও বকেয়া শিট - ${toBanglaNum(yearStr)}`, false);

            html += `
            <div class="mb-4 text-center">
                <div class="flex justify-center gap-3 text-sm text-gray-600">
                    ${selectedClass === 'All' ? `<span>ক্লাস: সব ক্লাস</span><span>•</span>` : ''}
                    <span>মোট: ${reportData.length} জন</span>
                    <span>•</span>
                    <span>তারিখ: ${new Date().toLocaleDateString('bn-BD')}</span>
                </div>
            </div>
            ${selectedClass !== 'All' ? `<div class="text-center font-bold text-xl mb-2 text-gray-800">${selectedClass}</div>` : ''}
            <div class="overflow-x-auto print:overflow-visible" style="width: 100%;">
                <table class="w-full text-[10px] border-collapse" style="border: 1px solid #111;">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="p-1 px-2 text-center" style="border: 1px solid #111;" rowspan="2">#</th>
                            ${activeColumns.map(col => `<th class="p-1 px-2 border border-gray-900 ${col.key === 'roll' || col.key === 'mobile' ? 'text-center' : 'text-left'} whitespace-nowrap" rowspan="2" style="border: 1px solid #111;">${col.label}</th>`).join('')}
                            <th class="p-1 text-center bg-indigo-50" style="border: 1px solid #111;" colspan="${selectedFeeIds.length}">নিরধারিত বেতন</th>
                            ${selectedMonths.map(m => `<th class="p-1 text-center" style="border: 1px solid #111;" colspan="${selectedFeeIds.length}">${banglaMonths[m]}</th>`).join('')}
                            <th class="p-1 px-2 text-center bg-gray-200" style="border: 1px solid #111;" rowspan="2">মোট জমা</th>
                            <th class="p-1 px-2 text-center bg-gray-200" style="border: 1px solid #111;" rowspan="2">মোট বকেয়া</th>
                        </tr>
                        <tr>
                            ${selectedFeeIds.map(fid => {
                const fee = feeTypes.find(f => f.id === fid);
                return `<th class="p-0.5 text-[8px] text-center font-normal bg-indigo-50/50" style="border: 1px solid #111; min-width: 40px;">${fee ? fee.name : fid}</th>`;
            }).join('')}
                            ${selectedMonths.map(m => selectedFeeIds.map(fid => {
                const fee = feeTypes.find(f => f.id === fid);
                return `<th class="p-0.5 text-[8px] text-center font-normal" style="border: 1px solid #111; min-width: 40px;">${fee ? fee.name : fid}</th>`;
            }).join('')).join('')}
                        </tr>
                    </thead>
                    <tbody>
        `;

            let grandTotalPaid = 0;
            let grandTotalDue = 0;

            // Initialize Column Totals & Fee-wise Totals
            const columnTotals = {};
            const feeWiseTotals = {}; // { feeId: { paid: 0, due: 0, netRate: 0 } }
            const fixedColumnTotals = {};

            selectedFeeIds.forEach(fid => {
                feeWiseTotals[fid] = { paid: 0, due: 0, netRate: 0 };
                fixedColumnTotals[fid] = 0;
            });

            selectedMonths.forEach(m => {
                selectedFeeIds.forEach(fid => {
                    columnTotals[`${fid}-${year}-${m}`] = 0;
                });
            });

            reportData.forEach((student, idx) => {
                const financials = calculateStudentFinancials(student, calculationDate);

                let studentRowTotalPaid = 0;
                let studentRowTotalDue = 0;

                html += `<tr>`;
                html += `<td class="p-1 text-center font-medium" style="border: 1px solid #111;">${idx + 1}</td>`;

                // Active Columns
                html += activeColumns.map(col => {
                    let val = '-';
                    if (col.key === 'photo') {
                        const photoUrl = studentPhotoMap[student.id || student.uid] || getStudentPhoto(student);
                        val = `<img src="${photoUrl}" class="w-10 h-10 block object-cover mx-auto" onerror="this.src='./img/placeholder.png'; this.onerror=null;">`;
                    } else if (col.isCustom) {
                        val = student.custom_fields && student.custom_fields[col.key] ? student.custom_fields[col.key] : '-';
                    } else {
                        switch (col.key) {
                            case 'roll': val = student.roll || '-'; break;
                            case 'name': val = student.name || '-'; break;
                            case 'id': val = student.id || '-'; break;
                            case 'mobile': val = student.mobile || student.custom_fields?.['মোবাইল নম্বর'] || student.custom_fields?.['অভিভাবকের মোবাইল'] || '-'; break;
                            case 'father_name': val = student.fathersName || student.father_name || student.father || student.custom_fields?.['পিতার নাম'] || '-'; break;
                            case 'mother_name': val = student.mothersName || student.mother_name || student.mother || student.custom_fields?.['মাতার নাম'] || '-'; break;
                            case 'address': val = student.address || student.present_address || student.notes || student.note || student.custom_fields?.['ঠিকানা'] || student.custom_fields?.['বর্তমান ঠিকানা'] || '-'; break;
                            case 'dob':
                                const dobVal = student.dob || student.dateOfBirth || student.custom_fields?.['জন্ম তারিখ'];
                                val = dobVal ? new Date(dobVal).toLocaleDateString('bn-BD') : '-';
                                break;
                            case 'blood_group': val = student.blood_group || student.bloodGroup || student.custom_fields?.['রক্তের গ্রুপ'] || '-'; break;
                            case 'birth_registration': val = student.birth_registration || student.birthRegistration || student.custom_fields?.['জন্ম নিবন্ধন'] || student.custom_fields?.['জন্ম নিবন্ধন নম্বর'] || '-'; break;
                            default: val = student[col.key] || student.custom_fields?.[col.key] || '-';
                        }
                    }
                    const tdClass = col.key === 'photo' ? 'p-0 text-center' : 'p-1 px-2 ' + (col.key === 'roll' || col.key === 'mobile' ? 'text-center' : 'text-left');
                    return `<td class="${tdClass} border border-gray-900 whitespace-nowrap" style="border: 1px solid #111;">${val}</td>`;
                }).join('');

                // 1. Render "নিরধারিত বেতন" columns (Net Rate = Base - Waiver)
                selectedFeeIds.forEach(fid => {
                    let netRateForFee = 0;
                    let feeBreakdownParts = [];

                    selectedMonths.forEach(m => {
                        const feeGroup = financials.details.find(d => d.id === fid);
                        if (feeGroup) {
                            const item = feeGroup.items.find(i => i.year === year && i.month === m);
                            if (item) {
                                const waiver = item.waiverApplied || 0;
                                const netVal = Math.max(0, item.amount - waiver);
                                netRateForFee += netVal;
                                if (waiver > 0) {
                                    feeBreakdownParts.push(`${toBanglaNum(item.amount)}-${toBanglaNum(waiver)}=${toBanglaNum(netVal)}`);
                                }
                            }
                        }
                    });

                    fixedColumnTotals[fid] += netRateForFee;
                    feeWiseTotals[fid].netRate += netRateForFee;

                    let cellDisplay = toBanglaNum(netRateForFee);
                    let hoverTitle = feeBreakdownParts.length > 0 ? feeBreakdownParts.join(', ') : '';

                    html += `<td class="p-1 text-center font-bold bg-indigo-50/20" style="border: 1px solid #111;" title="${hoverTitle}">
                        ${netRateForFee > 0 ? `<div>${cellDisplay}</div>` : '-'}
                        ${feeBreakdownParts.length > 0 ? `<div class="text-[7px] text-gray-400 font-normal leading-none mt-0.5">${feeBreakdownParts.length === 1 ? feeBreakdownParts[0] : 'মৌকুফ সহ'}</div>` : ''}
                    </td>`;
                });

                // 2. Render Month Columns (Cash Paid)
                selectedMonths.forEach(m => {
                    const monthKey = `${year}-${m}`;
                    selectedFeeIds.forEach(fid => {
                        const periodKey = `${fid}-${monthKey}`;

                        let itemTotalApplied = 0; // cash + waiver
                        let itemCashPaid = 0;
                        let itemDue = 0;
                        let itemRate = 0;
                        let paymentDateStr = '';

                        const feeGroup = financials.details.find(d => d.id === fid);
                        if (feeGroup) {
                            const item = feeGroup.items.find(i => i.year === year && i.month === m);
                            if (item) {
                                itemRate = item.amount;
                                itemCashPaid = item.cashPaid || 0;
                                const waiverVal = item.waiverApplied || 0;
                                itemTotalApplied = itemCashPaid + waiverVal;
                                itemDue = Math.max(0, itemRate - itemTotalApplied);

                                if (itemCashPaid > 0) {
                                    const payment = financials.payments.find(p => {
                                        const alloc = p.details?.allocated || p.allocation || [];
                                        return alloc.some(a => (a.itemId || a.id || a.periodKey || a.feeId) === item.id);
                                    });
                                    if (payment) {
                                        const pDate = new Date(payment.date);
                                        paymentDateStr = `${pDate.getDate()}/${pDate.getMonth() + 1}`;
                                    }
                                }
                            }
                        }

                        studentRowTotalPaid += itemCashPaid;
                        studentRowTotalDue += itemDue;

                        if (columnTotals[periodKey] !== undefined) {
                            columnTotals[periodKey] += itemCashPaid;
                        }

                        if (feeWiseTotals[fid]) {
                            feeWiseTotals[fid].paid += itemCashPaid;
                            feeWiseTotals[fid].due += itemDue;
                        }

                        let cellContent = '';
                        // Display CASH PAID only, but use itemTotalApplied for coloring
                        if (itemTotalApplied >= itemRate - 0.01 && itemRate > 0) {
                            cellContent = `<div class="text-green-700 font-bold">${itemCashPaid > 0 ? toBanglaNum(itemCashPaid) : (itemRate > 0 ? '✓' : '-')}</div><div class="text-[7px] text-gray-500">${paymentDateStr}</div>`;
                        } else if (itemTotalApplied > 0) {
                            cellContent = `<div class="text-amber-600 font-bold">${toBanglaNum(itemCashPaid)}</div><div class="text-[7px] text-gray-500">${paymentDateStr}</div>`;
                        } else {
                            cellContent = ``;
                        }

                        html += `<td class="p-0.5 text-center leading-tight h-8" style="border: 1px solid #111;">${cellContent}</td>`;
                    });
                });

                html += `<td class="p-1 text-center font-black bg-gray-50" style="border: 1px solid #111;">${studentRowTotalPaid > 0 ? toBanglaNum(studentRowTotalPaid) : '-'}</td>`;
                html += `<td class="p-1 text-center font-black bg-gray-50 text-red-600" style="border: 1px solid #111;">${studentRowTotalDue > 0 ? toBanglaNum(studentRowTotalDue) : '-'}</td>`;
                html += `</tr>`;

                grandTotalPaid += studentRowTotalPaid;
                grandTotalDue += studentRowTotalDue;
            });

            html += `
                    </tbody>
                    <tfoot class="bg-gray-100 font-bold text-center">
                        <tr>
                            <td colspan="${1 + activeColumns.filter(c => ['photo', 'roll', 'id', 'class'].includes(c.key)).length}" class="p-2 text-right text-xs" style="border: 1px solid #111;">সর্বমোট (Grand Total):</td>
                            ${selectedFeeIds.map(fid => {
                const total = fixedColumnTotals[fid] || 0;
                return `<td class="p-0.5 text-xs font-bold text-indigo-700 bg-indigo-50/30" style="border: 1px solid #111;">${total > 0 ? toBanglaNum(total) : ''}</td>`;
            }).join('')}
                            ${selectedMonths.map(m => selectedFeeIds.map(fid => {
                const total = columnTotals[`${fid}-${year}-${m}`] || 0;
                return `<td class="p-0.5 text-xs font-bold text-gray-800" style="border: 1px solid #111;">${total > 0 ? toBanglaNum(total) : ''}</td>`;
            }).join('')).join('')}
                            <td class="p-1 font-black text-gray-900 text-xs align-top" style="border: 1px solid #111;">
                                ${selectedFeeIds.length > 1 ? `
                                    <div class="mb-1 pb-1 border-b border-gray-300 text-[10px] font-normal text-gray-600 space-y-0.5">
                                        ${selectedFeeIds.map(fid => {
                const fee = feeTypes.find(f => f.id === fid);
                const amount = feeWiseTotals[fid]?.paid || 0;
                return amount > 0 ? `<div class="flex justify-between gap-1"><span>${fee?.name}:</span><span>${toBanglaNum(amount)}</span></div>` : '';
            }).join('')}
                                    </div>
                                ` : ''}
                                <div>৳${toBanglaNum(grandTotalPaid)}</div>
                            </td>
                            <td class="p-1 font-black text-red-600 text-xs align-top" style="border: 1px solid #111;">
                                ${selectedFeeIds.length > 1 ? `
                                    <div class="mb-1 pb-1 border-b border-gray-300 text-[10px] font-normal text-red-400 space-y-0.5">
                                        ${selectedFeeIds.map(fid => {
                const fee = feeTypes.find(f => f.id === fid);
                const amount = feeWiseTotals[fid]?.due || 0;
                return amount > 0 ? `<div class="flex justify-between gap-1"><span>${fee?.name}:</span><span>${toBanglaNum(amount)}</span></div>` : '';
            }).join('')}
                                    </div>
                                ` : ''}
                                <div>৳${toBanglaNum(grandTotalDue)}</div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;

            previewContainer.innerHTML = html;
        }

        function generateReport() {
            const reportType = document.getElementById('report-type')?.value || 'LIST';
            const selectedClass = document.getElementById('report-class-select').value;
            const pageSize = document.getElementById('report-size').value;
            const previewContainer = document.getElementById('print-preview');

            // Apply Page Size Dimensions
            let width = '210mm';
            let height = 'auto'; // Default A4

            if (pageSize === 'Legal') {
                width = '216mm';
                height = 'auto';
            } else if (pageSize === 'Letter') {
                width = '216mm';
                height = 'auto';
            } else if (pageSize === 'A5') {
                width = '148mm';
                height = 'auto';
            } else if (pageSize === 'A3') {
                width = '297mm';
                height = 'auto';
            }

            previewContainer.style.width = '100%'; // Full width to fit container
            previewContainer.style.maxWidth = width; // Constrain to paper size
            previewContainer.style.height = 'fit-content'; // Force it to fit content
            previewContainer.style.minHeight = '297mm'; // Minimum A4 height for look
            previewContainer.style.padding = '10mm'; // Standard margin
            previewContainer.style.overflow = 'visible'; // Ensure content can be seen
            previewContainer.style.boxSizing = 'border-box';
            previewContainer.style.margin = '0 auto';

            // Add Print @page CSS dynamically
            const existingStyle = document.getElementById('dynamic-print-style');
            if (existingStyle) existingStyle.remove();

            const style = document.createElement('style');
            style.id = 'dynamic-print-style';
            style.innerHTML = `
                @page { size: ${pageSize} portrait; margin: 10mm; }
                @media print {
                    #print-preview { 
                        width: 100% !important; 
                        margin: 0 !important; 
                        padding: 0 !important; 
                        box-shadow: none !important;
                    }
                }
            `;
            document.head.appendChild(style);

            if (reportType === 'COLLECTION_SHEET') {
                generateFeeCollectionReport();
                return;
            }

            if (reportType === 'ID_CARD') {
                generateIDCardReport();
                return;
            }

            // Get checked fields
            const checkboxes = document.querySelectorAll('#report-fields input:checked');
            const fields = Array.from(checkboxes).map(cb => cb.value);

            // Filter Data
            let reportData = students;

            if (isReportSelectionMode) {
                reportData = students.filter(s => selectedStudents.includes(s.uid));
            } else if (selectedClass !== 'All' && selectedClass !== 'SELECTED') {
                reportData = students.filter(s => s.class === selectedClass);
            }
            reportData.sort((a, b) => {
                const rA = String(a.roll || '');
                const rB = String(b.roll || '');
                return rA.localeCompare(rB, undefined, { numeric: true, sensitivity: 'base' });
            });

            // Group students by class for multi-class reports
            const groupedStudents = {};
            if (selectedClass === 'All' && !isReportSelectionMode) {
                reportData.forEach(s => {
                    const cls = s.class || 'অশ্রেণীবদ্ধ'; // Default class for students without one
                    if (!groupedStudents[cls]) {
                        groupedStudents[cls] = [];
                    }
                    groupedStudents[cls].push(s);
                });
                // Sort classes alphabetically
                Object.keys(groupedStudents).sort().forEach(key => {
                    groupedStudents[key].sort((a, b) => {
                        const rA = String(a.roll || '');
                        const rB = String(b.roll || '');
                        return rA.localeCompare(rB, undefined, { numeric: true, sensitivity: 'base' });
                    });
                });
            } else {
                // If a specific class is selected or in selection mode, treat as a single group
                const groupName = isReportSelectionMode ? 'নির্বাচিত শিক্ষার্থী' : (selectedClass === 'All' ? 'সব শিক্ষার্থী' : selectedClass);
                groupedStudents[groupName] = reportData;
            }

            // Build Table HTML
            let html = getInstituteHeader('শিক্ষার্থী তালিকা', false);


            // Global Header Info
            html += `
                 <div class="mb-6 text-center">
                     <div class="flex justify-center gap-3 text-sm text-gray-600">
                         ${selectedClass === 'All' ? `<span>ক্লাস: সব ক্লাস</span><span>•</span>` : ''}
                         <span>মোট: ${reportData.length} জন</span>
                         <span>•</span>
                         <span>তারিখ: ${new Date().toLocaleDateString('bn-BD')}</span>
                     </div>
                 </div>
            `;

            // Get selected fields from DOM based on checkboxes
            const selectedFieldKeys = Array.from(document.querySelectorAll('#report-fields input:checked')).map(cb => cb.value);

            // Build active columns config
            const activeColumns = [];

            // Add standard fields if selected
            REPORT_FIELDS_CONFIG.forEach(field => {
                if (selectedFieldKeys.includes(field.key)) {
                    activeColumns.push(field);
                }
            });

            // Add custom fields if selected (chkbox value == field name)
            if (activeFormFields && activeFormFields.length > 0) {
                activeFormFields.forEach(field => {
                    // Check if it's already a standard field key or strictly a custom field
                    const isStandard = REPORT_FIELDS_CONFIG.some(f => f.label === field || f.key === field);
                    if (!isStandard && selectedFieldKeys.includes(field) && field !== "শিক্ষার্থীর ছবি") {
                        activeColumns.push({ key: field, label: field, isCustom: true });
                    }
                });
            }

            // Ensure Name is always there if not (disabled checkbox handles this but failsafe)
            if (!activeColumns.some(c => c.key === 'name')) {
                const nameConfig = REPORT_FIELDS_CONFIG.find(c => c.key === 'name');
                if (nameConfig) activeColumns.splice(1, 0, nameConfig); // Insert after ID/Roll typically
            }


            Object.keys(groupedStudents).forEach((className, classIndex) => {
                const classData = groupedStudents[className];
                // Class Header
                html += `
                <div class="${classIndex > 0 ? 'mt-8 border-t pt-8' : ''} mb-4">
                    <div class="flex items-center justify-between mb-2 border-b pb-2">
                        <div class="text-xl font-bold text-gray-800">
                            ${className}
                        </div>
                        <span class="text-sm font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">${classData.length} জন</span>
                    </div>
                
                    <div class="overflow-x-auto max-w-full" style="width: 100%;">
                        <div style="min-width: fit-content;">
                        <table class="w-full text-sm text-left border-collapse border border-gray-300">
                            <thead class="bg-gray-50 text-gray-800 font-semibold text-xs uppercase">
                                <tr>
                                    <th class="px-2 py-1.5 border border-gray-300 text-center w-8 whitespace-nowrap">#</th>
                                    ${activeColumns.map(col => `<th class="px-2 py-1.5 border border-gray-300 ${col.key === 'photo' ? 'w-12 text-center' : (col.key === 'roll' || col.key === 'mobile' ? 'text-center' : 'text-left')} whitespace-nowrap">${col.label}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                `;

                classData.forEach((student, index) => {
                    html += `
                        <tr>
                            <td class="px-2 py-1.5 border border-gray-300 text-center text-gray-600 font-medium">${index + 1}</td>
                            ${activeColumns.map(col => {
                        let val = '-';
                        if (col.key === 'photo') {
                            const photoUrl = studentPhotoMap[student.id || student.uid] || getStudentPhoto(student);
                            val = `<img src="${photoUrl}" class="w-12 h-12 block object-cover mx-auto border-0" onerror="this.src='./img/placeholder.png'; this.onerror=null;">`;
                        } else if (col.isCustom) {
                            // Custom field value from student object
                            val = student.custom_fields && student.custom_fields[col.key] ? student.custom_fields[col.key] : '-';
                        } else {
                            // Standard field mapping
                            switch (col.key) {
                                case 'roll': val = student.roll || '-'; break;
                                case 'name': val = student.name || '-'; break;
                                case 'id': val = student.id || '-'; break;
                                case 'mobile': val = student.mobile || student.custom_fields?.['মোবাইল নম্বর'] || student.custom_fields?.['অভিভাবকের মোবাইল'] || '-'; break;
                                case 'father_name': val = student.fathersName || student.father_name || student.father || student.custom_fields?.['পিতার নাম'] || '-'; break;
                                case 'mother_name': val = student.mothersName || student.mother_name || student.mother || student.custom_fields?.['মাতার নাম'] || '-'; break;
                                case 'address': val = student.address || student.present_address || student.notes || student.note || student.custom_fields?.['ঠিকানা'] || student.custom_fields?.['বর্তমান ঠিকানা'] || '-'; break;
                                case 'dob':
                                    const dobVal = student.dob || student.dateOfBirth || student.custom_fields?.['জন্ম তারিখ'];
                                    val = dobVal ? new Date(dobVal).toLocaleDateString('bn-BD') : '-';
                                    break;
                                case 'blood_group': val = student.blood_group || student.bloodGroup || student.custom_fields?.['রক্তের গ্রুপ'] || '-'; break;
                                case 'birth_registration': val = student.birth_registration || student.birthRegistration || student.custom_fields?.['জন্ম নিবন্ধন'] || student.custom_fields?.['জন্ম নিবন্ধন নম্বর'] || '-'; break;
                                default: val = student[col.key] || student.custom_fields?.[col.key] || '-';
                            }
                        }
                        const tdClass = col.key === 'photo' ? 'p-0 text-center' : 'px-2 py-1.5 ' + (col.key === 'roll' || col.key === 'mobile' ? 'text-center' : 'text-left');
                        return `<td class="${tdClass} border border-gray-300 font-medium text-gray-700">${val}</td>`;
                    }).join('')}
                        </tr>
                    `;
                });

                html += `
                            </tbody>
                            <tfoot class="bg-gray-200 font-bold">
                                <tr>
                                    <td class="px-2 py-2 border border-gray-300 text-right font-black text-gray-800 pr-4" colspan="${1 + activeColumns.filter(c => ['photo', 'roll', 'id', 'class'].includes(c.key)).length}">মোট (Total):</td>
                                    <td class="px-2 py-2 border border-gray-300 text-center font-black text-gray-800">${classData.length} জন</td>
                                    ${Array(Math.max(0, activeColumns.length - (activeColumns.filter(c => ['photo', 'roll', 'id', 'class'].includes(c.key)).length) - 1)).fill('<td class="px-2 py-2 border border-gray-300"></td>').join('')}
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                `;
            });

            // Footer Info
            html += `
            <div class="mt-8 pt-8 border-t border-gray-200 flex justify-between text-xs text-gray-400">
                <span> প্রিন্ট: ${new Date().toLocaleString('bn-BD')}</span>
                <span>Class Connect দ্বারা প্রস্তুতকৃত</span>
            </div>
            `;

            previewContainer.innerHTML = html;
        }

        function printReport() {
            const previewContainer = document.getElementById('print-preview');
            const printArea = document.getElementById('print-area');

            // Clone content
            printArea.innerHTML = previewContainer.innerHTML;

            // Scale Logic
            // We need to check if content is wider than the page width
            // Page width is fixed (e.g., 210mm or 216mm) minus padding (1.5cm * 2 = 3cm)
            // But simplify: compare container width with table width

            const table = printArea.querySelector('table');
            if (table) {
                // Ensure table tries to be full width
                table.style.width = '100%';

                // Get the container width (approximate from page size style)
                const pageStyleWidth = previewContainer.style.width; // e.g. "210mm"

                // We need pixel values to calculate scale. 
                // Let's rely on the browser's layout in the hidden print area.
                // But print-area is display:none usually. We need to make it visible to measure? 
                // Actually, let's inject a wrapper with a specific ID to handle scaling css

                const wrapper = document.createElement('div');
                wrapper.innerHTML = printArea.innerHTML;
                printArea.innerHTML = '';
                printArea.appendChild(wrapper);

                // Temporarily assume standard width based on selection
                let mmWidth = 210;
                if (pageStyleWidth === '216mm') mmWidth = 216;

                // Convert mm to approx px (96 DPI) -> 1mm = 3.78px
                const availablePx = (mmWidth - 30) * 3.78; // 30mm padding

                // We can't easily measure valid scrollWidth in a hidden element or before print.
                // SO: let's use a trick: Scale down if the *preview* table was overflowing.

                const previewTable = previewContainer.querySelector('table');
                if (previewTable) {
                    const contentWidth = previewTable.offsetWidth;
                    const containerWidth = previewContainer.clientWidth - (previewContainer.style.padding ? 56 * 2 : 0); // approx 1.5cm = 56px

                    // Actually, previewContainer is box-sizing: content-box usually? 
                    // Let's just compare offsetWidth of table vs clientWidth of container

                    const availableWidth = previewContainer.clientWidth - 114; // 1.5cm * 2 approx 113.38px
                    const actualWidth = previewTable.scrollWidth;

                    if (actualWidth > availableWidth) {
                        const scale = availableWidth / actualWidth;
                        // Apply scale to the wrapper in print area
                        wrapper.style.transform = `scale(${scale})`;
                        wrapper.style.transformOrigin = 'top left';
                        wrapper.style.width = `${(100 / scale)}%`; // Compensate width
                    }
                }
            }

            window.print();
        }

        function copyReportText() {
            const container = document.getElementById('print-preview');
            const rows = container.querySelectorAll('tr');
            let text = "";
            rows.forEach(row => {
                const cols = row.querySelectorAll('th, td');
                const rowText = Array.from(cols).map(c => c.innerText).join('\t');
                text += rowText + "\n";
            });

            navigator.clipboard.writeText(text).then(() => {
                showToast("লিস্ট টেক্সট কপি করা হয়েছে!");
            });
        }

        // --- Core Functions (Existing) ---
        async function syncClasses() {
            // Get all unique classes currently present in the student data
            const studentClasses = new Set(students.map(s => s.class).filter(c => c));

            // 1. Preserve existing classes (do not auto-delete classes with 0 students)
            const updatedClasses = [...classes];

            // 2. Identify and append any new classes found in student data
            const existingSet = new Set(updatedClasses);
            students.forEach(s => {
                if (s.class && !existingSet.has(s.class)) {
                    updatedClasses.push(s.class);
                    existingSet.add(s.class);
                }
            });

            // 3. Update and persist only if the list has changed
            if (JSON.stringify(classes) !== JSON.stringify(updatedClasses)) {
                classes = updatedClasses;
                await saveClasses();
            }
        }

        function setFilter(cls) {
            console.log("Setting filter to:", cls);
            currentFilter = cls ? cls.toString().trim() : 'All';
            renderClassFilters();
            renderStudents();

            // Auto-center the selected filter tab
            const container = document.getElementById('class-filters-container');
            const activeBtn = Array.from(document.querySelectorAll('#class-filters button')).find(btn =>
                (cls === 'All' && btn.textContent.includes('সব')) || btn.textContent === cls
            );
            if (activeBtn && container) {
                activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }

        }

        function renderFilters() {
            if (typeof renderClassFilters === 'function') renderClassFilters();
        }

        function renderClassFilters() {
            const container = document.getElementById('class-filters');
            if (!container) return;
            const parent = container.parentElement;
            if (parent) parent.classList.remove('hidden');

            container.innerHTML = ''; // Clear existing

            const normalize = str => (str || '').toString().trim();
            const currentNorm = normalize(currentFilter || 'All');

            // 1. Advanced Filter Toggle (Moved Here)
            const advToggle = document.createElement('button');
            const isActive = (currentAdvFeeFilter || currentAdvStatusFilter !== 'all');
            advToggle.id = 'adv-filter-toggle-main';
            advToggle.onclick = toggleAdvancedFilterMenu;
            advToggle.className = `p-2 bg-indigo-50 text-indigo-500 hover:bg-indigo-100 rounded-full transition-all duration-200 border border-indigo-100 flex items-center justify-center relative shrink-0 mr-1 shadow-sm`;
            advToggle.title = "অ্যাডভান্সড ফিল্টার";
            advToggle.innerHTML = `
                <i data-lucide="filter" class="w-4 h-4"></i>
                <span class="filter-active-dot absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full border border-white ${isActive ? '' : 'hidden'}"></span>
            `;
            container.appendChild(advToggle);

            // 1.5. "All" Button
            const allIsActive = currentNorm === 'All';
            if (allIsActive) {
                const wrapper = document.createElement('div');
                wrapper.className = `group flex items-center rounded-full border border-green-600 bg-green-600 text-white shadow-md ring-2 ring-green-100 transform scale-105 z-10 transition-all duration-200 shrink-0 select-none`;

                const nameBtn = document.createElement('div');
                nameBtn.textContent = 'সব (All)';
                nameBtn.className = `pl-4 pr-1 py-1.5 text-sm font-medium whitespace-nowrap cursor-default`;
                wrapper.appendChild(nameBtn);

                const menuBtn = document.createElement('button');
                menuBtn.innerHTML = `<i data-lucide="more-vertical" class="w-3.5 h-3.5"></i>`;
                menuBtn.className = `px-2 py-1.5 flex items-center justify-center rounded-r-full text-green-100 hover:text-white hover:bg-green-700 transition-colors`;
                menuBtn.title = "ক্লাস পরিচালনা (Manage Classes)";
                menuBtn.onclick = (e) => {
                    e.stopPropagation();
                    showClassContextMenu('All', e);
                };
                wrapper.appendChild(menuBtn);
                container.appendChild(wrapper);
            } else {
                const allBtn = document.createElement('button');
                allBtn.textContent = 'সব (All)';
                allBtn.className = `px-5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 bg-white text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-600`;
                allBtn.onclick = () => setFilter('All');
                container.appendChild(allBtn);
            }

            // 2. Class Buttons
            classes.forEach(cls => {
                const isActive = currentNorm === normalize(cls);

                if (isActive) {
                    // Active State: Split Button (Name | Menu)
                    const wrapper = document.createElement('div');
                    wrapper.className = `group flex items-center rounded-full border border-green-600 bg-green-600 text-white shadow-md ring-2 ring-green-100 transform scale-105 z-10 transition-all duration-200 shrink-0 select-none`;

                    // Class Name (Active)
                    const nameBtn = document.createElement('div');
                    nameBtn.textContent = cls;
                    nameBtn.className = `pl-4 pr-1 py-1.5 text-sm font-medium whitespace-nowrap cursor-default`;
                    wrapper.appendChild(nameBtn);

                    // Three Dot Button (Trigger Context Menu)
                    const menuBtn = document.createElement('button');
                    menuBtn.innerHTML = `<i data-lucide="more-vertical" class="w-3.5 h-3.5"></i>`;
                    menuBtn.className = `px-2 py-1.5 flex items-center justify-center rounded-r-full text-green-100 hover:text-white hover:bg-green-700 transition-colors`;
                    menuBtn.title = "অপশন (Options)";
                    menuBtn.onclick = (e) => {
                        e.stopPropagation();
                        showClassContextMenu(cls, e);
                    };
                    wrapper.appendChild(menuBtn);

                    container.appendChild(wrapper);

                } else {
                    // Inactive State: Simple Button
                    const btn = document.createElement('button');
                    btn.textContent = cls;
                    btn.className = `px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 bg-white text-gray-600 border border-gray-200 hover:bg-green-50 hover:text-green-600`;
                    btn.onclick = () => setFilter(cls);
                    container.appendChild(btn);
                }
            });

            // 3. Add Class Button
            const addBtn = document.createElement('button');
            addBtn.innerHTML = `<i data-lucide="plus" class="w-3 h-3"></i> ক্লাস`;
            addBtn.className = "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-green-50 text-green-600 hover:bg-green-100 whitespace-nowrap border border-green-200 transition shadow-sm ml-2 shrink-0";
            addBtn.onclick = addNewClass;
            container.appendChild(addBtn);

            // 4. Update Dashboard Report Filter (if exists) [NEW]
            const reportSelect = document.getElementById('dash-report-class-filter');
            if (reportSelect) {
                const currentVal = reportSelect.value;
                reportSelect.innerHTML = '<option value="All">সকল ক্লাস (All Classes)</option>';
                classes.forEach(cls => {
                    const opt = document.createElement('option');
                    opt.value = cls;
                    opt.textContent = cls;
                    reportSelect.appendChild(opt);
                });

                // Sync with Dashboard Filter: Prioritize dashboardCurrentFilter [FIXED]
                const activeFilter = window.dashboardCurrentFilter || 'All';
                if (activeFilter && (classes.includes(activeFilter) || activeFilter === 'All')) {
                    reportSelect.value = activeFilter;
                } else if (classes.includes(currentVal)) {
                    reportSelect.value = currentVal;
                }
            }

            lucide.createIcons();
        }

        function addNewClass() {
            document.getElementById('new-class-names').value = '';
            document.getElementById('class-modal').classList.remove('hidden');
            setTimeout(() => document.getElementById('new-class-names').focus(), 100);
        }

        function confirmAddClass() {
            const rawText = document.getElementById('new-class-names').value;
            const lines = rawText.split(/\n/);
            let addedCount = 0; let firstAdded = null;
            lines.forEach(line => {
                const name = line.trim();
                if (name && !classes.includes(name)) {
                    classes.push(name); if (!firstAdded) firstAdded = name; addedCount++;
                }
            });
            if (addedCount > 0) {
                saveClasses();
                renderClassFilters();
                if (typeof renderDashboard === 'function') renderDashboard();
                if (typeof updateClassSuggestions === 'function') updateClassSuggestions();
                showToast(`${addedCount} টি ক্লাস যোগ করা হয়েছে`);
                if (addedCount === 1 && firstAdded) setFilter(firstAdded);
            } else if (rawText.trim()) showToast("ক্লাসগুলো ইতিমধ্যে আছে");
            closeModal('class-modal');
        }






        function toggleAdvancedFilterMenu() {
            const modal = document.getElementById('adv-filter-modal');
            const menu = document.getElementById('adv-filter-menu');

            if (modal.classList.contains('hidden')) {
                renderAdvancedFilterOptions();
                modal.classList.remove('hidden');
            } else {
                modal.classList.add('hidden');
            }
        }

        function renderAdvancedFilterOptions() {
            const select = document.getElementById('adv-filter-fee');
            const currentVal = select.value || currentAdvFeeFilter;

            // Populate if empty or force refresh
            select.innerHTML = '<option value="">All Fees (Global Status)</option>';
            feeTypes.forEach(f => {
                const opt = document.createElement('option');
                opt.value = f.name;
                opt.textContent = f.name;
                select.appendChild(opt);
            });
            select.value = currentVal;

            // Set Status Buttons
            setAdvStatus(currentAdvStatusFilter, false);
            setAdvStudentStatus(currentAdvStudentStatusFilter, false);
        }

        function setAdvStudentStatus(status, apply = false) {
            currentAdvStudentStatusFilter = status;
            ['active', 'inactive', 'all'].forEach(s => {
                const btn = document.getElementById(`btn-student-status-${s}`);
                if (btn) {
                    if (s === status) {
                        btn.className = "flex-1 min-w-[70px] py-2 text-xs font-bold rounded-lg bg-white shadow-sm text-indigo-600 transition";
                    } else {
                        btn.className = "flex-1 min-w-[70px] py-2 text-xs font-bold rounded-lg text-gray-500 hover:bg-white/50 transition";
                    }
                }
            });
            if (apply) applyAdvancedFilter(false);
        }

        function setAdvStatus(status, apply = false) {
            currentAdvStatusFilter = status;
            ['all', 'paid', 'unpaid', 'partial', 'advance', 'waiver'].forEach(s => {
                const btn = document.getElementById(`btn-status-${s}`);
                if (btn) {
                    if (s === status) {
                        btn.className = "flex-1 min-w-[70px] py-2 text-xs font-bold rounded-lg bg-white shadow-sm text-indigo-600 transition";
                    } else {
                        btn.className = "flex-1 min-w-[70px] py-2 text-xs font-bold rounded-lg text-gray-500 hover:bg-white/50 transition";
                    }
                }
            });
            if (apply) applyAdvancedFilter(false); // Default to not closing when toggling status inside menu
        }

        function setAdvStudentStatus(status, apply = false) {
            currentAdvStudentStatusFilter = status;
            ['active', 'inactive', 'all'].forEach(s => {
                const btn = document.getElementById(`btn-student-status-${s}`);
                if (btn) {
                    if (s === status) {
                        btn.className = "flex-1 min-w-[70px] py-2 text-xs font-bold rounded-lg bg-white shadow-sm text-indigo-600 transition";
                    } else {
                        btn.className = "flex-1 min-w-[70px] py-2 text-xs font-bold rounded-lg text-gray-500 hover:bg-white/50 transition";
                    }
                }
            });
            if (apply) applyAdvancedFilter(false);
        }

        function applyAdvancedFilter(closeMenu = true) {
            const select = document.getElementById('adv-filter-fee');
            currentAdvFeeFilter = select.value;

            // Update All Dots
            document.querySelectorAll('.filter-active-dot').forEach(dot => {
                if (currentAdvFeeFilter || currentAdvStatusFilter !== 'all' || currentAdvStudentStatusFilter !== 'active') {
                    dot.classList.remove('hidden');
                } else {
                    dot.classList.add('hidden');
                }
            });

            if (closeMenu) {
                document.getElementById('adv-filter-menu').classList.add('hidden');
                document.getElementById('adv-filter-backdrop').classList.add('hidden');
            }
            filterStudents();
        }

        function resetAdvancedFilter(closeMenu = true) {
            currentAdvFeeFilter = '';
            setAdvStatus('all', false); // Don't apply yet
            setAdvStudentStatus('active', false);
            document.getElementById('adv-filter-fee').value = '';
            applyAdvancedFilter(closeMenu); // Apply reset
        }
        function filterStudents() {
            const feesPage = document.getElementById('fees-page');
            const dashboardPage = document.getElementById('dashboard-page');
            const expensesView = document.getElementById('expenses-view');

            if (dashboardPage && !dashboardPage.classList.contains('hidden')) {
                // Filter Dashboard context
                if (typeof renderDashboard === 'function') renderDashboard();
            } else if (expensesView && !expensesView.classList.contains('hidden')) {
                // Filter Standalone Expense Page
                if (typeof renderExpenses === 'function') renderExpenses();
            } else if (feesPage && !feesPage.classList.contains('hidden')) {
                // Check which tab is active in Fees Page
                const manageTab = document.getElementById('fees-content-manage');
                const manageTabVisible = manageTab && !manageTab.classList.contains('hidden');

                if (manageTabVisible) {
                    if (typeof renderFeeTypesGrid === 'function') renderFeeTypesGrid();
                } else {
                    if (typeof renderFeesStudentGrid === 'function') renderFeesStudentGrid();
                }
            } else {
                renderStudents();
            }
        }

        function getFilteredStudents() {
            // Check both old and new search inputs
            const oldSearch = document.getElementById('search-input')?.value || '';
            const newSearch = document.getElementById('student-search')?.value || '';
            const searchVal = (oldSearch || newSearch).toLowerCase().trim();
            const filterNorm = (currentFilter || 'All').toString().trim().toLowerCase();

            return students.filter(s => {
                const sClassRaw = s.class;
                const sClassNorm = (sClassRaw === null || sClassRaw === undefined) ? '' : String(sClassRaw).trim().toLowerCase();
                const matchesFilter = filterNorm === 'all' || sClassNorm === filterNorm;

                const nameVal = String(s.name || '').toLowerCase();
                const idVal = String(s.id || '').toLowerCase();
                const rollVal = String(s.roll || '').toLowerCase();
                const mobileVal = String(s.mobile || '');
                const classVal = String(s.class || '').toLowerCase();

                let customFieldsText = '';
                if (s.custom_fields) {
                    customFieldsText = Object.values(s.custom_fields).join(' ').toLowerCase();
                }

                const matchesSearch = !searchVal ||
                    nameVal.includes(searchVal) ||
                    idVal.includes(searchVal) ||
                    rollVal.includes(searchVal) ||
                    mobileVal.includes(searchVal) ||
                    classVal.includes(searchVal) ||
                    customFieldsText.includes(searchVal);

                // Advanced Filter Logic
                let matchesAdvFilter = true;
                const hasAdvFilter = (typeof currentAdvStatusFilter !== 'undefined' && currentAdvStatusFilter !== 'all') ||
                    (typeof currentAdvFeeFilter !== 'undefined' && currentAdvFeeFilter);

                if (hasAdvFilter) {
                    const financials = calculateStudentFinancials(s);
                    if (typeof currentAdvFeeFilter !== 'undefined' && currentAdvFeeFilter) {
                        const feeItem = financials.details.find(f => f.name === currentAdvFeeFilter);
                        if (!feeItem) {
                            matchesAdvFilter = false;
                        } else {
                            if (currentAdvStatusFilter === 'paid') {
                                matchesAdvFilter = feeItem.balance <= 0;
                            } else if (currentAdvStatusFilter === 'unpaid') {
                                matchesAdvFilter = feeItem.balance > 0;
                            } else if (currentAdvStatusFilter === 'partial') {
                                matchesAdvFilter = feeItem.paid > 0 && feeItem.balance > 0;
                            } else if (currentAdvStatusFilter === 'advance') {
                                matchesAdvFilter = feeItem.paid > (s.waivers && s.waivers[feeItem.id] ? (feeItem.total - parseFloat(s.waivers[feeItem.id])) : feeItem.total);
                            } else if (currentAdvStatusFilter === 'waiver') {
                                matchesAdvFilter = (feeItem.waiver || 0) > 0;
                            }
                        }
                    } else {
                        // Global Status
                        if (currentAdvStatusFilter === 'paid') {
                            matchesAdvFilter = financials.balance <= 0;
                        } else if (currentAdvStatusFilter === 'unpaid') {
                            matchesAdvFilter = financials.balance > 0;
                        } else if (currentAdvStatusFilter === 'partial') {
                            matchesAdvFilter = financials.totalPaid > 0 && financials.balance > 0;
                        } else if (currentAdvStatusFilter === 'advance') {
                            matchesAdvFilter = financials.advance > 0;
                        } else if (currentAdvStatusFilter === 'waiver') {
                            matchesAdvFilter = financials.totalWaiver > 0;
                        }
                    }
                }
                return matchesFilter && matchesSearch && matchesAdvFilter;
            });
        }

        // Student Sort Configuration
        window.studentSortConfig = JSON.parse(localStorage.getItem(STORAGE_KEYS.sortConfig)) || {
            key: 'id', // Default sort by ID
            direction: 'asc' // Default ascending
        };

        function renderStudents() {
            let filtered = getFilteredStudents();

            // Apply Sorting
            const key = window.studentSortConfig.key;
            const dir = window.studentSortConfig.direction === 'asc' ? 1 : -1;

            filtered.sort((a, b) => {
                let valA, valB;

                if (key === 'id') {
                    valA = a.id || '';
                    valB = b.id || '';
                    const numA = parseFloat(valA);
                    const numB = parseFloat(valB);
                    if (!isNaN(numA) && !isNaN(numB)) {
                        return (numA - numB) * dir;
                    }
                } else if (key === 'roll') {
                    valA = parseFloat(a.roll) || 0;
                    valB = parseFloat(b.roll) || 0;
                    return (valA - valB) * dir;
                } else if (key === 'name') {
                    valA = (a.name || '').toString();
                    valB = (b.name || '').toString();
                    return valA.localeCompare(valB, 'bn') * dir;
                } else if (key === 'date') {
                    valA = a.statusHistory && a.statusHistory[0] ? a.statusHistory[0].date : (parseInt(a.uid, 36) || 0);
                    valB = b.statusHistory && b.statusHistory[0] ? b.statusHistory[0].date : (parseInt(b.uid, 36) || 0);
                    return (valA - valB) * dir;
                } else {
                    valA = (a[key] || '').toString().toLowerCase();
                    valB = (b[key] || '').toString().toLowerCase();
                }

                if (valA < valB) return -1 * dir;
                if (valA > valB) return 1 * dir;
                return 0;
            });
            const grid = document.getElementById('student-grid');
            const emptyState = document.getElementById('empty-state');
            const totalCount = document.getElementById('total-count');

            if (totalCount) totalCount.textContent = `মোট ${filtered.length} জন শিক্ষার্থী`;

            if (!grid || !emptyState) return;

            if (filtered.length === 0) {
                grid.innerHTML = '';
                const emptyText = document.getElementById('empty-state-text');
                if (emptyText) {
                    if (currentFilter !== 'All') emptyText.textContent = `এখনও ${currentFilter} ক্লাসে কোনো শিক্ষার্থী নেই।`;
                    else emptyText.textContent = "কোনো শিক্ষার্থী পাওয়া যায়নি।";
                }
                emptyState.classList.remove('hidden'); return;
            }
            emptyState.classList.add('hidden');
            grid.innerHTML = filtered.map(s => {
                let customHtml = '';
                if (s.custom_fields) {
                    for (const [key, value] of Object.entries(s.custom_fields)) {
                        if (value) customHtml += `<div class="mb-1"><span class="text-[10px] text-gray-400 font-medium block">${key}</span><span class="font-medium">${value}</span></div>`;
                    }
                }
                const isSelected = selectedStudents.includes(s.uid);
                const selectedClass = isSelected ? 'selected' : '';
                const isInactive = s.status === 'inactive';
                const statusClasses = isInactive ? 'bg-gray-50 opacity-75 grayscale-[0.5]' : '';

                let inactiveBadgeHtml = '';
                if (isInactive) {
                    inactiveBadgeHtml = `<span class="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-widest shrink-0 shadow-sm border border-gray-300">ইনঅ্যাক্টিভ</span>`;
                }

                // Calculate due
                let totalDueHtml = '';
                try {
                    if (typeof calculateStudentFinancials === 'function') {
                        const fin = calculateStudentFinancials(s);
                        const totalDue = fin.balance || 0;
                        if (totalDue > 0) {
                            totalDueHtml = `<div class="bg-red-50 text-red-600 px-3 py-1.5 rounded-xl border border-red-100 font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0"><i data-lucide="alert-circle" class="w-4 h-4"></i> ৳${totalDue.toLocaleString()}</div>`;
                        } else {
                            totalDueHtml = `<div class="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl border border-emerald-100 font-bold text-xs flex items-center gap-1.5 shadow-sm shrink-0"><i data-lucide="check-circle-2" class="w-4 h-4"></i> ক্লিয়ার</div>`;
                        }
                    }
                } catch (e) { console.warn('Error calculating due for card:', e); }

                const selectionHtml = selectionMode && isSelected ? '<div class="absolute top-2 left-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center z-20 shadow-md"><i data-lucide="check" class="w-3 h-3 text-white"></i></div>' : '';

                return `
                <div class="bg-white rounded-2xl p-4 card-shadow slide-enter flex flex-col relative group student-card ${selectedClass} ${statusClasses} transition-all duration-300 border ${isSelected ? 'border-indigo-400 ring-2 ring-indigo-300 ring-offset-2 shadow-xl' : 'border-gray-100 hover:border-indigo-200 hover:shadow-xl'}" 
                    data-uid="${s.uid}"
                    onmousedown="startStudentLongPress('${s.uid}', event)" 
                    onmouseup="cancelStudentLongPress()" 
                    onmouseleave="cancelStudentLongPress()"
                    ontouchstart="startStudentLongPress('${s.uid}', event)" 
                    ontouchmove="cancelStudentLongPress()"
                    ontouchend="cancelStudentLongPress()"
                    onclick="${selectionMode ? `toggleStudentSelection('${s.uid}')` : `openStudentDetails('${s.uid}')`}">
                    
                    ${selectionHtml}
                    
                    <div class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-4 overflow-visible flex-1 relative">
                            ${getStudentPhotoHTML(s, 'w-14 h-14 ring-0 flex-shrink-0 bg-indigo-600 text-white shadow-md')}
                            <div class="flex-1 min-w-0 flex flex-col justify-center">
                                <div class="flex items-center gap-3 mb-1.5 flex-wrap">
                                    <h3 class="font-black text-gray-900 text-[19px] leading-tight truncate">${s.name}</h3>
                                    ${inactiveBadgeHtml}
                                </div>
                                <div class="flex items-center gap-2.5 opacity-80">
                                    <span class="text-xs font-bold text-gray-600">আইডি: ${s.id || '-'}</span>
                                    <span class="text-xs text-gray-300">•</span>
                                    <span class="text-xs font-bold text-gray-600">রোল: ${s.roll || '-'}</span>
                                </div>

                                <!-- Communication Dropdown Menu -->
                                <div id="student-menu-${s.uid}" class="hidden absolute right-0 top-16 w-[230px] bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[60] origin-top-right transform transition-all duration-200 scale-95 opacity-0">
                                    <div class="p-1 grid grid-cols-3 gap-1">
                                        <a href="tel:${getFormattedNumber(s.mobile, 'tel')}" onmousedown="event.stopPropagation();" ontouchstart="event.stopPropagation();" onclick="event.stopPropagation()" class="flex flex-col items-center justify-center gap-1 p-2.5 bg-gray-50 hover:bg-green-50 text-green-600 rounded-lg transition-colors">
                                            <i data-lucide="phone" class="w-5 h-5"></i>
                                            <span class="text-[11px] font-bold">কল</span>
                                        </a>
                                        <a href="sms:${getFormattedNumber(s.mobile, 'tel')}" onmousedown="event.stopPropagation();" ontouchstart="event.stopPropagation();" onclick="event.stopPropagation()" class="flex flex-col items-center justify-center gap-1 p-2.5 bg-gray-50 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                            <i data-lucide="message-square" class="w-5 h-5"></i>
                                            <span class="text-[11px] font-bold">এসএমএস</span>
                                        </a>
                                        <a href="https://wa.me/${getFormattedNumber(s.mobile, 'wa')}" target="_blank" onmousedown="event.stopPropagation();" ontouchstart="event.stopPropagation();" onclick="event.stopPropagation()" class="flex flex-col items-center justify-center gap-1 p-2.5 bg-gray-50 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors">
                                            <i data-lucide="message-circle" class="w-5 h-5"></i>
                                            <span class="text-[11px] font-bold">হোয়াটসঅ্যাপ</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col items-end gap-2 shrink-0">
                            <!-- Action Trigger on Right -->
                            <button onmousedown="event.stopPropagation();" base-onclick="event.stopPropagation();" onclick="event.stopPropagation(); toggleStudentMenu('${s.uid}')" class="w-8 h-8 flex items-center justify-center bg-gray-50 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors active:scale-95 shadow-sm" title="যোগাযোগ">
                                <i data-lucide="more-vertical" class="w-5 h-5 transition-transform duration-200" id="card-caret-${s.uid}"></i>
                            </button>
                            ${totalDueHtml}
                        </div>
                    </div>
                </div>`;
            }).join('');
            lucide.createIcons();
        }


        function toggleStudentMenu(uid) {
            const menu = document.getElementById(`student-menu-${uid}`);
            const allMenus = document.querySelectorAll('[id^="student-menu-"]');

            // Helper to get card
            const getCard = (id) => {
                const m = document.getElementById(id);
                return m ? m.closest('.student-card') : null;
            };

            // Close all other menus first
            allMenus.forEach(m => {
                if (m.id !== `student-menu-${uid}`) {
                    if (!m.classList.contains('hidden')) {
                        m.classList.add('scale-95', 'opacity-0');
                        setTimeout(() => m.classList.add('hidden'), 200);

                        // Reset z-index of other cards
                        const card = getCard(m.id);
                        if (card) {
                            card.style.zIndex = '';
                            card.style.position = ''; // Revert to CSS default
                        }
                    }
                }
            });

            const currentCard = getCard(`student-menu-${uid}`);

            if (menu.classList.contains('hidden')) {
                // Open
                if (currentCard) {
                    currentCard.style.position = 'relative'; // Ensure relative
                    currentCard.style.zIndex = '100'; // High z-index
                }

                menu.classList.remove('hidden');

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        menu.classList.remove('scale-95', 'opacity-0');
                        menu.classList.add('scale-100', 'opacity-100');
                    });
                });

                // Close menu when clicking outside
                const closeMenu = (e) => {
                    if (!e.target.closest(`#student-menu-${uid}`) && !e.target.closest(`[onclick*="toggleStudentMenu('${uid}')"]`)) {
                        menu.classList.add('scale-95', 'opacity-0');
                        menu.classList.remove('scale-100', 'opacity-100');
                        setTimeout(() => {
                            menu.classList.add('hidden');
                            if (currentCard) {
                                currentCard.style.zIndex = '';
                                currentCard.style.position = '';
                            }
                        }, 200);
                        document.removeEventListener('click', closeMenu);
                    }
                };
                setTimeout(() => document.addEventListener('click', closeMenu), 0);
            } else {
                // Close
                menu.classList.add('scale-95', 'opacity-0');
                menu.classList.remove('scale-100', 'opacity-100');
                setTimeout(() => {
                    menu.classList.add('hidden');
                    if (currentCard) {
                        currentCard.style.zIndex = '';
                        currentCard.style.position = '';
                    }
                }, 200);
            }
        }

        function toggleSortMenu() {
            const modal = document.getElementById('sort-modal');
            if (modal) {
                const isHidden = modal.classList.contains('hidden');
                if (isHidden) {
                    modal.classList.remove('hidden');
                    updateSortMenuUI();
                } else {
                    modal.classList.add('hidden');
                }
            }
        }

        function updateSortMenuUI() {
            const key = window.studentSortConfig.key;
            const dir = window.studentSortConfig.direction;

            // Update keys
            ['id', 'roll', 'name', 'date'].forEach(k => {
                const btn = document.getElementById(`sort-key-${k}`);
                if (btn) {
                    if (k === key) {
                        btn.classList.add('bg-indigo-600', 'text-white');
                        btn.classList.remove('bg-gray-100', 'text-gray-600');
                    } else {
                        btn.classList.remove('bg-indigo-600', 'text-white');
                        btn.classList.add('bg-gray-100', 'text-gray-600');
                    }
                }
            });

            // Update directions
            const ascBtn = document.getElementById('sort-dir-asc');
            const descBtn = document.getElementById('sort-dir-desc');
            if (dir === 'asc') {
                ascBtn.classList.add('bg-indigo-600', 'text-white');
                ascBtn.classList.remove('bg-gray-100', 'text-gray-600');
                descBtn.classList.remove('bg-indigo-600', 'text-white');
                descBtn.classList.add('bg-gray-100', 'text-gray-600');
            } else {
                descBtn.classList.add('bg-indigo-600', 'text-white');
                descBtn.classList.remove('bg-gray-100', 'text-gray-600');
                ascBtn.classList.remove('bg-indigo-600', 'text-white');
                ascBtn.classList.add('bg-gray-100', 'text-gray-600');
            }
        }

        function setSortKey(key) {
            window.studentSortConfig.key = key;
            if (typeof ShadowStorage !== 'undefined') ShadowStorage.save(STORAGE_KEYS.sortConfig, window.studentSortConfig);
            updateSortMenuUI();
            if (typeof renderStudents === 'function') renderStudents();
            if (typeof renderFeesStudentGrid === 'function') renderFeesStudentGrid();
        }

        function setSortDirection(dir) {
            window.studentSortConfig.direction = dir;
            if (typeof ShadowStorage !== 'undefined') ShadowStorage.save(STORAGE_KEYS.sortConfig, window.studentSortConfig);
            updateSortMenuUI();
            if (typeof renderStudents === 'function') renderStudents();
            if (typeof renderFeesStudentGrid === 'function') renderFeesStudentGrid();
        }

        function toggleStudentDetailsMenu(uid) {
            const menu = document.getElementById(`student-details-menu-${uid}`);
            if (!menu) return;

            // Close all other detail menus
            document.querySelectorAll('[id^="student-details-menu-"]').forEach(m => {
                if (m.id !== `student-details-menu-${uid}` && !m.classList.contains('hidden')) {
                    m.classList.add('scale-95', 'opacity-0');
                    setTimeout(() => m.classList.add('hidden'), 200);
                }
            });

            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                setTimeout(() => {
                    menu.classList.remove('scale-95', 'opacity-0');
                    menu.classList.add('scale-100', 'opacity-100');
                }, 10);
            } else {
                menu.classList.remove('scale-100', 'opacity-100');
                menu.classList.add('scale-95', 'opacity-0');
                setTimeout(() => menu.classList.add('hidden'), 200);
            }
        }

        async function promptNewField() {
            const fieldName = await customPrompt("নতুন ফিল্ডের নাম লিখুন (যেমন: মাতার নাম, বেতন):", "", "নতুন তথ্য ক্ষেত্র");
            if (fieldName && fieldName.trim()) {
                const name = fieldName.trim();

                // Check if it matches a hidden fixed field
                const labelMap = { 'father': 'পিতার নাম', 'mother': 'মাতার নাম', 'notes': 'ঠিকানা / নোট' };
                let restored = false;
                for (const [key, label] of Object.entries(labelMap)) {
                    if (name === label && hiddenFixedFields.includes(key)) {
                        hiddenFixedFields = hiddenFixedFields.filter(f => f !== key);
                        ShadowStorage.save(STORAGE_KEYS.hiddenFixedFields, hiddenFixedFields);
                        updateFixedFieldVisibility();
                        showToast(`"${label}" আবার যোগ করা হয়েছে`);
                        restored = true;
                        break;
                    }
                }

                if (!restored && !customFields.includes(name)) {
                    customFields.push(name); ShadowStorage.save(STORAGE_KEYS.customFields, customFields);
                    renderCustomFieldInputs();
                }
            }
        }

        async function removeCustomField(field) {
            const confirmed = await customConfirm(
                `আপনি কি নিশ্চিত যে আপনি "${field}" ফিল্ডটি মুছে ফেলতে চান?`,
                'ফিল্ড মুছে ফেলুন'
            );

            if (confirmed) {
                activeFormFields = activeFormFields.filter(f => f !== field);
                customFields = activeFormFields;
                ShadowStorage.save(STORAGE_KEYS.customFields, customFields);
                renderCustomFieldInputs();
                showToast(`"${field}" ফিল্ড মুছে ফেলা হয়েছে`);

                // If special report function exists, call it
                if (typeof renderReportCustomFields === 'function') renderReportCustomFields();
            }
        }



        async function toggleAutoGenerate() {
            const isChecked = document.getElementById('auto-gen-check').checked;
            const rollInput = document.getElementById('inp-roll');
            const idInput = document.getElementById('inp-id');
            const classInput = document.getElementById('inp-class');

            if (isChecked) {
                const limit = await customPrompt('আইডি কত ডিজিটের হবে? (যেমন: ৩ দিলে ০০১ হবে)', instituteInfo.idLimit || 3, 'আইডি ডিজিট লিমিট');
                if (limit) {
                    instituteInfo.idLimit = parseInt(limit) || 3;
                    ShadowStorage.save(STORAGE_KEYS.instituteInfo, instituteInfo);
                }

                rollInput.setAttribute('readonly', true); idInput.setAttribute('readonly', true);
                rollInput.classList.add('bg-gray-100', 'text-gray-500'); idInput.classList.add('bg-gray-100', 'text-gray-500');
                calculateAutoValues(classInput.value);
            } else {
                rollInput.removeAttribute('readonly'); idInput.removeAttribute('readonly');
                rollInput.classList.remove('bg-gray-100', 'text-gray-500'); idInput.classList.remove('bg-gray-100', 'text-gray-500');
                if (!document.getElementById('edit-uid').value) { rollInput.value = ''; idInput.value = ''; }
            }
        }

        function handleClassChange() {
            if (document.getElementById('auto-gen-check').checked) calculateAutoValues(document.getElementById('inp-class').value);
        }

        function calculateAutoValues(className) {
            if (!className) return;
            const classStudents = students.filter(s => s.class === className);
            let maxRoll = 0;
            classStudents.forEach(s => { const r = parseInt(s.roll); if (!isNaN(r) && r > maxRoll) maxRoll = r; });
            const nextRoll = maxRoll + 1;
            document.getElementById('inp-roll').value = nextRoll < 10 ? '0' + nextRoll : nextRoll;

            const maxId = students.reduce((max, s) => {
                const id = parseInt(s.id);
                return !isNaN(id) && id > max ? id : max;
            }, 0);
            const digitLimit = instituteInfo.idLimit || 3;
            const nextId = String(maxId + 1).padStart(digitLimit, '0');
            document.getElementById('inp-id').value = nextId;
        }



        async function handleFormSubmit(e) {
            e.preventDefault();
            try {
                const editUid = document.getElementById('edit-uid').value;
                const name = document.getElementById('inp-name').value;
                const roll = document.getElementById('inp-roll').value;
                const id = document.getElementById('inp-id').value;
                const cls = document.getElementById('inp-class').value;
                const mobile = getMobileFromForm();
                const father = document.getElementById('inp-father').value;
                const mother = document.getElementById('inp-mother').value;
                const notes = document.getElementById('inp-notes').value;
                const editUidVal = editUid;

                // --- DATA PREPARATION ---
                let customData = {};
                if (editUidVal) {
                    const existingStudent = students.find(s => s.uid === editUidVal);
                    if (existingStudent && existingStudent.custom_fields) {
                        customData = { ...existingStudent.custom_fields };
                    }
                }

                // --- FILE HANDLING ---
                const photoInput = document.getElementById('inp-photo');
                const birthInput = document.getElementById('inp-birth-cert');
                const photoUrlInput = document.getElementById('inp-photo-url');
                const birthUrlInput = document.getElementById('inp-birth-cert-url');
                
                const isPhotoUrlActive = document.getElementById('pane-inp-photo-url') && !document.getElementById('pane-inp-photo-url').classList.contains('hidden');
                const isBirthUrlActive = document.getElementById('pane-inp-birth-cert-url') && !document.getElementById('pane-inp-birth-cert-url').classList.contains('hidden');
                
                let newPhotoUrl = null;

                // Auto-Download Helper
                const downloadFile = (file, newName) => {
                    const blobUrl = URL.createObjectURL(file);
                    const a = document.createElement('a');
                    a.href = blobUrl;
                    a.download = newName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    // URL.revokeObjectURL(blobUrl); // Keep for session use if needed, or rely on GC
                    return blobUrl;
                };

                const cleanName = (name || 'Student').trim().replace(/[/\\?%*:|"<>]/g, '-');
                const cleanId = (id || 'NoID').trim();

                if (photoInput && photoInput.files[0]) {
                    const file = photoInput.files[0];
                    const ext = file.name.split('.').pop();
                    const newName = `${cleanId} ${cleanName}.${ext}`;

                    // 1. Trigger Download
                    const blobUrl = downloadFile(file, newName);

                    // 2. Update Session Map (Immediate Display)
                    newPhotoUrl = blobUrl;

                    // 3. Save Filename to Custom Data
                    customData['imageFilename'] = newName;
                } else if (isPhotoUrlActive) {
                    const url = photoUrlInput ? photoUrlInput.value.trim() : '';
                    if (url) {
                        newPhotoUrl = url;
                        customData['imageFilename'] = url;
                    } else {
                        delete customData['imageFilename'];
                        const sIdKey = String(cleanId).trim().toLowerCase();
                        delete studentPhotoMap[sIdKey];
                    }
                }

                if (birthInput && birthInput.files[0]) {
                    const file = birthInput.files[0];
                    const ext = file.name.split('.').pop();
                    const newName = `${cleanId} ${cleanName}_BirthCertificate.${ext}`;
                    downloadFile(file, newName);

                    // Save Filename
                    customData['birthCertFilename'] = newName;
                } else if (isBirthUrlActive) {
                    const url = birthUrlInput ? birthUrlInput.value.trim() : '';
                    if (url) {
                        customData['birthCertFilename'] = url;
                    } else {
                        delete customData['birthCertFilename'];
                    }
                }

                // --- DATA SAVING ---
                // (customData is already initialized at the top)

                const customInputs = document.querySelectorAll('.custom-field-input');
                if (customInputs) {
                    customInputs.forEach(input => {
                        const fieldName = input.dataset.field;
                        const value = input.value.trim();
                        if (value) customData[fieldName] = value;
                        else delete customData[fieldName];
                    });
                }

                const isActive = document.getElementById('inp-status').checked;
                const status = isActive ? 'active' : 'disabled';

                if (!name || !mobile) {
                    return showToast("অনুগ্রহ করে প্রয়োজনীয় তথ্য দিন");
                }

                if (!cls) {
                    const clsInput = document.getElementById('inp-class');
                    clsInput.classList.add('border-red-500', 'ring-2', 'ring-red-200');
                    clsInput.focus();
                    // Remove error styles on input
                    clsInput.addEventListener('input', () => {
                        clsInput.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
                    }, { once: true });
                    return showToast("ক্লাস নির্বাচন বা লিখুন");
                }

                if (!classes.includes(cls)) { classes.push(cls); saveClasses(); }

                const photoId = (id || '').trim() + (name || '').trim().replace(/\s+/g, '');

                // Update Photo Map if new photo
                if (newPhotoUrl) {
                    // We assume 'id' is unique enough for the map key as per existing logic
                    const sIdKey = String(cleanId).trim().toLowerCase();
                    studentPhotoMap[sIdKey] = newPhotoUrl;
                    // Also update cache names if relevant?
                }

                if (editUid) {
                    const index = students.findIndex(s => s.uid === editUid);
                    if (index !== -1) {
                        const oldStatus = students[index].status || 'active';
                        const statusHistory = students[index].statusHistory || [{ status: oldStatus, date: Date.now() }];

                        if (status !== oldStatus) statusHistory.push({ status: status, date: Date.now() });

                        students[index] = {
                            ...students[index],
                            name, roll, id, photoId, class: cls, mobile,
                            fathersName: father, mothersName: mother, notes,
                            custom_fields: customData,
                            status: status,
                            statusHistory: statusHistory
                        };
                        showToast("তথ্য আপডেট করা হয়েছে");
                    }
                } else {
                    const newStudent = {
                        uid: Date.now().toString(36) + Math.random().toString(36).substr(2),
                        name, roll, id, photoId, class: cls, mobile,
                        fathersName: father, mothersName: mother, notes,
                        custom_fields: customData,
                        status: status,
                        statusHistory: [{ status: status, date: Date.now() }],
                        feeOverrides: {}
                    };
                    students.push(newStudent);
                    showToast("শিক্ষার্থী যোগ করা হয়েছে");
                }

                saveData();
                clearDraft(); // Auto-Clear Draft on Success
                e.target.reset();

                // Clear previews
                const previewPhoto = document.getElementById('preview-photo');
                if (previewPhoto) previewPhoto.classList.add('hidden');

                const previewBirth = document.getElementById('preview-birth-cert');
                if (previewBirth) previewBirth.classList.add('hidden');
                document.querySelectorAll('.group i[data-lucide]').forEach(i => i.classList.remove('hidden'));

                document.getElementById('edit-uid').value = '';
                document.getElementById('auto-gen-check').checked = false;
                toggleAutoGenerate();
                closeModal('student-modal');
                setFilter(cls);
                updateClassSuggestions();
                renderStudents(); // Refresh to show new photo if any
            } catch (error) {
                console.error(error);
                showToast("Error: " + (error.message || error));
            }
        }

        function editStudent(uid) {
            openAddModal(uid);
        }

        async function hideFixedField(field) {
            const labelMap = { 'father': 'পিতার নাম', 'mother': 'মাতার নাম', 'notes': 'ঠিকানা / নোট' };
            const confirmed = await customConfirm(
                `আপনি কি নিশ্চিত যে আপনি "${labelMap[field]}" ফিল্ডটি সরিয়ে ফেলতে চান? পরে প্রয়োজনে আবার যোগ করতে পারবেন।`,
                'ফিল্ড সরিয়ে ফেলুন'
            );

            if (confirmed) {
                if (!hiddenFixedFields.includes(field)) {
                    hiddenFixedFields.push(field);
                    localStorage.setItem('cc_hidden_fixed_fields', JSON.stringify(hiddenFixedFields));
                }
                updateFixedFieldVisibility();
                showToast(`"${labelMap[field]}" সরিয়ে ফেলা হয়েছে`);
            }
        }

        function updateFixedFieldVisibility() {
            const fields = ['father', 'mother', 'notes'];
            fields.forEach(f => {
                const el = document.getElementById(`field-container-${f}`);
                if (el) {
                    if (hiddenFixedFields.includes(f)) {
                        el.classList.add('hidden');
                    } else {
                        el.classList.remove('hidden');
                    }
                }
            });
        }

        async function deleteStudent(uid) {
            const confirmed = await customConfirm('আপনি কি নিশ্চিত যে আপনি এই শিক্ষার্থীকে মুছে ফেলতে চান?', 'শিক্ষার্থী মুছুন');
            if (confirmed) {
                students = students.filter(s => s.uid !== uid);
                saveData();
                renderFilters();
                renderStudents();
                showToast("শিক্ষার্থী মুছে ফেলা হয়েছে");
                closeStudentDetailPanel();
            }
        }

        async function toggleStudentStatus(uid) {
            const index = students.findIndex(s => s.uid === uid);
            if (index === -1) return;

            const currentStatus = students[index].status || 'active';
            const newStatus = currentStatus === 'active' ? 'disabled' : 'active';

            const statusHistory = students[index].statusHistory || [];
            statusHistory.push({ status: newStatus, date: Date.now() });

            students[index].status = newStatus;
            students[index].statusHistory = statusHistory;

            saveData();
            renderStudents();
            if (typeof renderDashboard === 'function') renderDashboard();
            if (currentDetailUid === uid) showStudentDetailPanel(students[index]);

            showToast(`শিক্ষার্থীকে ${newStatus === 'active' ? 'অ্যাক্টিভেট' : 'ডিজেবল'} করা হয়েছে`);
        }

        function toggleStudentExpand(uid) {
            openStudentDetails(uid);
        }

        // --- Student Detail Side Panel (Desktop) ---
        function openStudentDetails(uid) {
            const student = students.find(s => s.uid === uid);
            if (!student) return;
            showStudentDetailPanel(student);
        }

        function closeStudentDetailPanel() {
            const drawer = document.getElementById('student-details-drawer');
            const panel = document.getElementById('desktop-student-panel-container');
            const backdrop = document.getElementById('student-details-backdrop');

            if (panel) panel.style.transform = 'translateX(100%)';
            if (backdrop) backdrop.style.opacity = '0';
            const backdropClick = document.getElementById('student-backdrop-click');
            if (backdropClick) backdropClick.style.opacity = '0';

            setTimeout(() => {
                if (drawer) drawer.classList.add('hidden');
                if (panel) panel.classList.add('pointer-events-none');
                const desktopContent = document.getElementById('student-details-content');
                const placeholder = document.getElementById('student-details-placeholder');
                if (desktopContent) {
                    desktopContent.classList.add('hidden');
                    desktopContent.innerHTML = '';
                }
                if (placeholder) placeholder.classList.remove('hidden');
            }, 500);

            // Remove Highlighting
            document.querySelectorAll('.student-card-active').forEach(card => {
                card.classList.remove('student-card-active', 'ring-2', 'ring-indigo-500', 'bg-indigo-50/50');
            });
        }

        function openStudentById(uid) {
            const student = students.find(s => s.uid === uid);
            if (student) showStudentDetailPanel(student);
        }

        function showStudentDetailPanel(student) {
            currentDetailUid = student.uid;
            currentMode = 'students';
            const drawer = document.getElementById('student-details-drawer');
            const panelContainer = document.getElementById('desktop-student-panel-container');
            const backdrop = document.getElementById('student-details-backdrop');
            const desktopContent = document.getElementById('student-details-content');
            const placeholder = document.getElementById('student-details-placeholder');

            if (drawer) drawer.classList.remove('hidden');

            // Build Custom Fields HTML
            let customHtml = '';
            if (student.custom_fields) {
                for (const [key, value] of Object.entries(student.custom_fields)) {
                    if (value) customHtml += `
                        <div class="p-3 bg-gray-50 rounded border border-gray-100">
                            <span class="text-xs text-gray-500 font-bold uppercase tracking-wider block mb-1">${key}</span>
                            <span class="font-medium text-gray-800">${value}</span>
                        </div>`;
                }
            }

            const isDisabled = student.status === 'disabled';
            const headerGradient = isDisabled ? 'from-gray-600 to-gray-700' : 'from-indigo-600 to-violet-600';

            const contentHtml = `
                <!-- Header -->
                <div class="p-5 bg-gradient-to-r ${headerGradient} text-white flex items-center justify-between shadow-md shrink-0 cursor-pointer" style="pointer-events: auto;" onclick="closeStudentDetailPanel()">
                    <div class="flex items-center gap-4">
                        ${getStudentPhotoHTML(student, 'w-14 h-14', true)}
                        <div>
                            <h3 class="font-bold text-2xl tracking-tight leading-tight">${student.name}</h3>
                            <div class="flex items-center gap-2 mt-1">
                                <div class="flex items-center text-indigo-100 text-[10px] leading-none">
                                    <span class="opacity-95 font-bold tracking-wide">${student.class}</span>
                                    <span class="opacity-30 mx-1">|</span>
                                    <span class="opacity-95 font-bold tracking-tight">ID: ${student.id || '-'}</span>
                                    <span class="opacity-30 mx-1">|</span>
                                    <span class="opacity-95 font-bold tracking-tight">রোল: ${student.roll || '-'}</span>
                                </div>
                                <div class="flex items-center gap-2 bg-black/20 px-2 py-1 rounded-full border border-white/10 ml-1" onclick="event.stopPropagation()">
                                    <span class="text-[9px] font-black uppercase tracking-tighter text-white/90">${student.status === 'disabled' ? 'Inactive' : 'Active'}</span>
                                    <label class="toggle-switch">
                                        <input type="checkbox" ${student.status !== 'disabled' ? 'checked' : ''} onchange="toggleStudentStatus('${student.uid}')">
                                        <span class="toggle-slider ${student.status === 'disabled' ? 'disabled' : ''}"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-1 relative">
                        <!-- Options Dropdown -->
                        <div class="relative">
                            <button onclick="event.stopPropagation(); toggleStudentDetailsMenu('${student.uid}')" class="p-2 hover:bg-white/20 rounded-full transition-colors" title="পরিচালনা">
                                <i data-lucide="more-vertical" class="w-4 h-4 text-white"></i>
                            </button>
                            <!-- Dropdown Menu -->
                            <div id="student-details-menu-${student.uid}" class="hidden absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] origin-top-right transform transition-all duration-200 scale-95 opacity-0">
                                <button onclick="event.stopPropagation(); toggleStudentDetailsMenu('${student.uid}'); copyStudentInfo('${student.uid}')" class="w-full text-left px-4 py-3.5 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 transition active:bg-gray-100">
                                    <div class="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                                        <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
                                    </div>
                                    তথ্য শেয়ার করুন
                                </button>
                                <button onclick="event.stopPropagation(); toggleStudentDetailsMenu('${student.uid}'); editStudent('${student.uid}');" class="w-full text-left px-4 py-3.5 text-xs font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 transition active:bg-gray-100">
                                    <div class="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                                        <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                                    </div>
                                    তথ্য এডিট করুন
                                </button>
                                <button onclick="event.stopPropagation(); toggleStudentDetailsMenu('${student.uid}'); deleteStudent('${student.uid}');" class="w-full text-left px-4 py-3.5 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 transition active:bg-red-100">
                                    <div class="p-1.5 bg-red-50 text-red-500 rounded-lg">
                                        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                                    </div>
                                    শিক্ষার্থী মুছুন
                                </button>
                            </div>
                        </div>

                        <button type="button" onclick="event.stopPropagation(); closeStudentDetailPanel()" class="p-2 hover:bg-white/20 rounded-full transition-colors" title="বন্ধ করুন">
                            <i data-lucide="chevron-right" class="w-5 h-5 text-white"></i>
                        </button>
                    </div>
                </div>

                <!-- Content -->
                <div class="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-white" style="pointer-events: auto;">
                    <!-- Quick Actions -->
                    <div class="grid grid-cols-2 gap-3">
                         <a href="tel:${getFormattedNumber(student.mobile, 'tel')}" class="flex items-center justify-center gap-2 p-3 bg-green-50 text-green-700 rounded-xl border border-green-200 font-semibold hover:bg-green-100 transition">
                            <i data-lucide="phone" class="w-4 h-4"></i> কল করুন
                        </a>
                         <a href="https://wa.me/${getFormattedNumber(student.mobile, 'wa')}" target="_blank" class="flex items-center justify-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 font-semibold hover:bg-emerald-100 transition">
                            <i data-lucide="message-circle" class="w-4 h-4"></i> হোয়াটসঅ্যাপ
                        </a>
                    </div>

                    <!-- Basic Info -->
                    <div>
                        <h4 class="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">সাধারণ তথ্য</h4>
                        <div class="grid grid-cols-1 gap-3">
                            <div class="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                                <div class="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500"><i data-lucide="hash" class="w-5 h-5"></i></div>
                                <div>
                                    <p class="text-[11px] text-gray-400 font-black uppercase tracking-wider mb-0.5">স্টুডেন্ট আইডি</p>
                                    <p class="text-lg font-bold text-gray-900">${student.id || '-'}</p>
                                </div>
                            </div>
                             <div class="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                                <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><i data-lucide="smartphone" class="w-5 h-5"></i></div>
                                <div>
                                    <p class="text-[11px] text-gray-400 font-black uppercase tracking-wider mb-0.5">মোবাইল নম্বর</p>
                                    <p class="text-lg font-bold text-gray-900">+88${student.mobile || '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Parents Info -->
                    ${(student.fathersName || student.mothersName) ? `
                    <div>
                        <h4 class="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">অভিভাবক তথ্য</h4>
                        <div class="space-y-3">
                             ${student.fathersName ? `
                            <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <span class="text-[11px] text-gray-400 font-black uppercase tracking-widest block mb-1">পিতার নাম</span>
                                <span class="text-base font-bold text-gray-800">${student.fathersName}</span>
                            </div>` : ''}
                            ${student.mothersName ? `
                            <div class="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <span class="text-[11px] text-gray-400 font-black uppercase tracking-widest block mb-1">মাতার নাম</span>
                                <span class="text-base font-bold text-gray-800">${student.mothersName}</span>
                            </div>` : ''}
                        </div>
                    </div>` : ''}

                    <!-- Other Details -->
                    ${customHtml ? `
                    <div>
                        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">অন্যান্য তথ্য</h4>
                        <div class="space-y-2">
                            ${customHtml}
                        </div>
                    </div>` : ''}

                    <!-- Status Management & Pro-rating Logic -->
                    <div class="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100 space-y-4">
                        <div class="flex items-center justify-between">
                            <h4 class="text-xs font-bold text-indigo-900 uppercase tracking-wider">স্ট্যাটাস ও প্রো-রেটিং লজিক</h4>
                            <div class="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border shadow-sm">
                                <span class="text-[10px] font-bold text-gray-500 uppercase">লিমিট:</span>
                                <input type="number" value="${student.proRateThreshold || 10}" 
                                    onchange="updateProRateThreshold('${student.uid}', this.value)"
                                    class="w-8 text-center text-xs font-black text-indigo-600 bg-transparent outline-none">
                                <span class="text-[10px] font-bold text-gray-400">দিন</span>
                            </div>
                        </div>
                        
                        <p class="text-[10px] text-indigo-600 leading-relaxed italic">
                            * স্টুডেন্ট ${student.proRateThreshold || 10} তারিখের আগে অ্যাক্টিভ হলে ১০০% এবং পরে হলে ৫০% ফি ধার্য হবে। ডিজেবল করার ক্ষেত্রেও একই নিয়ম প্রযোজ্য।
                        </p>

                        <div class="space-y-2">
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">পরিবর্তনের ইতিহাস (History)</p>
                            ${(student.statusHistory || []).slice().reverse().map((h, i, arr) => {
                const rawIdx = arr.length - 1 - i;
                const date = new Date(isNaN(h.date) ? h.date : parseFloat(h.date));
                const dateStr = date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' });
                return `
                                <div class="flex items-center justify-between p-3 bg-white rounded-xl border border-indigo-50 shadow-sm group">
                                    <div class="flex items-center gap-3">
                                        <div class="w-2.5 h-2.5 rounded-full ${h.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}"></div>
                                        <div>
                                            <p class="text-sm font-black text-gray-800 uppercase">${h.status === 'active' ? 'অ্যাক্টিভেট' : 'ডিজেবল'}</p>
                                            <p class="text-xs text-gray-400 font-bold">${dateStr}</p>
                                        </div>
                                    </div>
                                    <button onclick="editStatusHistoryDate('${student.uid}', ${rawIdx})" class="p-1.5 hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                        <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
                                    </button>
                                </div>`;
            }).join('')}
                        </div>
                    </div>

                    <!-- Notes -->
                    ${student.notes ? `
                    <div>
                        <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">নোট / মন্তব্য</h4>
                        <div class="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-100 text-sm italic leading-relaxed">
                            "${student.notes}"
                        </div>
                    </div>` : ''}
                    
                    <!-- History -->
                     <details class="border-t pt-2 group">
                        <summary class="flex justify-between items-center cursor-pointer list-none text-xs font-bold text-gray-400 uppercase tracking-wider py-2 hover:text-indigo-600 transition">
                            <span>লেনদেন ইতিহাস (History)</span>
                            <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-open:rotate-180"></i>
                        </summary>
                         <div class="max-h-[250px] overflow-y-auto space-y-2 no-scrollbar mt-2">
                            ${renderStudentTransactionHistory(student.uid)}
                        </div>
                    </details>
                </div>

            `;

            if (desktopContent && placeholder) {
                placeholder.classList.add('hidden');
                desktopContent.classList.remove('hidden');
                desktopContent.className = "flex-1 flex flex-col bg-white rounded-[32px] overflow-hidden";
                desktopContent.innerHTML = contentHtml;
                lucide.createIcons();
            }

            // Close main sidebar if open (mobile fix)
            const sidebar = document.getElementById('sidebar');
            if (sidebar && !sidebar.classList.contains('sidebar-closed')) {
                toggleSidebar();
            }

            // Animation sequence
            setTimeout(() => {
                if (panelContainer) {
                    panelContainer.style.transform = 'translateX(0)';
                    panelContainer.classList.remove('pointer-events-none');
                    panelContainer.classList.add('pointer-events-auto');
                }
                if (backdrop) backdrop.style.opacity = '1';
                const backdropClick = document.getElementById('student-backdrop-click');
                if (backdropClick) backdropClick.style.opacity = '1';
            }, 50);

            // Highlight Selected Card
            document.querySelectorAll('.student-card-active').forEach(card => {
                card.classList.remove('student-card-active', 'ring-2', 'ring-indigo-500', 'bg-indigo-50/50');
            });
            const selectedCard = document.querySelector(`[onclick*="toggleStudentExpand('${student.uid}')"]`);
            if (selectedCard) {
                const cardOuter = selectedCard.closest('.bg-white.rounded-2xl');
                if (cardOuter) cardOuter.classList.add('student-card-active', 'ring-2', 'ring-indigo-500', 'bg-indigo-50/50');
            }
        }

        function copyStudentInfo(uid) {
            const student = students.find(s => s.uid === uid);
            if (!student) return;
            const text = `নাম: ${student.name}\nআইডি: ${student.id}\nক্লাস: ${student.class}\nরোল: ${student.roll}\nমোবাইল: ${student.mobile}`;
            copyToClipboard(text).then(() => {
                showToast("✅ শিক্ষার্থীর তথ্য কপি করা হয়েছে");
            });
        }

        // Long Press Detection for Selection Mode
        let longPressTimer = null;
        let longPressTriggered = false;

        function startStudentLongPress(uid, event) {
            // Only allow left click (button 0) or touch
            if (event && event.type === 'mousedown' && event.button !== 0) return;

            longPressTriggered = false;

            // Clear any existing timer just in case
            if (longPressTimer) clearTimeout(longPressTimer);

            longPressTimer = setTimeout(() => {
                // Vibrate if supported
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }

                // Enable selection mode if not already
                if (!selectionMode) {
                    toggleSelectionMode();
                }

                // Select this student
                if (!selectedStudents.includes(uid)) {
                    toggleStudentSelection(uid);
                }

                longPressTriggered = true;
                showToast("নির্বাচন মোড চালু করা হয়েছে");
            }, 1000); // 1 second for better UX
        }

        function cancelStudentLongPress() {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
        }

        // Selection Mode Functions
        function toggleSelectionMode() {
            selectionMode = !selectionMode;
            selectedStudents = [];

            const headerActions = document.getElementById('header-actions');
            const selectionActions = document.getElementById('selection-actions');

            if (selectionMode) {
                headerActions.classList.add('hidden');
                selectionActions.classList.remove('hidden');
                selectionActions.classList.add('flex');
            } else {
                headerActions.classList.remove('hidden');
                selectionActions.classList.add('hidden');
                selectionActions.classList.remove('flex');
            }

            updateSelectionCount();
            renderStudents();

            // Refresh icons for the new buttons
            setTimeout(() => lucide.createIcons(), 10);
        }

        function toggleStudentSelection(uid) {
            if (selectedStudents.includes(uid)) {
                selectedStudents = selectedStudents.filter(id => id !== uid);
            } else {
                selectedStudents.push(uid);
            }
            updateSelectionCount();
            renderStudents();
        }

        function updateSelectionCount() {
            const deleteCount = document.getElementById('delete-count');
            if (deleteCount) {
                deleteCount.textContent = `মুছুন (${selectedStudents.length})`;
            }

            // Update header badge
            const badge = document.getElementById('selection-count-badge');
            if (badge) {
                badge.textContent = `${selectedStudents.length} নির্বাচিত`;
                if (selectedStudents.length > 0) {
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }
            }
        }

        async function deleteSelectedStudents() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচন করা হয়নি");
            }

            const confirmed = await customConfirm(
                `আপনি কি নিশ্চিত যে আপনি ${selectedStudents.length} জন শিক্ষার্থীকে মুছে ফেলতে চান?`,
                'শিক্ষার্থী মুছুন'
            );

            if (confirmed) {
                students = students.filter(s => !selectedStudents.includes(s.uid));
                saveData();
                showToast(`${selectedStudents.length} জন শিক্ষার্থী মুছে ফেলা হয়েছে`);
                toggleSelectionMode(); // Exit selection mode
                renderFilters();
                renderStudents();
            }
        }

        // --- Bulk Actions Implementation ---

        function selectAllVisibleStudents() {
            const visibleStudents = document.querySelectorAll('.student-card:not(.hidden)');
            const allIds = Array.from(visibleStudents).map(el => el.getAttribute('data-uid'));

            // Toggle: if all visible are selected, deselect all. Otherwise select all visible.
            const allSelected = allIds.every(uid => selectedStudents.includes(uid));

            if (allSelected) {
                // Deselect only visible ones (keep others? No, usually deselect all)
                // Let's just clear all for simplicity or toggle visible.
                // User expects "Select All" behavior relative to view.
                allIds.forEach(uid => {
                    if (selectedStudents.includes(uid)) toggleStudentSelection(uid);
                });
            } else {
                allIds.forEach(uid => {
                    if (!selectedStudents.includes(uid)) toggleStudentSelection(uid);
                });
            }
        }

        function printSelectedStudents() {
            if (selectedStudents.length === 0) return showToast("কোনো শিক্ষার্থী নির্বাচিত নেই");

            // Use existing report generation but restricted to selected
            openReportModal('LIST', true); // true = fromSelection
        }

        // --- Transaction History & Collector Logic ---

        let currentCollector = JSON.parse(localStorage.getItem('cc_current_collector')) || { name: 'Admin', id: '1', mobile: '', role: 'admin' };
        let pendingVerificationCode = localStorage.getItem('cc_pending_verify_code') || null;

        function openTransactionHistoryModal() {
            closeSidebar();
            const drawer = document.getElementById('transaction-history-drawer');
            const panel = document.getElementById('transaction-panel-container');
            const backdrop = document.getElementById('transaction-backdrop');

            if (!drawer || !panel) return;

            drawer.classList.remove('hidden');

            // Animation sequence
            setTimeout(() => {
                // Reset Menu State
                const menu = document.getElementById('transaction-header-menu');
                if (menu) {
                    menu.classList.add('hidden', 'scale-95', 'opacity-0');
                }

                // Modal Animation Open
                panel.classList.remove('scale-95', 'opacity-0');
                panel.classList.add('scale-100', 'opacity-100');

                if (backdrop) backdrop.classList.remove('opacity-0', 'pointer-events-none');
                if (backdrop) backdrop.classList.add('opacity-100');
            }, 50);

            const isAdmin = currentCollector.role === 'admin';

            // Reset Search Input
            const searchInput = document.getElementById('history-search-input');
            if (searchInput) searchInput.value = '';

            // 1. Calculate Global Total Due
            let totalDue = 0;
            students.forEach(s => {
                const fin = calculateStudentFinancials(s);
                totalDue += (fin.balance || 0);
            });
            document.getElementById('hist-total-due').textContent = '৳' + totalDue;

            // 2. Calculate Stats
            let globalTotalCollected = 0;
            let globalTodayCollected = 0;
            const today = new Date().toLocaleDateString('en-CA');

            // Stats for lists (filtered by role)
            let filteredTotalCollected = 0;
            let filteredTodayCollected = 0;

            // Group by Collector (Always global for the breakdown table to show all users)
            const collectorStats = {};

            feePayments.forEach(p => {
                if (p.deleted) return; // FIX: Skip deleted transactions

                const amount = parseFloat(p.amount) || 0;
                const pDate = new Date(p.date).toLocaleDateString('en-CA');
                const isToday = pDate === today;

                globalTotalCollected += amount;
                if (isToday) globalTodayCollected += amount;

                // Role Visibility filtering for statistics and lists
                const isVisible = isAdmin || p.collectorId === currentCollector.id;

                if (isVisible) {
                    filteredTotalCollected += amount;
                    if (isToday) filteredTodayCollected += amount;
                }

                // Breakdown Table always shows all if Admin, or just self + others as anonymous? 
                // Let's stick to showing all collectors in the breakdown if they are authorized to see this modal.
                const cId = p.collectorId || '1';
                const cName = p.collectorName || 'Admin';
                const cMob = p.collectorMobile || '';

                if (!collectorStats[cId]) {
                    collectorStats[cId] = { name: cName, id: cId, mobile: cMob, count: 0, amount: 0 };
                }
                collectorStats[cId].count++;
                collectorStats[cId].amount += amount;
            });

            // Updating KPI Cards with Global Stats for consistency
            document.getElementById('hist-total-collected').textContent = '৳' + globalTotalCollected;
            document.getElementById('hist-today-collected').textContent = '৳' + globalTodayCollected;

            // Filter payments for the Recent Transactions list
            const visiblePayments = isAdmin ? feePayments : feePayments.filter(p => p.collectorId === currentCollector.id);
            cachedHistoryPayments = visiblePayments; // Cache for search

            // 3. Render Breakdown
            const breakdownTbody = document.getElementById('collector-breakdown-list');
            if (breakdownTbody) {
                breakdownTbody.innerHTML = Object.values(collectorStats).map(c => `
                    <tr class="hover:bg-gray-50 border-b last:border-0 border-gray-100">
                        <td class="p-3 font-medium text-gray-700">
                            ${c.name}
                            ${c.mobile ? `<div class="text-[10px] text-gray-400">${c.mobile}</div>` : ''}
                        </td>
                        <td class="p-3 text-center text-gray-500 font-mono text-xs">${c.id}</td>
                        <td class="p-3 text-center text-gray-600">${c.count}</td>
                        <td class="p-3 text-right font-bold text-gray-800">৳${c.amount}</td>
                    </tr>
                `).join('');
            }

            // 4. Render Initial List
            renderTransactionList(visiblePayments.slice(0, 50));

            // Inject Export/Import Buttons if not present
            ensureSyncButtons(isAdmin);

            setTimeout(() => lucide.createIcons(), 50);
        }

        function closeTransactionHistoryPanel() {
            const drawer = document.getElementById('transaction-history-drawer');
            const panel = document.getElementById('transaction-panel-container');
            const backdrop = document.getElementById('transaction-backdrop');

            if (panel) {
                panel.classList.remove('scale-100', 'opacity-100');
                panel.classList.add('scale-95', 'opacity-0');
            }
            if (backdrop) {
                backdrop.classList.remove('opacity-100');
                backdrop.classList.add('opacity-0');
            }

            setTimeout(() => {
                if (drawer) drawer.classList.add('hidden');
            }, 500);
        }

        function toggleTransactionMenu(e) {
            if (e) e.stopPropagation();
            const menu = document.getElementById('transaction-header-menu');
            if (!menu) return;

            const isHidden = menu.classList.contains('hidden');
            if (isHidden) {
                // Open
                menu.classList.remove('hidden');
                menu.classList.add('scale-95', 'opacity-0');

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        menu.classList.remove('scale-95', 'opacity-0');
                        menu.classList.add('scale-100', 'opacity-100');
                    });
                });

                // Close menu when clicking outside
                const closeMenu = (ev) => {
                    if (!ev.target.closest('#transaction-header-menu') && !ev.target.closest('#hist-menu-trigger')) {
                        menu.classList.add('scale-95', 'opacity-0');
                        menu.classList.remove('scale-100', 'opacity-100');
                        setTimeout(() => menu.classList.add('hidden'), 200);
                        document.removeEventListener('click', closeMenu);
                    }
                };
                setTimeout(() => document.addEventListener('click', closeMenu), 0);
            } else {
                // Close
                menu.classList.add('scale-95', 'opacity-0');
                menu.classList.remove('scale-100', 'opacity-100');
                setTimeout(() => menu.classList.add('hidden'), 200);
            }
        }

        function ensureSyncButtons(isAdmin) {
            const actionsContainer = document.querySelector('#transaction-history-drawer .sync-actions');
            if (!actionsContainer) return;

            // Always refresh buttons based on Role
            let buttonsHtml = `
                    <button onclick="exportTeacherData()" class="w-full text-left px-4 py-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 transition-colors">
                        <div class="p-1.5 bg-gray-100 text-gray-600 rounded-lg">
                            <i data-lucide="upload" class="w-4 h-4"></i>
                        </div>
                        এক্সপোর্ট (Export)
                    </button>
                    <button onclick="verifyTeacherSubmission()" class="w-full text-left px-4 py-3 text-xs font-semibold text-teal-600 hover:bg-teal-50 flex items-center gap-3 transition-colors">
                        <div class="p-1.5 bg-teal-100 text-teal-700 rounded-lg">
                            <i data-lucide="shield-check" class="w-4 h-4"></i>
                        </div>
                        ভেরিফাই (Verify)
                    </button>
            `;

            if (isAdmin) {
                buttonsHtml = `
                    <button onclick="exportTeacherData()" class="w-full text-left px-4 py-3 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 transition-colors">
                        <div class="p-1.5 bg-gray-100 text-gray-600 rounded-lg">
                            <i data-lucide="upload" class="w-4 h-4"></i>
                        </div>
                        এক্সপোর্ট (Export)
                    </button>
                    <button onclick="importTeacherData()" class="w-full text-left px-4 py-3 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 flex items-center gap-3 border-b border-gray-50 transition-colors">
                        <div class="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">
                            <i data-lucide="download" class="w-4 h-4"></i>
                        </div>
                        ইমপোর্ট (Import)
                    </button>
                    <button onclick="verifyTeacherSubmission()" class="w-full text-left px-4 py-3 text-xs font-semibold text-teal-600 hover:bg-teal-50 flex items-center gap-3 transition-colors">
                        <div class="p-1.5 bg-teal-100 text-teal-700 rounded-lg">
                            <i data-lucide="shield-check" class="w-4 h-4"></i>
                        </div>
                        ভেরিফাই (Verify)
                    </button>
                `;
            }

            actionsContainer.innerHTML = buttonsHtml;
        }

        // --- NEW: Search & Print Logic ---
        function filterTransactionHistory() {
            const query = document.getElementById('history-search-input').value.toLowerCase().trim();

            if (!query) {
                renderTransactionList(cachedHistoryPayments.slice(0, 50));
                return;
            }

            const filtered = cachedHistoryPayments.filter(p => {
                const s = students.find(stu => stu.uid === p.uid);
                const sName = (s ? s.name : p.studentName || '').toLowerCase();
                const sId = (s ? s.id : '').toString().toLowerCase();
                const trxId = (p.id || '').toString().toLowerCase();

                return sName.includes(query) || sId.includes(query) || trxId.includes(query);
            });

            renderTransactionList(filtered);
            lucide.createIcons();
        }

        function renderTransactionList(list) {
            const historyTbody = document.getElementById('transaction-history-list');
            if (!historyTbody) return;

            historyTbody.innerHTML = list.length ? list.sort((a, b) => new Date(b.date) - new Date(a.date)).map(p => {
                const student = students.find(s => s.uid === p.uid) || { name: p.studentName || 'Unknown', class: p.studentClass || '-' };
                const dateStr = new Date(p.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' });
                const timeStr = new Date(p.date).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
                const syncedIcon = p.isSynced ? '<i data-lucide="check-check" class="w-4 h-4 text-blue-500" title="Synced"></i>' : '';

                const isDeleted = p.deleted;
                const opacity = isDeleted ? 'opacity-60' : '';
                const bg = isDeleted ? 'bg-red-50' : 'bg-white';
                const border = isDeleted ? 'border-red-100' : 'border-gray-100';

                // Fee allocation details string
                let detailsHtml = '';
                if (p.details && p.details.allocated) {
                    detailsHtml = p.details.allocated.map(a =>
                        `<span class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mr-2 mb-2 shadow-sm font-medium border border-gray-200">${a.feeName}</span>`
                    ).join('');
                }

                return `
                <div class="group relative ${bg} rounded-xl border ${border} shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${opacity}">
                    
                    <div class="p-4 flex items-center gap-4 cursor-pointer select-none" onclick="this.nextElementSibling.classList.toggle('max-h-0'); this.nextElementSibling.classList.toggle('max-h-96'); this.nextElementSibling.classList.toggle('p-5'); this.nextElementSibling.classList.toggle('border-t'); this.querySelector('.chevron-icon').classList.toggle('rotate-180');">
                        
                        <!-- Icon -->
                        <div class="w-14 h-14 rounded-full ${isDeleted ? 'bg-red-100 text-red-500' : 'bg-teal-50 text-teal-600'} flex items-center justify-center shrink-0 shadow-sm border border-white">
                           ${student.photo ? `<img src="${student.photo}" class="w-full h-full object-cover rounded-full" onerror="this.style.display='none'">` : (isDeleted ? `<i data-lucide="trash-2" class="w-7 h-7"></i>` : `<span class="text-xl font-bold">${String(student.name || '?').charAt(0).toUpperCase()}</span>`)}
                        </div>

                        <!-- Content -->
                        <div class="flex-1 min-w-0">
                            <h4 class="font-bold text-gray-800 text-lg truncate leading-tight ${isDeleted ? 'line-through text-gray-500' : ''}">${student.name}</h4>
                            <div class="flex items-center gap-2 text-xs text-gray-500 mt-1 font-medium">
                                <span class="bg-gray-100 px-2 py-0.5 rounded text-gray-600 border border-gray-200">${student.class}</span>
                                <span>• ${dateStr} • ${timeStr}</span>
                            </div>
                            <div class="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                                <i data-lucide="user" class="w-3 h-3"></i> ${p.collectorName || 'Admin'} ${syncedIcon}
                                <span class="text-gray-300 mx-1">|</span> Receipt #${p.id}
                            </div>
                        </div>

                        <!-- Amount & Chevron -->
                        <div class="text-right flex flex-col items-end gap-1">
                            <div class="font-black text-xl ${isDeleted ? 'text-gray-400 line-through' : 'text-indigo-600'}">৳${p.amount}</div>
                            ${isDeleted ?
                        `<div class="text-[10px] text-red-500 font-bold bg-red-100 px-1.5 py-0.5 rounded">DELETED</div>` :
                        `<i data-lucide="chevron-down" class="w-5 h-5 text-gray-300 chevron-icon transition-transform duration-300"></i>`
                    }
                        </div>
                    </div>

                    <!-- Expanded Details (Hidden by default) -->
                    <div class="max-h-0 overflow-hidden transition-all duration-300 bg-gray-50/50">
                        <div class="flex flex-col gap-3">
                            <div>
                                <p class="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-2">Fee Allocation</p>
                                <div class="flex flex-wrap">
                                    ${detailsHtml || '<span class="text-gray-400 italic text-xs">No specific details recorded</span>'}
                                </div>
                            </div>
                            
                            <div class="flex justify-end gap-3 pt-3 border-t border-gray-200 border-dashed">
                                <button onclick="printStudentLedger('${p.uid}')" class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm font-bold shadow-sm">
                                    <i data-lucide="file-text" class="w-4 h-4"></i> লেজার
                                </button>
                                <button onclick="reprintReceipt('${p.id}')" class="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-100 transition text-sm font-bold">
                                    <i data-lucide="printer" class="w-4 h-4"></i> রশিদ প্রিন্ট
                                </button>
                                ${!isDeleted ? `
                                <button onclick="revertPayment('${p.id}')" class="flex items-center gap-2 px-4 py-2 bg-white border border-red-100 text-red-500 rounded-lg hover:bg-red-50 hover:border-red-200 transition text-sm font-bold">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i> ডিলিট
                                </button>` : ''}
                            </div>
                        </div>
                    </div>

                </div>
                `;
            }).join('') : `<div class="p-12 text-center text-gray-400 text-sm">কোনো লেনদেন পাওয়া যায়নি</div>`;
        }

        // Print Ledger Logic: Preview -> Print
        let currentLedgerHTML = '';
        let currentLedgerStudent = null;

        function printStudentLedger(uid) {
            const student = students.find(s => s.uid == uid);
            if (!student) return showToast("শিক্ষার্থী খুঁজে পাওয়া যায়নি");

            // 1. Generate HTML
            currentLedgerHTML = generateStudentLedgerHTML(student);
            currentLedgerStudent = student;

            // 2. Inject into Preview Modal
            const previewContent = document.getElementById('ledger-preview-content');

            // Note: We inject the <style> here so it renders in the "Preview" div
            previewContent.innerHTML = `
                <style>
                    #ledger-preview-content { font-family: 'SolaimanLipi', 'Segoe UI', sans-serif; color: #000; background: #fff; line-height: 1.5; }
                    .header-section { margin-bottom: 10px; padding-bottom: 5px; }
                    .student-info { margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; background: #fff; padding: 10px 0; border-radius: 0; border: none; }
                    .info-group { margin-bottom: 6px; }
                    .info-group:last-child { margin-bottom: 0; }
                    .label { font-weight: 700; color: #000; width: 90px; display: inline-block; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
                    th { bg-gray-100 font-black uppercase text-gray-900 p-3 border border-gray-900 text-left; }
                    /* Preview-specific table overrides because Tailwind reset might interfere */
                    #ledger-preview-content table { border-collapse: collapse; width: 100%; margin-top: 20px; font-size: 13px; }
                    #ledger-preview-content th { background-color: #f3f4f6; font-weight: 900; text-transform: uppercase; color: #000; padding: 12px; border: 1px solid #000; text-align: left; }
                    #ledger-preview-content td { padding: 10px 12px; border: 1px solid #000; color: #000; font-weight: 500; }
                    #ledger-preview-content .amount { text-align: right; font-weight: 700; font-family: monospace; font-size: 14px; }
                    .summary { margin-top: 30px; display: flex; justify-content: flex-end; }
                    .summary-box { border: 2px solid #000; padding: 20px; width: 300px; background: #fff; border-radius: 0; }
                    .summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; color: #000; }
                    .summary-row.total { border-top: 1px dashed #000; padding-top: 10px; margin-top: 10px; font-weight: 900; font-size: 16px; }
                    .footer { margin-top: 60px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 12px; color: #000; }
                    .signature-line { border-top: 1px solid #000; width: 200px; padding-top: 8px; text-align: center; font-weight: 600; }
                </style>
                ${currentLedgerHTML}
            `;

            // 3. Show Modal
            const modal = document.getElementById('ledger-preview-modal');
            modal.classList.remove('hidden');
            lucide.createIcons();
        }

        function printLedgerFromPreview() {
            if (!currentLedgerHTML || !currentLedgerStudent) return;

            // Open new window for actual printing (standard browser behavior)
            const printWindow = window.open('', '', 'width=900,height=900');
            printWindow.document.write(`
                <html>
                <head>
                    <title>Statement - ${currentLedgerStudent.name}</title>
                    <link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">
                    <style>
                        body { font-family: 'SolaimanLipi', 'Segoe UI', sans-serif; padding: 40px; color: #000; background: #fff; margin: 0; line-height: 1.5; }
                        .header-section { margin-bottom: 10px; padding-bottom: 5px; }
                        .student-info { margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; background: #fff; padding: 10px 0; border-radius: 0; border: none; }
                        .info-group { margin-bottom: 6px; }
                        .info-group:last-child { margin-bottom: 0; }
                        .label { font-weight: 700; color: #000; width: 90px; display: inline-block; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
                        th { background-color: #f3f4f6; font-weight: 900; text-transform: uppercase; color: #000; padding: 12px; border: 1px solid #000; text-align: left; }
                        td { padding: 10px 12px; border: 1px solid #000; color: #000; font-weight: 500; }
                        tr:nth-child(even) { background-color: #fff; }
                        .amount { text-align: right; font-weight: 700; font-family: monospace; font-size: 14px; }
                        .summary { margin-top: 30px; display: flex; justify-content: flex-end; }
                        .summary-box { border: 2px solid #000; padding: 20px; width: 300px; background: #fff; border-radius: 0; }
                        .summary-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; color: #000; }
                        .summary-row.total { border-top: 1px dashed #000; padding-top: 10px; margin-top: 10px; font-weight: 900; font-size: 16px; }
                        .footer { margin-top: 60px; display: flex; justify-content: space-between; align-items: flex-end; font-size: 12px; color: #000; }
                        .signature-line { border-top: 1px solid #000; width: 200px; padding-top: 8px; text-align: center; font-weight: 600; }
                        
                        @media print {
                            body { padding: 20px; -webkit-print-color-adjust: exact; color: #000 !important; }
                            th, td, .student-info, .summary-box { border-color: #000 !important; color: #000 !important; }
                            .label { color: #000 !important; }
                            .no-print { display: none !important; }
                            @page { margin: 10mm; }
                        }
                    </style>
                </head>
                <body>
                    <!-- Sticky Header for Close/Print in New Window (Optional, but user asked for "Print Browser") 
                         Since we are already in "Print Browser" mode here, we can just trigger print() or let them do Ctrl+P.
                         But keeping the manual buttons is nice for consistency. -->
                    <div class="no-print" style="position: sticky; top: 0; left: 0; right: 0; background: #fff; padding: 10px; border-bottom: 1px solid #ddd; display: flex; gap: 10px; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); z-index: 1000;">
                        <button onclick="window.print()" style="padding: 8px 20px; background: #4f46e5; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 5px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                            প্রিন্ট (Print)
                        </button>
                        <button onclick="window.close()" style="padding: 8px 20px; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 5px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            বন্ধ করুন (Close)
                        </button>
                    </div>

                    ${currentLedgerHTML}
                </body>
                </html>
            `);
            printWindow.document.close();
            // Automatically trigger print dialog if desired by "print browser"? 
            // The step title says "preview in software window then print and print browser".
            // So opening the window with a print button (that triggers browser print) is correct.
        }

        function generateStudentLedgerHTML(student) {
            // Exclude deleted payments explicitly
            const studentPayments = feePayments.filter(p => p.uid == student.uid && !p.deleted).sort((a, b) => new Date(a.date) - new Date(b.date));
            if (studentPayments.length === 0) return "<div class='p-8 text-center'>এই শিক্ষার্থীর কোনো লেনদেন নেই</div>";

            const totalPaid = studentPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
            const financials = calculateStudentFinancials(student);
            const dateStr = new Date().toLocaleDateString('bn-BD');

            // Photo Logic
            const photoUrl = student.photo || null;
            const photoHtml = photoUrl
                ? `<img src="${photoUrl}" style="width: 90px; height: 90px; object-fit: cover; border-radius: 4px; border: 1px solid #000; display: block;" crossorigin="anonymous">`
                : `<div style="width: 90px; height: 90px; border-radius: 4px; background: #fff; border: 1px solid #000; display: flex; align-items: center; justify-content: center; color: #000; font-weight: 700; font-size: 32px;">
                     ${(student.name || '?').charAt(0).toUpperCase()}
                   </div>`;

            return `
                    <div class="header-section">
                        ${getInstituteHeader('লেনদেন বিবরণী (Statement of Account)', false)}
                    </div>
                    
                    <div class="student-info">
                        <div style="flex: 1;">
                            <div class="info-group"><span class="label">নাম:</span> <strong style="font-size: 16px; color: #000;">${student.name}</strong></div>
                            <div class="info-group"><span class="label">আইডি:</span> ${student.id || 'N/A'}</div>
                            <div class="info-group"><span class="label">শ্রেণি:</span> ${student.class} ${student.section ? `(${student.section})` : ''}</div>
                        </div>
                        <div style="display: flex; gap: 20px; align-items: flex-start;">
                            <div style="text-align: right;">
                                <div class="info-group"><span class="label">রোল:</span> ${student.roll || '--'}</div>
                                <div class="info-group"><span class="label">মোবাইল:</span> ${student.mobile || 'N/A'}</div>
                                <div class="info-group"><span class="label">ইস্যু তারিখ:</span> ${dateStr}</div>
                            </div>
                            ${photoHtml}
                        </div>
                    </div>

                    <div style="margin-bottom: 30px;">
                        <h3 style="font-size: 14px; font-weight: 700; margin-bottom: 10px; border-bottom: 1px solid #000; padding-bottom: 5px; color: #000;">ফি বকেয়া ও জমার সারসংক্ষেপ (Fee Summary)</h3>
                        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                            <thead>
                                <tr style="background-color: #f3f4f6;">
                                    <th style="border: 1px solid #000; padding: 8px; color: #000;">ফি খাত (Fee Type)</th>
                                    <th style="border: 1px solid #000; padding: 8px; text-align: right; color: #000;">নির্ধারিত (Payable)</th>
                                    <th style="border: 1px solid #000; padding: 8px; text-align: right; color: #000;">পরিশোধিত (Paid)</th>
                                    <th style="border: 1px solid #000; padding: 8px; text-align: right; color: #000;">বকেয়া (Due)</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${financials.details.map(f => {
                const grossTotal = f.total || 0;
                const waiver = f.waiver || 0;
                const netPayable = Math.max(0, grossTotal - waiver);
                const totalPaidWithWaiver = f.paid || 0;
                const cashPaid = Math.max(0, totalPaidWithWaiver - waiver);

                return `
                                <tr>
                                    <td style="border: 1px solid #000; padding: 8px; font-weight: 600; color: #000;">${f.name}</td>
                                    <td style="border: 1px solid #000; padding: 8px; text-align: right; color: #000;">${netPayable.toLocaleString()}</td>
                                    <td style="border: 1px solid #000; padding: 8px; text-align: right; color: #000;">${cashPaid.toLocaleString()}</td>
                                    <td style="border: 1px solid #000; padding: 8px; text-align: right; font-weight: 700; color: #000;">
                                        ${(f.balance || 0).toLocaleString()}
                                    </td>
                                </tr>`;
            }).join('')}
                            </tbody>
                        </table>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th style="width: 15%;">তারিখ</th>
                                <th style="width: 15%;">রশিদ নং</th>
                                <th>বিবরণ (Particulars)</th>
                                <th class="amount" style="width: 15%;">জমা (৳)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${studentPayments.map(p => {
                const pDate = new Date(p.date).toLocaleDateString('en-GB');
                let details = '';
                if (p.details && p.details.allocated) {
                    details = p.details.allocated.map(d => `<span>${d.feeName}</span>`).join(', ');
                } else if (Array.isArray(p.details)) {
                    details = p.details.map(d => d.name || d).join(', ');
                } else {
                    details = "Tuition/Monthly Fees";
                }
                return `
                                <tr>
                                    <td style="color: #4b5563;">${pDate}</td>
                                    <td style="font-family: monospace; font-weight: 600; color: #6366f1;">#${p.id}</td>
                                    <td>${details}</td>
                                    <td class="amount">${p.amount}</td>
                                </tr>`;
            }).join('')}
                        </tbody>
                    </table>

                    <div class="summary">
                        <div class="summary-box">
                            <div class="summary-row">
                                <span style="color: #6b7280;">পরিশোধিত (Total Paid):</span>
                                <strong>৳${totalPaid.toLocaleString()}</strong>
                            </div>
                            <div class="summary-row">
                                <span style="color: #6b7280;">মোট বকেয়া (Total Due):</span>
                                <strong style="color: #ef4444;">৳${financials.balance.toLocaleString()}</strong>
                            </div>
                            <div class="summary-row total">
                                <span>সর্বমোট (Total):</span>
                                <span>৳${(totalPaid + financials.balance).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div class="footer">
                        <div class="signature-line">অভিভাবকের স্বাক্ষর</div>
                        <div class="signature-line">কর্তৃপক্ষের স্বাক্ষর</div>
                    </div>`;
        }

        // --- EXPORT Logic ---
        function exportTeacherData() {
            // Filter un-synced payments for current collector
            const myPayments = feePayments.filter(p => !p.isSynced && p.collectorId === currentCollector.id);

            if (myPayments.length === 0) return showToast("কোনো নতুন ডাটা নেই (No new data to export)");

            const totalAmount = myPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
            const count = myPayments.length;

            // Generate Verification Code Logic: Hash of (Count + Total + LastID)
            // Simple hash for user friendliness: "FirstCharName + Count + Total" (Not secure, but functional)
            const code = `${currentCollector.name.charAt(0).toUpperCase()}${count} -${totalAmount} `;

            // Setup Export Data
            const exportData = {
                source: 'ClassConnect_Teacher_Export',
                version: '1.0',
                meta: {
                    collector: currentCollector,
                    generatedAt: new Date().toISOString(),
                    code: code,
                    summary: { count, totalAmount }
                },
                payments: myPayments
            };

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `Data_${currentCollector.name}_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();

            // Save Pending Code locally
            pendingVerificationCode = code;
            localStorage.setItem('cc_pending_verify_code', code);

            alert(`ডাটা এক্সপোর্ট হয়েছে!\n\nভেরিফিকেশন কোড: ${code} \n\nআপনার ডাটা এডমিনের কাছে জমা দিন এবং এই কোডটি দিয়ে কনফার্ম করুন।`);
        }

        // --- IMPORT Logic ---
        function importTeacherData() {
            if (currentCollector.role !== 'admin') return showToast("শুধুমাত্র এডমিন ইম্পোর্ট করতে পারবে");

            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';

            input.onchange = e => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = event => {
                    try {
                        const imported = JSON.parse(event.target.result);
                        if (imported.source !== 'ClassConnect_Teacher_Export') throw new Error("Invalid Format");

                        processImportedPayments(imported);
                    } catch (err) {
                        alert("Error: " + err.message);
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        }

        function processImportedPayments(data) {
            const newPayments = data.payments;
            let addedCount = 0;
            let skippedCount = 0;

            // Merge Logic
            newPayments.forEach(p => {
                // Check duplicate by 'date' + 'uid' + 'amount' (Complex ID check might fail if IDs differ)
                // Better: trust the generated ID if standard is maintained, OR use composite key
                // Or simply append and generate new IDs to avoid collision? 
                // Best: Append with NEW IDs to ensure no conflicts

                // We'll regenerate IDs for imported data to ensure no conflicts
                // But we must check if this exact payment already exists to avoid double-entry
                const exists = feePayments.some(existing =>
                    existing.uid === p.uid &&
                    existing.date === p.date &&
                    existing.amount == p.amount &&
                    existing.collectorId === p.collectorId
                );

                if (!exists) {
                    // Find max ID
                    let lastId = feePayments.reduce((max, pp) => Math.max(max, parseInt(pp.id) || 0), 0);

                    p.id = (lastId + 1).toString(); // New Local ID
                    p.isSynced = true; // Mark as synced on Admin side
                    feePayments.push(p);
                    addedCount++;
                } else {
                    skippedCount++;
                }
            });

            if (addedCount > 0) {
                ShadowStorage.save(STORAGE_KEYS.feePayments, feePayments);
                openTransactionHistoryModal(); // Refresh UI

                // Show Verification Code to Admin
                const code = data.meta.code;
                alert(`সফলভাবে ইম্পোর্ট হয়েছে!\n\nযুক্ত করা হয়েছে: ${addedCount} টি\nবাদ দেয়া হয়েছে: ${skippedCount} টি\n\nজেনারেটেড কোড: ${code} \n(এই কোডটি টিচারকে দিন ভেরিফাই করার জন্য)`);
            } else {
                alert("কোনো নতুন ডাটা নেই (Duplicate Data Found)");
            }
        }

        // --- VERIFY Logic ---
        function verifyTeacherSubmission() {
            if (!pendingVerificationCode) return showToast("কোনো পেন্ডিং এক্সপোর্ট নেই (No pending export)");

            customPrompt("এডমিনের দেয়া ভেরিফিকেশন কোডটি লিখুন:", "", "ভেরিফিকেশন").then(code => {
                if (!code) return;

                if (code.trim() === pendingVerificationCode) {
                    // Mark pending payments as Synced
                    let count = 0;
                    feePayments.forEach(p => {
                        if (!p.isSynced && p.collectorId === currentCollector.id) {
                            p.isSynced = true;
                            count++;
                        }
                    });
                    ShadowStorage.save(STORAGE_KEYS.feePayments, feePayments);

                    // Clear pending code
                    pendingVerificationCode = null;
                    localStorage.removeItem('cc_pending_verify_code');

                    openTransactionHistoryModal(); // Refresh
                    showToast(`সফল! ${count} টি লেনদেন ভেরিফাইড হয়েছে।`);

                } else {
                    showToast("কোড সঠিক নয় (Invalid Code)");
                }
            });
        }

        function openCollectorProfileModal() {
            document.getElementById('coll-name-input').value = currentCollector.name;
            document.getElementById('coll-id-input').value = currentCollector.id;
            document.getElementById('coll-mobile-input').value = currentCollector.mobile || '';

            // Update Role Badge
            const badge = document.getElementById('profile-role-badge');
            if (badge) {
                if (currentCollector.role === 'admin') {
                    badge.textContent = 'ADMIN';
                    badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-700';
                } else {
                    badge.textContent = 'TEACHER / COLLECTOR';
                    badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700';
                }
            }

            document.getElementById('collector-profile-modal').classList.remove('hidden');
        }

        function saveCollectorProfile() {
            const name = document.getElementById('coll-name-input').value.trim();
            const id = document.getElementById('coll-id-input').value.trim();
            const mobile = document.getElementById('coll-mobile-input').value.trim();

            if (!name || !id) return showToast('নাম এবং আইডি আবশ্যক');

            // Determine Role
            // ID '1' or Name 'Admin' = Admin Role.
            const role = (id === '1' || name.toLowerCase() === 'admin') ? 'admin' : 'teacher';

            currentCollector = { name, id, mobile, role };
            ShadowStorage.save(STORAGE_KEYS.currentCollector, currentCollector);

            closeModal('collector-profile-modal');
            showToast(`প্রোফাইল আপডেট হয়েছে(${role.toUpperCase()})`);

            if (!document.getElementById('transaction-history-modal').classList.contains('hidden')) {
                openTransactionHistoryModal();
            }
        }

        function openBulkFeeEntryModal() {
            try {
                if (selectedStudents.length === 0) return showToast("কোনো শিক্ষার্থী নির্বাচিত নেই");

                const subtitle = document.getElementById('bulk-fee-subtitle');
                if (subtitle) subtitle.textContent = `${selectedStudents.length} জন শিক্ষার্থীর জন্য ফি আদায় করুন`;

                const list = document.getElementById('bulk-fee-list');
                if (!list) throw new Error("List container not found");

                if (!feeTypes || feeTypes.length === 0) {
                    list.innerHTML = `<p class="text-center text-gray-500 py-4"> কোনো ফি টাইপ নেই। সেটিংস থেকে ফি টাইপ যোগ করুন।</p>`;
                } else {
                    list.innerHTML = feeTypes.map(fee => `
                <div class="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 transition">
                    <input type="checkbox" id="bulk-fee-check-${fee.id}" class="w-5 h-5 text-green-600 rounded focus:ring-green-500" onchange="toggleBulkFeeInput('${fee.id}')">
                        <div class="flex-1">
                            <label for="bulk-fee-check-${fee.id}" class="font-bold text-gray-800 block cursor-pointer">${fee.name}</label>
                            <span class="text-xs text-gray-500">${fee.type === 'monthly' ? 'মাসিক' : 'এককালীন'}</span>
                        </div>
                        <div class="w-32">
                            <input type="number" id="bulk-fee-amount-${fee.id}" value="${fee.amount || ''}" disabled
                                class="w-full p-2 border rounded-lg bg-gray-100 text-right font-mono text-sm focus:bg-white focus:ring-1 focus:ring-green-500 transition"
                                placeholder="৳0">
                        </div>
                    </div>
            `).join('');
                }

                const modal = document.getElementById('bulk-fee-modal');
                if (!modal) throw new Error("Modal not found");
                modal.classList.remove('hidden');

            } catch (e) {
                console.error(e);
                alert("Error opening bulk fees: " + e.message);
            }
        }


        function toggleBulkFeeInput(id) {
            const checkbox = document.getElementById(`bulk - fee - check - ${id} `);
            const input = document.getElementById(`bulk - fee - amount - ${id} `);

            if (checkbox.checked) {
                input.disabled = false;
                input.classList.remove('bg-gray-100');
                input.classList.add('bg-white', 'shadow-sm');
                input.focus();
            } else {
                input.disabled = true;
                input.classList.add('bg-gray-100');
                input.classList.remove('bg-white', 'shadow-sm');
            }
        }

        async function submitBulkFees() {
            // Get selected fees
            const selectedFeeTypes = [];
            feeTypes.forEach(fee => {
                const check = document.getElementById(`bulk - fee - check - ${fee.id} `);
                const input = document.getElementById(`bulk - fee - amount - ${fee.id} `);
                if (check && check.checked) {
                    const amount = parseFloat(input.value);
                    if (!isNaN(amount) && amount > 0) {
                        selectedFeeTypes.push({
                            id: fee.id,
                            name: fee.name,
                            amount: amount,
                            type: fee.type
                        });
                    }
                }
            });

            if (selectedFeeTypes.length === 0) {
                return showToast("কমপক্ষে একটি ফি এবং টাকার পরিমাণ দিন");
            }

            // Calculation
            const studentCount = selectedStudents.length;
            const perStudentAmount = selectedFeeTypes.reduce((sum, f) => sum + f.amount, 0);
            const totalAmount = perStudentAmount * studentCount;

            // Step 1: Confirm Action
            const confirmed = await customConfirm(
                `আপনি ${studentCount} জন শিক্ষার্থীর থেকে মোট ৳${totalAmount} আদায় করতে যাচ্ছেন।\n(জনপ্রতি ৳${perStudentAmount})`,
                'বাল্ক ফি নিশ্চিতকরণ'
            );

            if (!confirmed) return;

            // Generate Payments
            const newPayments = [];
            const timestamp = Date.now();

            let lastId = feePayments.reduce((max, p) => {
                const pid = parseInt(p.id);
                return !isNaN(pid) && pid > max ? pid : max;
            }, 0);

            selectedStudents.forEach((uid, index) => {
                const student = students.find(s => s.uid === uid);
                if (!student) return;

                // Create Allocation Details
                const allocated = selectedFeeTypes.map(f => ({
                    feeId: f.id + '-0', // Fix: Use ID instead of name
                    feeName: f.name,
                    itemLabel: 'Bulk Entry',
                    amount: f.amount,
                    description: `${f.name} `
                }));

                lastId++;
                const newPayment = {
                    id: String(lastId),
                    uid: uid,
                    amount: perStudentAmount,
                    date: timestamp + index,
                    details: {
                        allocated: allocated,
                        wallet: 0
                    },
                    // Meta for receipt generation
                    studentName: student.name,
                    studentClass: student.class,
                    studentRoll: student.roll,
                    studentMobile: student.mobile,
                    collectorName: currentCollector.name,
                    collectorId: currentCollector.id
                };

                newPayments.push(newPayment);
            });

            // Save
            feePayments.push(...newPayments);
            ShadowStorage.save(STORAGE_KEYS.feePayments, feePayments);

            closeBulkFeeModal();
            showToast(`${selectedStudents.length} জনের ফি সফলভাবে আদায় করা হয়েছে!`);

            // Always update dashboard stats and student cards in real-time
            if (typeof renderDashboard === 'function') renderDashboard();
            if (typeof renderStudents === 'function') renderStudents();

            // Exit selection mode after bulk action
            if (selectionMode && typeof toggleSelectionMode === 'function') toggleSelectionMode();

            // Generate and Show Bulk Receipt
            generateBulkReceipt(newPayments);
        }

        function generateBulkReceipt(payments) {
            const printArea = ensurePrintArea();
            let html = '';

            payments.forEach((payment, index) => {
                const student = students.find(s => s.uid === payment.uid) || { name: payment.studentName, class: payment.studentClass, roll: payment.studentRoll, id: payment.uid };
                const dateStr = new Date(payment.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' });

                // Page break - Ensure CSS handles this specific class
                const pageBreakClass = index > 0 ? 'print:break-before-page' : '';

                html += `
                <div class="receipt-page" style = "background: white; padding: 40px; max-width: 800px; margin: 0 auto; margin-bottom: 20px;" >
                    < !--Logo & Header-- >
                    <div style="text-align: center; border-bottom: 2px solid #111; padding-bottom: 20px; margin-bottom: 30px;">
                        <img src="logo.png" onerror="this.style.display='none'" style="height: 60px; display: block; margin: 0 auto 10px;">
                        <div style="font-size: 28px; font-weight: 800; color: #111; margin-bottom: 5px;">${instituteInfo.name || 'Class Connect Academy'}</div>
                        <div style="font-size: 14px; color: #555;">${instituteInfo.address || 'Address Here'}</div>
                    </div>
                    
                    <!--Receipt Meta-- >
                    <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-family: sans-serif;">
                        <div>
                            <div style="margin-bottom: 5px;"><strong>রশিদ নং:</strong> R-${payment.id}</div>
                            <div><strong>তারিখ:</strong> ${dateStr}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">${student.name}</div>
                            <div>আইডি: ${student.id || student.uid}</div>
                            <div>ক্লাস: ${student.class} | রোল: ${student.roll || '-'}</div>
                        </div>
                    </div>

                    <!--Table -->
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                        <thead>
                            <tr style="background: #f3f4f6;">
                                <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">বিবরণ</th>
                                <th style="1px solid #ddd; padding: 10px; text-align: right; width: 120px;">টাকা</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${payment.details.allocated.map(item => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 10px;">${item.description}</td>
                                <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">${item.amount}</td>
                            </tr>
                            `).join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 10px; text-align: right; font-weight: bold;">মোট জমা</td>
                                <td style="border: 1px solid #ddd; padding: 10px; text-align: right; font-weight: bold;">${payment.amount}</td>
                            </tr>
                        </tfoot>
                    </table>

                    <!--Authorization -->
                <div style="margin-top: 60px; display: flex; justify-content: space-between;">
                    <div style="text-align: center;">
                        <div style="width: 150px; border-top: 1px solid #999; padding-top: 5px;">আদায়কারীর স্বাক্ষর</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 150px; border-top: 1px solid #999; padding-top: 5px;">কর্তৃপক্ষের স্বাক্ষর</div>
                    </div>
                </div>
                 </div>
                <div style="height: 1px; width: 100%; border-bottom: 1px dashed #ddd; margin: 20px 0;"></div>
            `;
            });

            printArea.innerHTML = html;

            // Trigger print after slight delay to allow images etc to render
            setTimeout(() => window.print(), 500);
        }

        function ensurePrintArea() {
            let area = document.getElementById('print-area');
            if (!area) {
                area = document.createElement('div');
                area.id = 'print-area';
                area.className = 'print-only-area'; // Add class for styling
                document.body.appendChild(area);

                // Add Dynamic CSS for this
                const style = document.createElement('style');
                style.innerHTML = `
            @media print {
                body > *: not(#print - area) { display: none!important; }
                #print - area { display: block!important; position: absolute; top: 0; left: 0; width: 100 %; }
                        .receipt - page { page -break-inside: avoid; }
            }
            #print - area { display: none; }
            `;
                document.head.appendChild(style);
            }
            return area;
        }


        // Selection Action Functions
        function copySelectedList() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচিত নেই");
            }

            const selectedData = students.filter(s => selectedStudents.includes(s.uid));
            const list = selectedData.map((s, i) => `${i + 1}. ${s.name} - ${s.class} (${s.roll || 'N/A'})`).join('\n');

            navigator.clipboard.writeText(list).then(() => {
                showToast(`${selectedStudents.length} জনের তালিকা কপি করা হয়েছে!`);
            });
        }

        function copySelectedNumbers() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচিত নেই");
            }

            const selectedData = students.filter(s => selectedStudents.includes(s.uid));
            const numbers = selectedData.map(s => getFormattedNumber(s.mobile, 'tel')).join(',');

            navigator.clipboard.writeText(numbers).then(() => {
                showToast(`${selectedStudents.length} টি নম্বর কপি করা হয়েছে!`);
            });
        }

        function callSelectedStudents() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচিত নেই");
            }

            const selectedData = students.filter(s => selectedStudents.includes(s.uid));

            if (selectedData.length === 1) {
                // Single student - direct call
                window.location.href = `tel: +88${selectedData[0].mobile} `;
            } else {
                // Multiple students - show numbers
                const list = selectedData.map((s, i) => `${i + 1}. ${s.name}: +88${s.mobile} `).join('\n');
                alert(`নিম্নলিখিত নম্বরগুলিতে কল করুন: \n\n${list} `);
            }
        }

        function messageSelectedStudents() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচিত নেই");
            }

            const selectedData = students.filter(s => selectedStudents.includes(s.uid));
            const ua = navigator.userAgent.toLowerCase();
            const separator = (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1) ? '&' : ',';
            const numbers = selectedData.map(s => getFormattedNumber(s.mobile, 'tel')).join(separator);

            window.location.href = `sms:${numbers} `;
        }



        // Bulk Operations for Selected Students

        function selectAllVisibleStudents() {
            const visibleStudents = getFilteredStudents();

            const allIds = visibleStudents.map(s => s.uid);

            // Toggle logic: If all visible are selected, deselect all. Otherwise, select all.
            const allSelected = allIds.every(id => selectedStudents.includes(id));

            if (allSelected) {
                // Deselect these
                selectedStudents = selectedStudents.filter(id => !allIds.includes(id));
            } else {
                // Add missing
                allIds.forEach(id => {
                    if (!selectedStudents.includes(id)) selectedStudents.push(id);
                });
            }

            updateSelectionCount();
            renderStudents();
        }

        function printSelectedStudents() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচন করা হয়নি");
            }
            openReportModal('LIST', true);
        }

        function openFeesForSelected() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচন করা হয়নি");
            }
            // Just open fees modal for now
            openFeesModal();
        }

        function copySelectedList() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচন করা হয়নি");
            }

            // Open field selector modal
            document.getElementById('field-selector-modal').classList.remove('hidden');
            setTimeout(() => lucide.createIcons(), 10);
        }

        function selectAllFields() {
            document.getElementById('field-name').checked = true;
            document.getElementById('field-roll').checked = true;
            document.getElementById('field-id').checked = true;
            document.getElementById('field-class').checked = true;
            document.getElementById('field-mobile').checked = true;
            document.getElementById('field-father').checked = true;
            document.getElementById('field-mother').checked = true;
        }

        function selectNoFields() {
            document.getElementById('field-name').checked = false;
            document.getElementById('field-roll').checked = false;
            document.getElementById('field-id').checked = false;
            document.getElementById('field-class').checked = false;
            document.getElementById('field-mobile').checked = false;
            document.getElementById('field-father').checked = false;
            document.getElementById('field-mother').checked = false;
        }

        function copyWithSelectedFields() {
            const selectedData = students.filter(s => selectedStudents.includes(s.uid));

            // Get selected fields
            const includeName = document.getElementById('field-name').checked;
            const includeRoll = document.getElementById('field-roll').checked;
            const includeId = document.getElementById('field-id').checked;
            const includeClass = document.getElementById('field-class').checked;
            const includeMobile = document.getElementById('field-mobile').checked;
            const includeFather = document.getElementById('field-father').checked;
            const includeMother = document.getElementById('field-mother').checked;

            // Build list based on selected fields - each field on new line
            const text = selectedData.map((s, idx) => {
                const lines = [];

                // Number and Name on first line
                if (includeName) {
                    lines.push(`${idx + 1}. ${s.name} `);
                } else {
                    lines.push(`${idx + 1}.`);
                }

                // Class and Roll
                if (includeClass && includeRoll) {
                    lines.push(`   ${s.class} (${s.roll || 'N/A'})`);
                } else if (includeClass) {
                    lines.push(`   ${s.class} `);
                } else if (includeRoll) {
                    lines.push(`   Roll: ${s.roll || 'N/A'} `);
                }

                // ID
                if (includeId) {
                    lines.push(`   ID: ${s.id || 'N/A'} `);
                }

                // Mobile
                const mobVal = s.mobile || s.custom_fields?.['মোবাইল নম্বর'] || s.custom_fields?.['অভিভাবকের মোবাইল'];
                if (includeMobile && mobVal) {
                    lines.push(`   + 88${mobVal} `);
                }

                // Father
                const fatherVal = s.fathersName || s.father_name || s.father || s.custom_fields?.['পিতার নাম'];
                if (includeFather && fatherVal) {
                    lines.push(`   Father: ${fatherVal} `);
                }

                // Mother
                const motherVal = s.mothersName || s.mother_name || s.mother || s.custom_fields?.['মাতার নাম'];
                if (includeMother && motherVal) {
                    lines.push(`   Mother: ${motherVal} `);
                }

                return lines.join('\n');
            }).join('\n\n'); // Blank line between students

            navigator.clipboard.writeText(text).then(() => {
                showToast(`${selectedData.length} জন শিক্ষার্থীর তালিকা কপি করা হয়েছে!`);
                closeModal('field-selector-modal');
            }).catch(err => {
                // Fallback for file:// URLs
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    showToast(`${selectedData.length} জন শিক্ষার্থীর তালিকা কপি করা হয়েছে!`);
                    closeModal('field-selector-modal');
                } catch (e) {
                    showToast('কপি করতে সমস্যা হয়েছে');
                }
                document.body.removeChild(textarea);
            });
        }

        function copySelectedNumbers() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচন করা হয়নি");
            }

            const selectedData = students.filter(s => selectedStudents.includes(s.uid));
            const numbers = selectedData.map(s => getFormattedNumber(s.mobile, 'tel')).join(',');

            navigator.clipboard.writeText(numbers).then(() => {
                showToast(`${selectedStudents.length} টি নম্বর কপি করা হয়েছে!`);
            }).catch(err => {
                // Fallback for file:// URLs
                const textarea = document.createElement('textarea');
                textarea.value = numbers;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    showToast(`${selectedStudents.length} টি নম্বর কপি করা হয়েছে!`);
                } catch (e) {
                    showToast('কপি করতে সমস্যা হয়েছে');
                }
                document.body.removeChild(textarea);
            });
        }

        function callSelectedStudents() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচিত নেই");
            }

            const selectedData = students.filter(s => selectedStudents.includes(s.uid));

            if (selectedData.length === 1) {
                // Single student - direct call
                window.location.href = `tel:${getFormattedNumber(selectedData[0].mobile, 'tel')}`;
            } else {
                // Multiple students - copy numbers for manual calling
                const numbers = selectedData.map(s => getFormattedNumber(s.mobile, 'tel')).join(',');
                navigator.clipboard.writeText(numbers).then(() => {
                    showToast(`${selectedData.length} টি নম্বর কপি করা হয়েছে! একে একে কল করুন`);
                }).catch(err => {
                    // Fallback
                    const textarea = document.createElement('textarea');
                    textarea.value = numbers;
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = '0';
                    document.body.appendChild(textarea);
                    textarea.select();
                    try {
                        document.execCommand('copy');
                        showToast(`${selectedData.length} টি নম্বর কপি করা হয়েছে! একে একে কল করুন`);
                    } catch (e) {
                        showToast('কপি করতে সমস্যা হয়েছে');
                    }
                    document.body.removeChild(textarea);
                });
            }
        }

        function messageSelectedStudents() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচিত নেই");
            }

            const selectedData = students.filter(s => selectedStudents.includes(s.uid));
            const ua = navigator.userAgent.toLowerCase();
            const separator = (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1) ? '&' : ',';
            const numbers = selectedData.map(s => getFormattedNumber(s.mobile, 'tel')).join(separator);

            window.location.href = `sms:${numbers} `;
        }

        async function moveSelectedStudents() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচন করা হয়নি");
            }

            const newClass = await customPrompt(`${selectedStudents.length} জন শিক্ষার্থীকে কোন ক্লাসে সরাতে চান ? `, currentFilter !== 'All' ? currentFilter : '', 'ক্লাস স্থানান্তর');

            if (newClass && newClass.trim()) {
                const className = newClass.trim();

                // Add class if doesn't exist
                if (!classes.includes(className)) {
                    classes.push(className);
                    saveClasses();
                }

                // Move students
                selectedStudents.forEach(uid => {
                    const index = students.findIndex(s => s.uid === uid);
                    if (index !== -1) {
                        students[index].class = className;
                    }
                });

                saveData();
                showToast(`${selectedStudents.length} জন শিক্ষার্থী "${className}" ক্লাসে সরানো হয়েছে`);
                toggleSelectionMode();
                renderFilters();
                renderStudents();
                updateClassSuggestions();
            }
        }

        function exportSelectedStudents() {
            if (selectedStudents.length === 0) {
                return showToast("কোনো শিক্ষার্থী নির্বাচন করা হয়নি");
            }

            const selectedData = students.filter(s => selectedStudents.includes(s.uid));

            const exportData = {
                exportDate: new Date().toISOString(),
                count: selectedData.length,
                students: selectedData
            };

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", `selected_students_${selectedData.length}_${new Date().toISOString().slice(0, 10)}.json`);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();

            showToast(`${selectedData.length} জন শিক্ষার্থী এক্সPORT করা হয়েছে!`);
        }

        async function editClass(oldClassName) {
            const newClassName = await customPrompt(`ক্লাসের নাম পরিবর্তন করুন: `, oldClassName, 'ক্লাস এডিট');

            if (newClassName && newClassName.trim() && newClassName !== oldClassName) {
                const updatedName = newClassName.trim();

                if (classes.includes(updatedName)) {
                    showToast('এই নামে ইতিমধ্যে একটি ক্লাস আছে!');
                    return;
                }

                // Update classes array
                const index = classes.indexOf(oldClassName);
                if (index !== -1) {
                    classes[index] = updatedName;
                    saveClasses();
                }

                // Update students
                let updatedCount = 0;
                students.forEach(s => {
                    if (s.class === oldClassName) {
                        s.class = updatedName;
                        updatedCount++;
                    }
                });

                if (updatedCount > 0) {
                    saveData();
                }

                showToast(`ক্লাস নাম পরিবর্তন করা হয়েছে: ${oldClassName} -> ${updatedName} `);

                // Update active filter if needed
                if (currentFilter === oldClassName) {
                    setFilter(updatedName);
                } else {
                    renderFilters(); // updates UI
                }
            }
        }

        function showClassContextMenu(className, event) {
            // Remove existing context menus
            const existing = document.getElementById('class-context-menu');
            if (existing) existing.remove();

            const menu = document.createElement('div');
            menu.id = 'class-context-menu';
            menu.className = "fixed z-[999] bg-white rounded-lg shadow-xl border border-gray-100 p-1 min-w-[150px] animate-fade-in";

            // Calculate position to keep within viewport
            let top = event.clientY + 10;
            let left = event.clientX;

            // Adjust if goes off screen
            if (left + 160 > window.innerWidth) left = window.innerWidth - 170;
            if (top + 100 > window.innerHeight) top = event.clientY - 100;

            menu.style.top = `${top}px`;
            menu.style.left = `${left}px`;

            if (className === 'All') {
                menu.innerHTML = `
                    <button onclick="openEditClassesModal(); closeContextMenu()" class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md flex items-center gap-2 transition">
                        <i data-lucide="layers" class="w-4 h-4"></i> ক্লাস লিস্ট সাজান (Manage)
                    </button>
                `;
            } else {
                menu.innerHTML = `
                    <button onclick="editClass('${className}'); closeContextMenu()" class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-md flex items-center gap-2 transition">
                        <i data-lucide="edit-2" class="w-4 h-4"></i> নাম পরিবর্তন(Edit)
                    </button>
                    <div class="h-px bg-gray-100 my-1"></div>
                    <button onclick="deleteClass('${className}'); closeContextMenu()" class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2 transition">
                        <i data-lucide="trash-2" class="w-4 h-4"></i> মুছে ফেলুন (Delete)
                    </button>
                `;
            }

            document.body.appendChild(menu);
            lucide.createIcons();

            // Click outside to close
            const closeHandler = (e) => {
                if (!menu.contains(e.target)) {
                    closeContextMenu();
                    document.removeEventListener('click', closeHandler);
                }
            };
            setTimeout(() => document.addEventListener('click', closeHandler), 10);
        }

        function closeContextMenu() {
            const menu = document.getElementById('class-context-menu');
            if (menu) menu.remove();
        }

        // Class Delete Function
        async function deleteClass(className) {
            const classStudents = students.filter(s => s.class === className);
            const count = classStudents.length;

            let message = `আপনি কি নিশ্চিত যে আপনি "${className}" ক্লাসটি মুছে ফেলতে চান ? `;

            if (count > 0) {
                message = `সতর্কতা: এই ক্লাসে ${count} জন শিক্ষার্থী আছে।\n\nআপনি যদি মুছে ফেলেন, তবে এই শিক্ষার্থীদের ক্লাস "Unassigned" হিসেবে সেট করা হবে।\n\nআপনি কি নিশ্চিত ? `;
            }

            if (await customConfirm(message, 'ক্লাস মুছুন')) {
                // Remove class from list
                classes = classes.filter(c => c !== className);
                saveClasses();

                // Update students if any
                if (count > 0) {
                    let updated = false;
                    students.forEach(s => {
                        if (s.class === className) {
                            s.class = 'Unassigned';
                            updated = true;
                        }
                    });
                    if (updated) {
                        saveData();
                        // Ensure Unassigned is added to classes if needed, or let syncClasses handle it? 
                        // Check if unassigned exists
                        if (!classes.includes('Unassigned')) {
                            classes.push('Unassigned');
                            saveClasses();
                        }
                    }
                }

                showToast(`"${className}" ক্লাস মুছে ফেলা হয়েছে`);

                // If current filter is the deleted class, switch to 'All'
                if (currentFilter === className) {
                    setFilter('All');
                } else {
                    renderFilters(); // Just refresh the list
                }
            }
        }

        function deleteCurrentClass() {
            if (currentFilter && currentFilter !== 'All') {
                deleteClass(currentFilter);
            } else {
                showToast("কোনো ক্লাস নির্বাচিত নেই");
            }
        }

        // --- Class Management UI ---
        function renderClassHeader() {
            const container = document.getElementById('class-header-container');
            if (currentFilter === 'All') {
                if (container) container.remove();
                return;
            }

            if (!container) {
                // Fix: Target the specific page container, not the main scroll wrapper
                const studentsPage = document.getElementById('students-page');
                const headerDiv = document.createElement('div');
                headerDiv.id = 'class-header-container';
                headerDiv.className = 'mb-4 flex items-center justify-between sticky top-0 bg-gray-100 z-30 px-2 py-2 rounded-xl border border-gray-200 shadow-sm';

                // Insert before search bar
                const searchBar = studentsPage.querySelector('.sticky.top-0.z-10');
                if (searchBar && searchBar.parentNode === studentsPage) {
                    studentsPage.insertBefore(headerDiv, searchBar);
                } else {
                    studentsPage.prepend(headerDiv);
                }
            }

            const header = document.getElementById('class-header-container');
            header.innerHTML = `
                <div class="flex items-center gap-2" >
                    <div class="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                        <i data-lucide="school" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h2 class="text-base font-bold text-gray-800">${currentFilter}</h2>
                        <p class="text-[10px] text-gray-500 font-medium">${students.filter(s => s.class === currentFilter).length} জন শিক্ষার্থী</p>
                    </div>
                </div>
                <div class="relative">
                    <button onclick="toggleClassMenu()" class="p-2 hover:bg-gray-200 rounded-full transition text-gray-600">
                        <i data-lucide="more-vertical" class="w-5 h-5"></i>
                    </button>
                    <!-- Dropdown Menu -->
                    <div id="class-menu-dropdown" class="hidden absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20 origin-top-right transform transition-all duration-200 scale-95 opacity-0">
                        <button onclick="renameClass()" class="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50">
                            <i data-lucide="pencil" class="w-3.5 h-3.5 text-blue-500"></i> নাম পরিবর্তন
                        </button>
                        <button onclick="deleteCurrentClass()" class="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2">
                            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> ক্লাস মুছুন
                        </button>
                    </div>
                </div>
            `;
            lucide.createIcons();
        }

        function toggleReportSettings() {
            const popup = document.getElementById('report-settings-popup');
            if (popup.classList.contains('hidden')) {
                renderReportFieldOptions(); // Render fields when opening
                popup.classList.remove('hidden');
                // micro animation
                setTimeout(() => {
                    popup.classList.remove('scale-95', 'opacity-0');
                    popup.classList.add('scale-100', 'opacity-100');
                }, 10);
            } else {
                popup.classList.add('scale-95', 'opacity-0');
                popup.classList.remove('scale-100', 'opacity-100');
                setTimeout(() => popup.classList.add('hidden'), 200);
            }
            // Close menu when clicking outside
            const closeMenu = (e) => {
                if (!e.target.closest('#class-menu-dropdown') && !e.target.closest('[onclick="toggleClassMenu()"]')) {
                    menu.classList.add('scale-95', 'opacity-0');
                    menu.classList.remove('scale-100', 'opacity-100');
                    setTimeout(() => menu.classList.add('hidden'), 200);
                    document.removeEventListener('click', closeMenu);
                }
            };
            setTimeout(() => document.addEventListener('click', closeMenu), 0);
        }

        function toggleClassMenu() {
            const menu = document.getElementById('class-menu-dropdown');
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
                setTimeout(() => {
                    menu.classList.remove('scale-95', 'opacity-0');
                    menu.classList.add('scale-100', 'opacity-100');
                }, 10);

                // Close menu when clicking outside
                const closeMenu = (e) => {
                    if (!e.target.closest('#class-menu-dropdown') && !e.target.closest('[onclick="toggleClassMenu()"]')) {
                        menu.classList.add('scale-95', 'opacity-0');
                        menu.classList.remove('scale-100', 'opacity-100');
                        setTimeout(() => menu.classList.add('hidden'), 200);
                        document.removeEventListener('click', closeMenu);
                    }
                };
                setTimeout(() => document.addEventListener('click', closeMenu), 0);
            } else {
                menu.classList.add('scale-95', 'opacity-0');
                menu.classList.remove('scale-100', 'opacity-100');
                setTimeout(() => menu.classList.add('hidden'), 200);
            }
        }

        async function renameClass() {
            const oldName = currentFilter;
            const newName = await customPrompt("নতুন ক্লাসের নাম লিখুন:", oldName, 'ক্লাস রিনেম করুন');

            if (newName && newName.trim() !== "" && newName !== oldName) {
                const trimmedName = newName.trim();

                if (classes.includes(trimmedName)) {
                    showToast("এই নামের ক্লাস ইতিমধ্যে বিদ্যমান!");
                    return;
                }

                // Update class list
                const index = classes.indexOf(oldName);
                if (index !== -1) {
                    classes[index] = trimmedName;
                    saveClasses();
                }

                // Update students
                let updatedCount = 0;
                students.forEach(s => {
                    if (s.class === oldName) {
                        s.class = trimmedName;
                        updatedCount++;
                    }
                });

                if (updatedCount > 0) {
                    saveData();
                }

                currentFilter = trimmedName;
                renderFilters();
                updateClassSuggestions();
                showToast(`ক্লাসের নাম পরিবর্তন করা হয়েছে`);
            }
        }

        async function deleteCurrentClass() {
            const className = currentFilter;
            const classStudents = students.filter(s => s.class === className);

            if (classStudents.length > 0) {
                showToast(`এই ক্লাসে ${classStudents.length} জন শিক্ষার্থী আছে। প্রথমে তাদের মুছুন বা সরান।`);
                return;
            }

            const confirmed = await customConfirm(
                `আপনি কি নিশ্চিত যে আপনি "${className}" ক্লাসটি মুছে ফেলতে চান ? `,
                'ক্লাস মুছে ফেলুন'
            );

            if (confirmed) {
                classes = classes.filter(c => c !== className);
                saveClasses();
                currentFilter = 'All';
                renderFilters();
                updateClassSuggestions();
                showToast(`"${className}" ক্লাস মুছে ফেলা হয়েছে`);
            }
        }

        function refreshAppUI() {
            try {
                // Core Renders
                if (typeof renderDashboard === 'function') renderDashboard();
                if (typeof renderClassFilters === 'function') renderClassFilters();
                if (typeof renderStudents === 'function') renderStudents();
                if (typeof renderFeesStudentGrid === 'function') renderFeesStudentGrid();

                // Update Header Count
                const countEl = document.querySelector('header p');
                if (countEl && typeof students !== 'undefined') {
                    countEl.textContent = `মোট ${students.length} জন শিক্ষার্থী`;
                }

                // Dependent Renders
                if (typeof renderFilters === 'function') renderFilters();
                if (typeof renderFeesClassFilters === 'function') renderFeesClassFilters();

                // Update Open Detail Panels
                if (typeof currentDetailUid !== 'undefined' && currentDetailUid) {
                    const student = students.find(s => s.uid === currentDetailUid);
                    if (student) {
                        if (currentMode === 'fees' && typeof showStudentFeeDetailPanel === 'function') {
                            showStudentFeeDetailPanel(student);
                        } else if (typeof showStudentDetailPanel === 'function') {
                            showStudentDetailPanel(student);
                        }
                    }
                }
            } catch (err) {
                console.error("UI Refresh Error:", err);
            }
        }

        async function saveData() {
            await ShadowStorage.save(STORAGE_KEYS.students, students);
            refreshAppUI();
        }
        async function saveClasses() {
            await ShadowStorage.save(STORAGE_KEYS.classes, classes);
            refreshAppUI();
        }
        function cleanNumber(num) { return num ? num.replace(/[^0-9+]/g, '') : ''; }
        function getFormattedNumber(num, format = 'tel') {
            let clean = cleanNumber(num);
            if (!clean) return '';
            if (clean.startsWith('+')) return format === 'wa' ? clean.substring(1) : clean;
            if (clean.startsWith('88')) return format === 'wa' ? clean : '+' + clean;
            const defaultCode = '+88';
            if (format === 'wa') return defaultCode.replace('+', '') + clean;
            return defaultCode + clean;
        }

        function getMobileFromForm() {
            const code = document.getElementById('inp-mobile-code')?.value || '';
            const num = document.getElementById('inp-mobile-number')?.value || '';
            if (!num) return '';
            return code + num;
        }

        function splitMobile(fullNum) {
            if (!fullNum) return { code: '+880', number: '' };
            if (!fullNum.startsWith('+')) return { code: '+880', number: fullNum };

            // Sort codes by length descending to match longest prefix first
            for (const code of COUNTRY_CODES_SORTED) {
                if (fullNum.startsWith(code)) {
                    return { code: code, number: fullNum.substring(code.length) };
                }
            }
            // Fallback
            return { code: '+880', number: fullNum };
        }

        function toggleStudentStatus(uid) {
            const s = students.find(stu => stu.uid === uid);
            if (!s) return;

            const isCurrentlyDisabled = s.status === 'disabled';
            const newStatus = isCurrentlyDisabled ? 'active' : 'disabled';

            // Visually revert toggle while modal is open to show "Pending Decision"
            const toggles = document.querySelectorAll(`input[type="checkbox"][onchange*="toggleStudentStatus('${uid}')"]`);
            toggles.forEach(t => t.checked = !t.checked);

            showStatusImpactModal(s, newStatus, (calculatedFees) => {
                closeModal('status-impact-modal');
                showStatusFeeAdjustmentModal(s, newStatus, calculatedFees, (finalOverrides) => {
                    const logMsg = newStatus === 'active' ? 'অ্যাক্টিভেট' : 'ডিজেবল';
                    s.status = newStatus;
                    if (!s.statusHistory) s.statusHistory = [];
                    s.statusHistory.push({ status: newStatus, date: Date.now() });
                    if (finalOverrides && Object.keys(finalOverrides).length > 0) {
                        if (!s.feeOverrides) s.feeOverrides = {};
                        Object.assign(s.feeOverrides, finalOverrides);
                    }
                    saveData();
                    showToast(`শিক্ষার্থী ${logMsg} করা হয়েছে`);
                    closeModal('status-adjustment-modal');
                });
            }, () => {
                closeModal('status-impact-modal');
                refreshAppUI();
            });
        }

        async function showStatusImpactModal(student, targetStatus, onConfirm, onCancel) {
            const modal = document.getElementById('status-impact-modal');
            if (!modal) return onConfirm([]);
            const confirmBtn = document.getElementById('impact-confirm-btn');
            const cancelBtn = document.getElementById('impact-cancel-btn');
            if (!confirmBtn || !cancelBtn) return onConfirm([]);

            let calculatedFees = [];
            try {
                const financials = calculateStudentFinancials(student);
                if (targetStatus === 'active') {
                    document.getElementById('impact-title').textContent = 'আবার অ্যাক্টিভ করবেন?';
                    document.getElementById('impact-icon-container').className = "w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4 animate-bounce";
                    const lastDisabled = [...(student.statusHistory || [])].reverse().find(h => h.status === 'disabled');
                    const daysInactive = lastDisabled ? Math.floor((Date.now() - (isNaN(lastDisabled.date) ? new Date(lastDisabled.date).getTime() : parseFloat(lastDisabled.date))) / (1000 * 60 * 60 * 24)) : 0;
                    document.getElementById('impact-stats').innerHTML = `<div class="bg-gray-50 p-2 rounded-xl text-center"><p class="text-[9px] font-bold text-gray-400 uppercase">নিষ্ক্রিয় ছিল</p><p class="text-lg font-black">${daysInactive} দিন</p></div><div class="bg-gray-50 p-2 rounded-xl text-center"><p class="text-[9px] font-bold text-gray-400 uppercase">মিছ করা ফি</p><p class="text-lg font-black text-rose-500" id="missed-count">৳০</p></div>`;
                    let totalMissed = 0, missedList = [];
                    const temp = JSON.parse(JSON.stringify(student)); temp.status = 'active'; temp.statusHistory = [];
                    (calculateStudentFinancials(temp).details || []).forEach(hf => {
                        const af = (financials.details || []).find(f => f.name === hf.name);
                        const diff = (hf.total || 0) - (af ? af.total : 0);
                        if (diff > 0) { totalMissed += diff; calculatedFees.push({ name: hf.name, amount: diff, type: 'missed', feeId: hf.id }); missedList.push(`<div class="flex justify-between text-xs font-bold py-1 border-b border-gray-100 last:border-0"><span>${hf.name}</span><span class="text-rose-600">৳${diff}</span></div>`); }
                    });
                    if (document.getElementById('missed-count')) document.getElementById('missed-count').textContent = `৳${totalMissed}`;
                    document.getElementById('impact-details').innerHTML = missedList.length > 0 ? `<p class="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest text-left">মিছ করা ফি এর তালিকা</p>${missedList.join('')}` : '<p class="text-center text-xs text-gray-400 py-4">কোনো ফি মিছ হয়নি</p>';
                    confirmBtn.className = "w-full py-3.5 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100"; confirmBtn.textContent = 'হ্যাঁ, অ্যাক্টিভ করুন';
                } else {
                    document.getElementById('impact-title').textContent = 'ডিজেবল করতে চান?';
                    document.getElementById('impact-icon-container').className = "w-16 h-16 rounded-full bg-rose-500 flex items-center justify-center mx-auto mb-4 animate-pulse";
                    document.getElementById('impact-stats').innerHTML = `<div class="bg-gray-50 p-2 rounded-xl text-center"><p class="text-[9px] font-bold text-gray-400 uppercase">মোট বকেয়া</p><p class="text-lg font-black text-rose-600">৳${financials.balance || 0}</p></div><div class="bg-gray-50 p-2 rounded-xl text-center"><p class="text-[9px] font-bold text-gray-400 uppercase">চলতি মাসের ফি</p><p class="text-lg font-black text-indigo-600" id="current-month-fee">৳০</p></div>`;
                    let currentMonthTotal = 0, now = new Date(), yearShort = now.getFullYear().toString().slice(-2), banglaMonths = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'], currentMonthName = banglaMonths[now.getMonth()];
                    (financials.details || []).forEach(f => {
                        (f.items || []).forEach(item => { if (item.label && (item.label.includes(currentMonthName) || item.label.includes(yearShort))) { const amt = item.remaining !== undefined ? item.remaining : item.amount; if (amt > 0) { currentMonthTotal += amt; calculatedFees.push({ name: f.name, label: item.label, amount: amt, type: 'pro-rated', id: item.id }); } } });
                    });
                    if (document.getElementById('current-month-fee')) document.getElementById('current-month-fee').textContent = `৳${currentMonthTotal}`;
                    document.getElementById('impact-details').innerHTML = `<div class="space-y-2 text-left text-[10px] text-gray-500 font-bold italic">* ডিজেবল করার পর থেকে কোনো ফি ধার্য হবে না। চলতি মাসের ফি (${currentMonthName}) উপরে হিসাব করা হয়েছে।</div>`;
                    confirmBtn.className = "w-full py-3.5 bg-rose-600 text-white rounded-2xl font-bold shadow-lg shadow-rose-100"; confirmBtn.textContent = 'হ্যাঁ, ডিজেবল করুন';
                }
                confirmBtn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); onConfirm(calculatedFees); };
                cancelBtn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); onCancel(); };
                modal.classList.remove('hidden'); lucide.createIcons();
            } catch (err) { console.error(err); onConfirm([]); }
        }

        function showStatusFeeAdjustmentModal(student, targetStatus, calculatedFees, onSave) {
            const modal = document.getElementById('status-adjustment-modal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }
            const container = document.getElementById('adj-items-container');
            const saveBtn = document.getElementById('adj-save-final-btn');

            // Get ALL fee types applicable to this student's class
            const applicableFees = feeTypes.filter(ft => ft.classFees && ft.classFees[student.class]);

            if (applicableFees.length === 0) {
                showToast('এই ক্লাসের জন্য কোনো ফি নেই');
                return onSave({});
            }

            // Determine current month info
            const now = new Date();
            const currentMonthKey = `${now.getFullYear()}-${now.getMonth()}`;
            const banglaMonths = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
            const currentMonthName = banglaMonths[now.getMonth()];

            // Create a map of calculated fee amounts from the impact analysis
            const calculatedMap = {};
            calculatedFees.forEach(cf => {
                calculatedMap[cf.feeId || cf.id || cf.name] = cf.amount;
            });

            // Render ALL fee types
            container.innerHTML = applicableFees.map((feeType, idx) => {
                const defaultRate = parseFloat(feeType.classFees[student.class] || 0);

                // Check if this fee is active for current month
                const isActiveThisMonth = (() => {
                    if (feeType.type === 'monthly') {
                        // Check if fee start/end dates cover current month
                        const feeStart = new Date(feeType.startDate);
                        const feeEnd = feeType.endDate ? new Date(feeType.endDate) : new Date(2099, 11, 31);
                        return now >= feeStart && now <= feeEnd;
                    } else if (feeType.type === 'one_time') {
                        // One-time fees are "active" if not yet fully paid
                        const paid = student.feeOverrides?.[`${feeType.id}-0`];
                        return paid === undefined || paid > 0;
                    }
                    return false; // weekly, yearly, semester - context dependent
                })();

                // Get suggested amount (from calculations or default)
                const suggestedAmount = calculatedMap[feeType.id] !== undefined
                    ? calculatedMap[feeType.id]
                    : (isActiveThisMonth ? defaultRate : 0);

                const activeIndicator = isActiveThisMonth
                    ? '<span class="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-black uppercase rounded-full border border-green-200">✓ Active</span>'
                    : '<span class="ml-2 px-2 py-0.5 bg-gray-100 text-gray-400 text-[9px] font-black uppercase rounded-full">Inactive</span>';

                return `
                <div class="bg-${isActiveThisMonth ? 'green-50/30' : 'gray-50/50'} rounded-2xl p-4 border border-${isActiveThisMonth ? 'green-100' : 'gray-100'} shadow-sm">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                            <div class="flex items-center">
                                <p class="text-sm font-black text-gray-800">${feeType.name}</p>
                                ${activeIndicator}
                            </div>
                            <p class="text-[10px] text-gray-400 font-bold uppercase mt-1">${feeType.type === 'monthly' ? `মাসিক (${currentMonthName})` : feeType.type === 'one_time' ? 'এককালীন' : feeType.type}</p>
                        </div>
                        <div class="text-right text-[9px] font-bold text-gray-400 uppercase">
                            Standard
                            <p class="text-sm font-black text-gray-500 mt-1">৳${defaultRate}</p>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <div class="relative">
                            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 font-black text-sm">৳</span>
                            <input type="number" 
                                id="adj-input-${idx}" 
                                data-fee-id="${feeType.id}"
                                data-fee-type="${feeType.type}"
                                data-original="${defaultRate}" 
                                value="${suggestedAmount}" 
                                class="w-full pl-7 pr-3 py-3 bg-white border border-gray-200 rounded-xl font-black text-indigo-700 outline-none text-base shadow-inner transition-all focus:ring-2 focus:ring-green-500">
                        </div>
                        <div class="flex gap-2">
                            <button onclick="document.getElementById('adj-input-${idx}').value = ${defaultRate}" 
                                class="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 font-black text-[10px] transition-all border border-indigo-100">
                                100%
                            </button>
                            <button onclick="document.getElementById('adj-input-${idx}').value = Math.round(${defaultRate}/2)" 
                                class="flex-1 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 font-black text-[10px] transition-all border border-amber-100">
                                50%
                            </button>
                            <button onclick="document.getElementById('adj-input-${idx}').value = 0" 
                                class="w-10 py-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 font-black text-[10px] transition-all border border-rose-100 flex items-center justify-center">
                                <i data-lucide="trash-2" class="w-3 h-3"></i>
                            </button>
                        </div>
                    </div>
                </div>`;
            }).join('');

            saveBtn.onclick = (e) => {
                e.preventDefault();
                const overrides = {};

                // Collect values from all fee type inputs
                applicableFees.forEach((feeType, idx) => {
                    const input = document.getElementById(`adj-input-${idx}`);
                    const val = parseFloat(input.value);
                    const feeId = input.dataset.feeId;
                    const feeTypeStr = input.dataset.feeType;

                    // Only save non-zero amounts as overrides
                    if (!isNaN(val) && val > 0) {
                        if (feeTypeStr === 'monthly') {
                            // For monthly fees, create override for current month
                            overrides[`${feeId}-${currentMonthKey}`] = val;
                        } else {
                            // For one-time/other fees
                            overrides[`${feeId}-0`] = val;
                        }
                    }
                });

                onSave(overrides);
            };

            modal.classList.remove('hidden');
            setTimeout(() => lucide.createIcons(), 10);
        }

        async function editStatusHistoryDate(uid, index) {
            const s = students.find(stu => stu.uid === uid);
            if (!s || !s.statusHistory || !s.statusHistory[index]) return;

            const entry = s.statusHistory[index];
            const currentDate = new Date(isNaN(entry.date) ? entry.date : parseFloat(entry.date)).toISOString().split('T')[0];

            const newDateStr = await customPrompt(`"${entry.status}" স্ট্যাটাস পরিবর্তনের তারিখ পরিবর্তন করুন (YYYY-MM-DD):`, currentDate, 'তারিখ পরিবর্তন');
            if (newDateStr) {
                const newDate = new Date(newDateStr);
                if (isNaN(newDate.getTime())) return showToast("অবৈধ তারিখ");

                entry.date = newDate.getTime();
                saveData();
                showToast("স্ট্যাটাস ইতিহাস আপডেট করা হয়েছে");
                showStudentDetailPanel(s);
                if (currentMode === 'fees') renderFeesStudentGrid();
            }
        }

        async function updateProRateThreshold(uid, value) {
            const s = students.find(stu => stu.uid === uid);
            if (!s) return;

            const val = parseInt(value);
            if (isNaN(val) || val < 1 || val > 28) return showToast("অবৈধ দিন (১-২৮ এর মধ্যে দিন)");

            s.proRateThreshold = val;
            saveData();
            showToast(`প্রো-রেটিং লিমিট ${val} দিন সেট করা হয়েছে`);
            showStudentDetailPanel(s);
            if (currentMode === 'fees') renderFeesStudentGrid();
        }



        function sendGroupSMS() {
            let targets = currentFilter === 'All' ? students : students.filter(s => s.class === currentFilter);
            if (targets.length === 0) return showToast("কোনো শিক্ষার্থী নেই");
            const msg = document.getElementById('broadcast-msg').value;
            const ua = navigator.userAgent.toLowerCase();
            const separator = (ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1) ? '&' : ',';
            const finalNumbers = targets.map(s => getFormattedNumber(s.mobile, 'tel')).join(separator);
            window.location.href = `sms:${finalNumbers}?body = ${encodeURIComponent(msg)} `;
        }

        function copyNumbers() {
            let targets = currentFilter === 'All' ? students : students.filter(s => s.class === currentFilter);
            if (targets.length === 0) return showToast("কোনো শিক্ষার্থী নেই");
            const numbers = targets.map(s => getFormattedNumber(s.mobile, 'tel')).join(',');
            navigator.clipboard.writeText(numbers).then(() => showToast(`${targets.length} টি নম্বর কপি করা হয়েছে!`));
        }

        function updateClassSuggestions() {
            const dl = document.getElementById('class-suggestions');
            if (!dl) return;
            dl.innerHTML = classes.map(c => `<option value="${c}">`).join('');
        }
        function setupSearch() { document.getElementById('search-input').addEventListener('input', renderStudents); }
        function openAddModal(uid = null) {
            const modal = document.getElementById('student-modal');
            if (!modal) return;

            // Reset form
            document.getElementById('student-form').reset();
            const previewPhoto = document.getElementById('preview-photo');
            if (previewPhoto) previewPhoto.src = 'https://via.placeholder.com/150';

            updateFixedFieldVisibility();
            updateClassSuggestions();

            if (uid) {
                // EDIT MODE - Load student data
                const s = students.find(st => st.uid === uid);
                if (!s) return;

                document.getElementById('edit-uid').value = uid;
                document.getElementById('modal-title').innerText = "তথ্য পরিবর্তন করুন";
                if (document.getElementById('submit-btn')) document.getElementById('submit-btn').innerText = "আপডেট করুন";

                // Helper to safely set values only if element exists
                const setVal = (id, val) => {
                    const el = document.getElementById(id);
                    if (el) el.value = val || '';
                };

                // Merge student data with custom fields for pre-population in renderCustomFieldInputs
                const mergedData = {
                    ...s,
                    ...(s.custom_fields || {})
                };
                renderCustomFieldInputs(mergedData);

                // NOW populate basic fields safely
                setVal('inp-name', s.name);
                setVal('inp-class', s.class);
                const m = splitMobile(s.mobile || '+88');
                setVal('inp-mobile-code', m.code);
                setVal('inp-mobile-number', m.number);
                setVal('inp-roll', s.roll);
                setVal('inp-id', s.id);
                setVal('inp-father', s.fathersName || s.father);
                setVal('inp-mother', s.mothersName || s.mother);
                setVal('inp-notes', s.notes);

                // Status
                const statusToggle = document.getElementById('inp-status');
                if (statusToggle) {
                    statusToggle.checked = (s.status || 'active') === 'active';
                    toggleAutoGenerate();
                }

                // Disable auto-generate in edit mode
                const autoGenCheck = document.getElementById('auto-gen-check');
                if (autoGenCheck) {
                    autoGenCheck.checked = false;
                    toggleAutoGenerate();
                }

            } else {
                // ADD MODE - New student
                document.getElementById('edit-uid').value = '';
                document.getElementById('modal-title').innerText = "নতুন শিক্ষার্থী যোগ";
                if (document.getElementById('submit-btn')) document.getElementById('submit-btn').innerText = "সংরক্ষণ করুন";

                renderCustomFieldInputs();

                // Set class from filter
                const classInput = document.getElementById('inp-class');
                if (classInput) {
                    if (currentFilter !== 'All') {
                        classInput.value = currentFilter;
                        classInput.classList.add('bg-indigo-50');
                    } else {
                        classInput.value = '';
                        classInput.classList.remove('bg-indigo-50');
                    }
                }

                // Auto-generate next ID
                const maxId = students.reduce((max, s) => {
                    const id = parseInt(s.id);
                    return !isNaN(id) && id > max ? id : max;
                }, 0);
                const digitLimit = instituteInfo.idLimit || 3;
                const nextId = String(maxId + 1).padStart(digitLimit, '0');
                const idInput = document.getElementById('inp-id');
                if (idInput) idInput.value = nextId;

                const autoGenCheck = document.getElementById('auto-gen-check');
                if (autoGenCheck) {
                    autoGenCheck.checked = false;
                    toggleAutoGenerate();
                }

                // Load draft only in add mode
                loadDraft();
            }

            modal.classList.remove('hidden');
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }
        function openStudentModal() { openAddModal(); }
        function closeStudentModal() { document.getElementById('student-modal').classList.add('hidden'); }

        function printStudentForm() {
            const originalForm = document.getElementById('student-form');
            if (!originalForm) return;

            const formClone = originalForm.cloneNode(true);
            const originalInputs = originalForm.querySelectorAll('input, select, textarea');
            const cloneInputs = formClone.querySelectorAll('input, select, textarea');

            // Sync values to cloned form
            for (let i = 0; i < originalInputs.length; i++) {
                const type = originalInputs[i].type;
                if (type === 'checkbox' || type === 'radio') {
                    if (originalInputs[i].checked) cloneInputs[i].setAttribute('checked', 'checked');
                } else if (originalInputs[i].tagName === 'SELECT') {
                    const val = originalInputs[i].value;
                    const option = cloneInputs[i].querySelector('option[value="' + val + '"]');
                    if (option) option.setAttribute('selected', 'selected');
                    cloneInputs[i].value = val;
                } else {
                    cloneInputs[i].setAttribute('value', originalInputs[i].value);
                    if (originalInputs[i].tagName === 'TEXTAREA') cloneInputs[i].innerText = originalInputs[i].value;
                }
            }

            const title = document.getElementById('modal-title').innerText;
            const printWindow = window.open('', '', 'width=900,height=700');
            printWindow.document.write(`
                <html>
                <head>
                    <title>${title}</title>
                    <script src="https://cdn.tailwindcss.com"></` + `script>
                    <style>
                        /* Force browsers to print background colors and styles */
                        * {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                            color-adjust: exact !important;
                        }
                        
                        body { 
                            padding: 40px;
                            background: white !important;
                        }
                        
                        h1, h2 { text-align: center; }
                        
                        /* Preserve all form element styling */
                        input, select, textarea { 
                            border: 1px solid #ccc !important; 
                            border-radius: 4px !important; 
                            background: #fff !important;
                            color: #000 !important;
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                        
                        /* Hide buttons and no-print elements */
                        button, .no-print { display: none !important; }
                        
                        /* Ensure all backgrounds, borders, and colors are preserved */
                        @media print {
                            * {
                                -webkit-print-color-adjust: exact !important;
                                print-color-adjust: exact !important;
                            }
                            
                            /* Preserve backgrounds */
                            div, span, label, input, select, textarea {
                                background-color: inherit !important;
                                border-color: inherit !important;
                                color: inherit !important;
                            }
                        }
                    </style>
                </head>
                <body>
                    <h1 class="text-3xl font-bold mb-2">${instituteInfo.name || 'Student Form'}</h1>
                    <h2 class="text-xl text-gray-600 mb-8">${title}</h2>
                    <div class="max-w-3xl mx-auto">
                        ${formClone.innerHTML}
                    </div>
                    <script>
                        setTimeout(() => { window.print(); window.close(); }, 500);
                    </` + `script>
                </body>
                </html>
            `);
            printWindow.document.close();
        }

        function printCurrentDashboardReport() {
            const panelContent = document.getElementById('dash-panel-content');

            if (!panelContent) return;

            // Clone the content exactly as it appears
            const contentClone = panelContent.cloneNode(true);

            // Open print window
            const printWindow = window.open('', '', 'width=900,height=700');
            printWindow.document.write(`
                <html>
                <head>
                    <title>রিপোর্ট প্রিন্ট</title>
                    <script src="https://cdn.tailwindcss.com"></` + `script>
                    <link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">
                    <style>
                        /* Force browsers to print background colors and styles */
                        * {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                            color-adjust: exact !important;
                        }
                        
                        body { 
                            font-family: 'SolaimanLipi', sans-serif;
                            margin: 0;
                            padding: 0;
                            background: white !important;
                        }
                        
                        /* Table styling - black borders, white backgrounds */
                        table {
                            border: 1px solid black !important;
                            background: white !important;
                        }
                        
                        th, td {
                            border: 1px solid black !important;
                            background: white !important;
                            background-color: white !important;
                        }
                        
                        th {
                            background: black !important;
                            background-color: black !important;
                            color: white !important;
                            font-weight: bold !important;
                        }
                        
                        /* Prevent page breaks inside tables and sections */
                        table, .class-section, .report-section {
                            page-break-inside: avoid;
                            break-inside: avoid;
                        }
                        
                        /* Preserve all styling exactly as in preview */
                        @media print {
                            .no-print {
                                display: none !important;
                            }
                            * {
                                -webkit-print-color-adjust: exact !important;
                                print-color-adjust: exact !important;
                            }
                            
                            /* Force table borders and backgrounds to black/white */
                            table {
                                border: 1px solid black !important;
                                background: white !important;
                            }
                            
                            th, td {
                                border: 1px solid black !important;
                                background: white !important;
                                background-color: white !important;
                            }
                            
                            th {
                                background: black !important;
                                background-color: black !important;
                                color: white !important;
                                font-weight: bold !important;
                            }
                            
                            /* Keep tables together on one page if they fit */
                            table, .class-section, .report-section {
                                page-break-inside: avoid;
                                break-inside: avoid;
                            }
                            
                            @page {
                                margin: 10mm;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="no-print" style="padding: 10px; background: #fffbeb; border-bottom: 1px solid #fef3c7; display: flex; justify-content: space-between; align-items: center; font-family: sans-serif; font-size: 13px; color: #92400e;">
                        <span>প্রিন্ট উইন্ডো চালু হয়েছে। প্রিন্ট শেষে উইন্ডোটি বন্ধ করতে পারেন।</span>
                        <button onclick="window.close()" style="padding: 5px 12px; background: #d97706; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">বন্ধ করুন</button>
                    </div>
                    <div style="padding: 20px;">
                        ${contentClone.innerHTML}
                    </div>
                    <script>
                        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                        setTimeout(() => { 
                            window.print(); 
                            if (!isMobile) {
                                window.close(); 
                            }
                        }, 800);
                        window.addEventListener('afterprint', () => {
                            window.close();
                        });
                    </` + `script>
                </body>
                </html>
            `);
            printWindow.document.close();
        }

        function closeDashboardReportPreview() {
            const panel = document.getElementById('report-preview-side-panel');
            if (panel) {
                panel.classList.add('translate-x-full');
            }
        }

        function openImportModal() {
            document.getElementById('import-modal').classList.remove('hidden');
            if (currentFilter !== 'All') document.getElementById('import-target-class').value = currentFilter;
        }
        function closeImportModal() { document.getElementById('import-modal').classList.add('hidden'); }
        function closeFieldModal() { document.getElementById('field-selector-modal').classList.add('hidden'); }
        function closeBulkFeeModal() { document.getElementById('bulk-fee-modal').classList.add('hidden'); }

        function openSettingsModal() {
            openModal('settings-modal');
            const savedTheme = localStorage.getItem('appTheme') || 'light';
            const themeSelect = document.getElementById('app-theme-select');
            if (themeSelect) themeSelect.value = savedTheme;
        }

        function changeAppTheme(theme) {
            localStorage.setItem('appTheme', theme);
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            if (typeof showToast === 'function') {
                showToast('থিম ' + theme + ' এ পরিবর্তন করা হয়েছে (ফুল ডার্ক মোড সিএসএস সাপোর্ট লাগতে পারে)');
            }
        }

        // Initialize Theme on load
        (function initTheme() {
            const savedTheme = localStorage.getItem('appTheme') || 'light';
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            }
        })();

        function openModal(id) {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }
        }
        function closeModal(id) {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        }
        function showToast(message) {
            const toast = document.getElementById('toast'); toast.textContent = message; toast.classList.remove('opacity-0', 'pointer-events-none');
            setTimeout(() => { toast.classList.add('opacity-0', 'pointer-events-none'); }, 3000);
        }
        window.onclick = function (event) { if (event.target.classList.contains('fixed')) event.target.classList.add('hidden'); }

        // Fees Page Functions and duplicates removed
        // (Moved to top)

        function switchFeesPageTab(tab) {
            const collectionBtn = document.getElementById('fees-tab-collection');
            const manageBtn = document.getElementById('fees-tab-manage');
            const collectionContent = document.getElementById('fees-content-collection');
            const manageContent = document.getElementById('fees-content-manage');
            const drawer = document.getElementById('fees-top-drawer');
            const handle = document.getElementById('fees-top-drawer-handle');

            if (tab === 'collection') {
                collectionBtn.classList.add('border-green-600', 'text-green-600');
                collectionBtn.classList.remove('border-transparent', 'text-gray-500');
                manageBtn.classList.remove('border-green-600', 'text-green-600');
                manageBtn.classList.add('border-transparent', 'text-gray-500');
                collectionContent.classList.remove('hidden');
                manageContent.classList.add('hidden');
                if (drawer) drawer.classList.add('-translate-y-full'); // Reset drawer
                if (handle) handle.classList.add('hidden'); // Hide handle in collection tab
                document.getElementById('fees-manage-tab-actions')?.classList.add('hidden');
                renderFeesClassColumns();
            } else {
                manageBtn.classList.add('border-green-600', 'text-green-600');
                manageBtn.classList.remove('border-transparent', 'text-gray-500');
                collectionBtn.classList.remove('border-green-600', 'text-green-600');
                collectionBtn.classList.add('border-transparent', 'text-gray-500');
                collectionContent.classList.add('hidden');
                manageContent.classList.remove('hidden');
                if (handle) handle.classList.remove('hidden'); // Show handle in manage tab
                document.getElementById('fees-manage-tab-actions')?.classList.remove('hidden');
                renderFeeTypesGrid();
            }

            setTimeout(() => lucide.createIcons(), 10);
        }

        let isFeesTopDrawerOpen = false;
        function toggleFeesTopDrawer() {
            const drawer = document.getElementById('fees-top-drawer');
            const arrow = document.getElementById('fees-top-drawer-arrow');
            if (!drawer) return;

            isFeesTopDrawerOpen = !isFeesTopDrawerOpen;
            if (isFeesTopDrawerOpen) {
                drawer.classList.remove('-translate-y-full');
                drawer.classList.add('translate-y-0');
                if (arrow) arrow.setAttribute('data-lucide', 'chevron-up');
                renderFeesTopDrawerTrashList(); // Update list on open
            } else {
                drawer.classList.add('-translate-y-full');
                drawer.classList.remove('translate-y-0');
                if (arrow) arrow.setAttribute('data-lucide', 'chevron-down');
            }
            lucide.createIcons();
        }

        function renderFeesTopDrawerTrashList() {
            const container = document.getElementById('fees-trash-list-container');
            if (!container) return;

            const trashItems = feeTypes.filter(f => f.deletedAt);

            if (trashItems.length === 0) {
                container.innerHTML = `
                    <div class="text-center text-gray-400 py-8 flex flex-col items-center">
                        <i data-lucide="trash-2" class="w-8 h-8 opacity-20 mb-2"></i>
                        <p class="text-xs font-bold">ট্র্যাশ খালি</p>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
                        ${trashItems.map(item => {
                    const delDate = new Date(item.deletedAt);
                    const expiryDate = new Date(delDate.getTime() + (7 * 24 * 60 * 60 * 1000));
                    const daysLeft = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));

                    return `
                                <div class="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm group hover:border-rose-100 transition-colors">
                                    <div class="flex-1 min-w-0">
                                        <h4 class="font-bold text-gray-800 truncate text-sm">${item.name}</h4>
                                        <p class="text-[10px] text-rose-500 font-bold">${daysLeft} দিন বাকি</p>
                                    </div>
                                    <div class="flex gap-2 shrink-0">
                                        <button onclick="restoreFeeType('${item.id}'); renderFeesTopDrawerTrashList();" 
                                            class="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition" title="Restore">
                                            <i data-lucide="refresh-ccw" class="w-3.5 h-3.5"></i>
                                        </button>
                                        <button onclick="permanentDeleteFeeType('${item.id}'); renderFeesTopDrawerTrashList();" 
                                            class="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Delete Forever">
                                            <i data-lucide="x" class="w-3.5 h-3.5"></i>
                                        </button>
                                    </div>
                                </div>
                            `;
                }).join('')}
                    </div>
                `;
            }
            lucide.createIcons();
        }

        let currentFeesFilter = 'All'; // Track selected class in fees page

        function renderFeesClassColumns() {
            renderFeesClassFilters();
            renderFeesStudentGrid();
        }

        function renderFeesClassFilters() {
            const container = document.getElementById('fees-class-filters');
            if (!container) return;

            const allClasses = ['All', ...classes];

            container.innerHTML = `
                <button onclick="toggleAdvancedFilterMenu()"
                    class="p-2 bg-indigo-50 text-indigo-500 hover:bg-indigo-100 rounded-full transition-all duration-300 border border-indigo-100 flex items-center justify-center relative shrink-0"
                    title="অ্যাডভান্সড ফিল্টার">
                    <i data-lucide="filter" class="w-4 h-4"></i>
                    <span class="filter-active-dot absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full border border-white ${(currentAdvFeeFilter || currentAdvStatusFilter !== 'all') ? '' : 'hidden'}"></span>
                </button>
                ` + allClasses.map(cls => `
                <button onclick="selectFeesClass('${cls}')"
                    class="fees-filter px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition ${currentFeesFilter === cls
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 border hover:bg-green-50'
                }">
                    ${cls}
                </button>
            `).join('');
        }

        // Initialize Payments
        let feePayments = JSON.parse(localStorage.getItem(STORAGE_KEYS.feePayments)) || [];
        let pendingPayment = null;
        let currentExcludedAllocationIds = [];

        // --- Restored Functions ---
        function wasStudentActive(student, date) {
            if (!student.statusHistory || student.statusHistory.length === 0) {
                return (student.status || 'active') === 'active';
            }

            const targetTime = date.getTime();
            let effectiveStatus = 'active';

            // Convert and sort history to ensure we use numbers for comparison
            const history = student.statusHistory.map(h => ({
                ...h,
                date: isNaN(h.date) ? new Date(h.date).getTime() : parseFloat(h.date)
            })).sort((a, b) => a.date - b.date);

            for (const entry of history) {
                if (entry.date <= targetTime) {
                    effectiveStatus = entry.status;
                } else {
                    break;
                }
            }
            return effectiveStatus === 'active';
        }

        function calculateStudentFinancials(student, calculationDate) {
            let totalDue = 0;
            let feeDetails = [];

            const banglaMonths = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
            const toBanglaNum = (n) => n.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);

            const today = calculationDate ? new Date(calculationDate) : new Date();

            // Helper to get waiver amount safely checking Item, FeeName, and FeeID
            const getWaiver = (itemId, feeName, feeId) => {
                if (!student.waivers) return 0;
                const val = student.waivers[itemId] || student.waivers[feeName] || student.waivers[feeId];
                return val ? parseFloat(val) : 0;
            };

            // 1. Determine all applicable fee items (considering status and overrides)
            feeTypes.forEach(fee => {
                if (fee.deletedAt) return; // Skip soft-deleted fees
                if (fee.type === 'optional' && (!student.optionalFees || !student.optionalFees.includes(fee.id))) return;
                if (!fee.classFees[student.class]) return;

                const rate = parseFloat(fee.classFees[student.class]);
                const startDate = new Date(fee.startDate);
                // Fix: dynamic end date should default to calculation date (today) if not set, 
                // allowing future projections.
                const endDate = fee.endDate ? new Date(fee.endDate) : new Date(today);
                const calcDate = endDate < today ? endDate : today;

                if (calcDate < startDate) return;

                let items = [];
                let feeTotal = 0;
                let current = new Date(startDate);

                if (fee.type === 'one_time' || fee.type === 'optional') {
                    if (wasStudentActive(student, startDate)) {
                        items.push({
                            label: fee.type === 'one_time' ? 'এককালীন' : 'ঐচ্ছিক',
                            amount: rate,
                            id: fee.id + '-0',
                            periodKey: fee.id + '-0',
                            year: startDate.getFullYear(),
                            month: startDate.getMonth(),
                            sortDate: startDate.getTime() // For sorting
                        });
                        feeTotal = rate;
                    }
                } else if (fee.type === 'monthly') {
                    const dueDay = fee.dueDay || 1;
                    const daysBefore = fee.daysBefore || 0;
                    let count = 0;

                    while (current <= calcDate) {
                        const currentMonthDueDate = new Date(current.getFullYear(), current.getMonth(), dueDay);
                        const notificationDate = new Date(currentMonthDueDate);
                        notificationDate.setDate(notificationDate.getDate() - daysBefore);

                        if (today >= notificationDate) {
                            const monthKey = `${current.getFullYear()}-${current.getMonth()}`;
                            const override = student.feeOverrides && student.feeOverrides[`${fee.id}-${monthKey}`];

                            // --- Pro-rated Logic (Custom Threshold) ---
                            let factor = 0;
                            const threshold = student.proRateThreshold || 10;
                            const year = current.getFullYear();
                            const month = current.getMonth();
                            const d1 = new Date(year, month, 1, 0, 0, 0);
                            const dThresholdEnd = new Date(year, month, threshold, 23, 59, 59);
                            const dThresholdNextStart = new Date(year, month, threshold + 1, 0, 0, 0);
                            const dEnd = new Date(year, month + 1, 0, 23, 59, 59);
                            const checkEnd = dEnd < today ? dEnd : today;

                            const activeAtStart = wasStudentActive(student, d1);
                            const history = student.statusHistory || [];

                            const hasActiveInA = activeAtStart || history.some(h => {
                                const hTime = isNaN(h.date) ? new Date(h.date).getTime() : parseFloat(h.date);
                                return hTime >= d1.getTime() && hTime <= dThresholdEnd.getTime() && h.status === 'active';
                            });

                            const hasActiveInB = wasStudentActive(student, dThresholdNextStart) || history.some(h => {
                                const hTime = isNaN(h.date) ? new Date(h.date).getTime() : parseFloat(h.date);
                                return hTime >= dThresholdNextStart.getTime() && hTime <= checkEnd.getTime() && h.status === 'active';
                            });

                            if (activeAtStart) {
                                factor = hasActiveInB ? 1.0 : 0.5;
                            } else {
                                if (hasActiveInA) factor = 1.0;
                                else if (hasActiveInB) factor = 0.5;
                                else factor = 0;
                            }

                            if (factor > 0 || override !== undefined) {
                                const amount = override !== undefined ? parseFloat(override) : (rate * factor);
                                items.push({
                                    label: `${banglaMonths[current.getMonth()]} '${toBanglaNum(current.getFullYear().toString().slice(-2))}`,
                                    amount: amount,
                                    id: `${fee.id}-${monthKey}`,
                                    periodKey: `${fee.id}-${monthKey}`,
                                    year: current.getFullYear(),
                                    month: current.getMonth(),
                                    isManual: override !== undefined,
                                    isProRated: factor === 0.5,
                                    sortDate: new Date(current).getTime() // For sorting
                                });
                                feeTotal += amount;
                                count++;
                            }
                        }
                        current.setMonth(current.getMonth() + 1);
                        current.setDate(1);
                        if (count > 120) break;
                    }
                } else if (fee.type === 'weekly') {
                    let weekNum = 1;
                    let count = 0;
                    while (current <= calcDate) {
                        if (wasStudentActive(student, current)) {
                            items.push({
                                label: `সপ্তাহ ${toBanglaNum(weekNum)}`,
                                amount: rate,
                                id: `${fee.id}-W${weekNum}`,
                                periodKey: `${fee.id}-W${weekNum}`,
                                year: current.getFullYear(),
                                month: current.getMonth()
                            });
                            feeTotal += rate;
                            count++;
                        }
                        current.setDate(current.getDate() + 7);
                        weekNum++;
                        if (count > 520) break;
                    }
                } else if (fee.type === 'yearly') {
                    let count = 0;
                    while (current.getFullYear() <= calcDate.getFullYear()) {
                        if (wasStudentActive(student, current)) {
                            items.push({
                                label: `${toBanglaNum(current.getFullYear())} ইং`,
                                amount: rate,
                                id: `${fee.id}-Y${current.getFullYear()}`,
                                periodKey: `${fee.id}-Y${current.getFullYear()}`,
                                year: current.getFullYear(),
                                month: current.getMonth()
                            });
                            feeTotal += rate;
                            count++;
                        }
                        current.setFullYear(current.getFullYear() + 1);
                        if (count > 20) break;
                    }
                } else if (fee.type === 'semester') {
                    let semNum = 1;
                    let count = 0;
                    while (current <= calcDate) {
                        if (wasStudentActive(student, current)) {
                            items.push({
                                label: `সেমিস্টার ${toBanglaNum(semNum)}`,
                                amount: rate,
                                id: `${fee.id}-S${semNum}`,
                                periodKey: `${fee.id}-S${semNum}`,
                                year: current.getFullYear(),
                                month: current.getMonth()
                            });
                            feeTotal += rate;
                            count++;
                        }
                        current.setMonth(current.getMonth() + 6);
                        semNum++;
                        if (count > 40) break;
                    }
                }

                if (items.length > 0) {
                    feeDetails.push({
                        id: fee.id,
                        name: fee.name,
                        rate: rate,
                        total: feeTotal,
                        items: items
                    });
                    totalDue += feeTotal;
                }
            });

            // 2. Process Payments (Only up to the calculationDate)
            const studentPayments = (feePayments || []).filter(p => {
                if (p.uid !== student.uid || p.deleted) return false;
                const pDate = new Date(p.date || 0);
                if (pDate > today) return false;
                return true;
            });
            const totalPaid = studentPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
            const paidAmountsMap = {};

            studentPayments.forEach(payment => {
                if (payment.details && payment.details.allocated) {
                    payment.details.allocated.forEach(alloc => {
                        const targetId = alloc.itemId || alloc.id || alloc.feeId;
                        if (targetId) {
                            paidAmountsMap[targetId] = (paidAmountsMap[targetId] || 0) + parseFloat(alloc.amount);
                        }
                    });
                }
            });

            // FIFO Allocation for unallocated funds
            const accountedPaidTotal = Object.values(paidAmountsMap).reduce((sum, val) => sum + val, 0);
            let unallocated = totalPaid - accountedPaidTotal;

            if (unallocated > 0) {
                for (const fee of feeDetails) {
                    for (const item of fee.items) {
                        const paid = paidAmountsMap[item.id] || 0;
                        const waiver = getWaiver(item.id, fee.name, fee.id);
                        const due = Math.max(0, item.amount - waiver - paid);

                        if (due > 0 && unallocated > 0) {
                            const pay = Math.min(unallocated, due);
                            paidAmountsMap[item.id] = paid + pay;
                            unallocated -= pay;
                        }
                    }
                }
            }

            // REDISTRIBUTE OVERPAYMENTS: If any item is overpaid (Paid > Amount - Waiver), 
            // the excess should be pulled back into the redistribution pool.
            let excessPool = unallocated; // Start with remaining advance
            Object.entries(paidAmountsMap).forEach(([id, paidVal]) => {
                let itemDef = null;
                let feeDef = null;
                for (const f of feeDetails) {
                    itemDef = f.items.find(i => i.id === id);
                    if (itemDef) { feeDef = f; break; }
                }

                if (itemDef) {
                    const waiver = getWaiver(id, feeDef.name, feeDef.id);
                    const netRate = Math.max(0, itemDef.amount - waiver);
                    if (paidVal > netRate + 0.01) {
                        excessPool += (paidVal - netRate);
                        paidAmountsMap[id] = netRate;
                    }
                } else {
                    // ID no longer exists or doesn't belong to current fee items -> RECLAIM AS FLOATING
                    excessPool += paidVal;
                    paidAmountsMap[id] = 0;
                }
            });

            // Second pass: Apply the excess pool to any remaining dues
            if (excessPool > 0.01) {
                for (const fee of feeDetails) {
                    for (const item of fee.items) {
                        const paid = paidAmountsMap[item.id] || 0;
                        const waiver = getWaiver(item.id, fee.name, fee.id);
                        const due = Math.max(0, item.amount - waiver - paid);

                        if (due > 0.01 && excessPool > 0) {
                            const apply = Math.min(excessPool, due);
                            paidAmountsMap[item.id] = paid + apply;
                            excessPool -= apply;
                        }
                    }
                }
            }

            // 3. Final Calculations for return object
            let finalFeeDetails = feeDetails.map(fee => {
                let feePaidTotal = 0;
                let fullyPaidCount = 0;
                const unpaidItems = [];
                const partialItems = [];

                fee.items.forEach(item => {
                    const feeId = item.id;
                    // Standardize waiver check (supports both item-specific and global fee names)
                    const waiverAmount = getWaiver(feeId, fee.name, fee.id);
                    const paidForItem = (paidAmountsMap[feeId] || 0) + waiverAmount;

                    feePaidTotal += paidForItem;

                    if (paidForItem >= item.amount - 0.01) {
                        fullyPaidCount++;
                    } else if (paidForItem > 0.01) {
                        partialItems.push({
                            label: item.label,
                            remaining: item.amount - paidForItem,
                            paid: paidAmountsMap[feeId] || 0,
                            totalRate: item.amount,
                            waiver: waiverAmount,
                            periodKey: item.periodKey,
                            id: feeId
                        });
                    } else {
                        unpaidItems.push({
                            label: item.label,
                            id: feeId,
                            amount: item.amount,
                            periodKey: item.periodKey
                        });
                    }
                });

                return {
                    id: fee.id,
                    name: fee.name,
                    rate: fee.rate,
                    total: fee.total,
                    paid: feePaidTotal,
                    balance: Math.max(0, fee.total - feePaidTotal),
                    fullyPaidCount: fullyPaidCount,
                    unpaidItems: unpaidItems,
                    partialItems: partialItems,
                    items: fee.items // for UI rendering
                };
            });

            // 4. NEW: Create a set of all valid item IDs for verification
            const validItemIds = new Set();
            finalFeeDetails.forEach(f => f.items.forEach(i => validItemIds.add(i.id)));

            // 5. Final Redistribution Pass: Apply ANY remaining floating funds (Double check)
            let distributedTotal = 0;
            Object.entries(paidAmountsMap).forEach(([id, val]) => { if (validItemIds.has(id)) distributedTotal += val; });
            let pool = totalPaid - distributedTotal;

            if (pool > 0.01) {
                for (const fee of finalFeeDetails) {
                    if (pool <= 0) break;
                    for (const item of fee.items) {
                        const currentPaid = paidAmountsMap[item.id] || 0;
                        const waiver = getWaiver(item.id, fee.name, fee.id);
                        const netDue = Math.max(0, item.amount - waiver - currentPaid);
                        if (netDue > 0.01) {
                            const apply = Math.min(pool, netDue);
                            paidAmountsMap[item.id] = currentPaid + apply;
                            pool -= apply;
                        }
                    }
                }
            }

            // 7. Final Sync Pass: Ensure all calculated properties reflect the final paidAmountsMap
            const payableItems = [];
            let recalWaiverTotal = 0;

            finalFeeDetails.forEach(fee => {
                let paidTotalForFee = 0;
                let fullyPaidCount = 0;
                fee.unpaidItems = [];
                fee.partialItems = [];
                fee.waiver = 0; // Initialize waiver for this fee

                fee.items.forEach(item => {
                    const waiver = getWaiver(item.id, fee.name, fee.id);
                    const cashPaid = paidAmountsMap[item.id] || 0;
                    const totalApplied = cashPaid + waiver;

                    paidTotalForFee += totalApplied;
                    recalWaiverTotal += waiver;
                    fee.waiver += waiver; // Accumulate waiver for the fee

                    const itemRemaining = Math.max(0, item.amount - totalApplied);
                    item.paid = totalApplied;
                    item.cashPaid = cashPaid;
                    item.remaining = itemRemaining;
                    item.waiverApplied = waiver;

                    if (itemRemaining > 0.01) {
                        payableItems.push({
                            feeId: fee.id,
                            feeName: fee.name,
                            itemId: item.id,
                            itemLabel: item.label,
                            remaining: itemRemaining,
                            waiver: waiver,
                            sortDate: item.sortDate
                        });
                    }

                    if (totalApplied >= item.amount - 0.01) {
                        fullyPaidCount++;
                    } else if (totalApplied > 0.01) {
                        fee.partialItems.push({
                            label: item.label,
                            remaining: itemRemaining,
                            paid: cashPaid,
                            totalRate: item.amount,
                            waiver: waiver,
                            periodKey: item.periodKey,
                            id: item.id
                        });
                    } else {
                        fee.unpaidItems.push({
                            label: item.label,
                            id: item.id,
                            amount: item.amount,
                            waiver: waiver,
                            periodKey: item.periodKey
                        });
                    }
                });

                fee.paid = paidTotalForFee;
                fee.balance = Math.max(0, fee.total - paidTotalForFee);
                fee.fullyPaidCount = fullyPaidCount;
            });

            const finalWaiverTotal = recalWaiverTotal;
            const finalBalance = Math.max(0, totalDue - totalPaid - finalWaiverTotal);
            const finalAdvance = Math.max(0, (totalPaid + finalWaiverTotal) - totalDue);

            return {
                totalDue,
                totalPaid,
                totalWaiver: finalWaiverTotal,
                balance: finalBalance,
                advance: finalAdvance,
                details: finalFeeDetails,
                payments: studentPayments,
                payableItems: payableItems
            };
        }

        async function setFeeOverride(studentUid, feeId, periodKey, periodLabel) {
            const s = students.find(st => st.uid === studentUid);
            if (!s) return;

            const fee = feeTypes.find(f => f.id === feeId);
            const defaultRate = fee ? parseFloat(fee.classFees[s.class] || 0) : 0;
            const currentOverride = s.feeOverrides ? s.feeOverrides[`${feeId}-${periodKey}`] : undefined;
            const currentAmount = currentOverride !== undefined ? currentOverride : defaultRate;

            const newAmount = await customPrompt(`"${periodLabel}" এর জন্য একটি নতুন টাকার পরিমাণ লিখুন (০ দিলে ফি মাফ হবে):`, currentAmount, 'ফি অ্যাডজাস্টমেন্ট (Override)');

            if (newAmount !== null && newAmount.trim() !== '') {
                const amount = parseFloat(newAmount);
                if (isNaN(amount)) return showToast("অবৈধ সংখ্যা");

                if (!s.feeOverrides) s.feeOverrides = {};

                if (amount === defaultRate) {
                    delete s.feeOverrides[`${feeId}-${periodKey}`];
                } else {
                    s.feeOverrides[`${feeId}-${periodKey}`] = amount;
                }

                saveData();
                showToast(`"${periodLabel}" এর ফি অ্যাডজাস্ট করা হয়েছে`);
                renderFeesStudentGrid();
            }
        }

        let expandedFeeStudent = null;

        function selectFeesClass(className) {
            currentFeesFilter = className;
            expandedFeeStudent = null;
            renderFeesClassFilters();
            renderFeesStudentGrid();

            // Smooth scroll to active filter (Mobile "Perfect" Feel)
            setTimeout(() => {
                const container = document.getElementById('fees-class-filters');
                if (!container) return;

                // Find the button (it will have the active green class)
                const activeBtn = container.querySelector('.bg-green-600');
                if (activeBtn) {
                    activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
            }, 50);
        }

        function renderFeesStudentGrid() {
            const container = document.getElementById('fees-students-grid');
            if (!container) return;

            // Search Filter
            const searchVal = (document.getElementById('student-search')?.value || '').toLowerCase();

            let filtered = currentFeesFilter === 'All'
                ? students
                : students.filter(s => s.class === currentFeesFilter);

            // Apply Search Filtering if query exists
            if (searchVal) {
                filtered = filtered.filter(s => {
                    const nameVal = String(s.name || '').toLowerCase();
                    const idVal = String(s.id || '').toLowerCase();
                    const rollVal = String(s.roll || '').toLowerCase();
                    const mobileVal = String(s.mobile || '');
                    const classVal = String(s.class || '').toLowerCase();

                    let customFieldsText = '';
                    if (s.custom_fields) {
                        customFieldsText = Object.values(s.custom_fields).join(' ').toLowerCase();
                    }

                    return nameVal.includes(searchVal) ||
                        idVal.includes(searchVal) ||
                        rollVal.includes(searchVal) ||
                        mobileVal.includes(searchVal) ||
                        classVal.includes(searchVal) ||
                        customFieldsText.includes(searchVal);
                });
            }

            // Advanced Filter Logic
            if (currentAdvStatusFilter !== 'all' || currentAdvFeeFilter) {
                filtered = filtered.filter(s => {
                    const financials = calculateStudentFinancials(s);

                    if (currentAdvFeeFilter) {
                        const feeItem = financials.details.find(f => f.name === currentAdvFeeFilter);
                        if (!feeItem) return false;

                        if (currentAdvStatusFilter === 'paid') {
                            return feeItem.balance <= 0;
                        } else if (currentAdvStatusFilter === 'unpaid') {
                            return feeItem.balance > 0;
                        } else if (currentAdvStatusFilter === 'partial') {
                            return feeItem.paid > 0 && feeItem.balance > 0;
                        } else if (currentAdvStatusFilter === 'advance') {
                            return financials.advance > 0;
                        } else if (currentAdvStatusFilter === 'waiver') {
                            return (feeItem.waiver || 0) > 0;
                        }
                    } else {
                        if (currentAdvStatusFilter === 'paid') {
                            return financials.balance <= 0;
                        } else if (currentAdvStatusFilter === 'unpaid') {
                            return financials.balance > 0;
                        } else if (currentAdvStatusFilter === 'partial') {
                            return financials.totalPaid > 0 && financials.balance > 0;
                        } else if (currentAdvStatusFilter === 'advance') {
                            return financials.advance > 0;
                        } else if (currentAdvStatusFilter === 'waiver') {
                            return financials.totalWaiver > 0;
                        }
                    }
                    return true;
                });
            }

            // Apply Sorting
            const key = window.studentSortConfig.key || 'id';
            const dir = window.studentSortConfig.direction === 'asc' ? 1 : -1;

            filtered.sort((a, b) => {
                let valA, valB;

                if (key === 'id') {
                    valA = a.id || '';
                    valB = b.id || '';
                    const numA = parseFloat(valA);
                    const numB = parseFloat(valB);
                    if (!isNaN(numA) && !isNaN(numB)) {
                        return (numA - numB) * dir;
                    }
                } else if (key === 'roll') {
                    valA = parseFloat(a.roll) || 0;
                    valB = parseFloat(b.roll) || 0;
                    return (valA - valB) * dir;
                } else if (key === 'name') {
                    valA = (a.name || '').toString();
                    valB = (b.name || '').toString();
                    return valA.localeCompare(valB, 'bn') * dir;
                } else if (key === 'date') {
                    valA = a.statusHistory && a.statusHistory[0] ? a.statusHistory[0].date : (parseInt(a.uid, 36) || 0);
                    valB = b.statusHistory && b.statusHistory[0] ? b.statusHistory[0].date : (parseInt(b.uid, 36) || 0);
                    return (valA - valB) * dir;
                } else {
                    valA = (a[key] || '').toString().toLowerCase();
                    valB = (b[key] || '').toString().toLowerCase();
                }

                if (valA < valB) return -1 * dir;
                if (valA > valB) return 1 * dir;
                return 0;
            });

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center text-gray-400 py-12">
                        <i data-lucide="users" class="w-16 h-16 mx-auto mb-3 opacity-50"></i>
                        <p>কোনো শিক্ষার্থী নেই</p>
                    </div>
                `;
                setTimeout(() => lucide.createIcons(), 10);
                return;
            }

            // Using grid with responsive columns (2 on wide screens)
            if (!container.classList.contains('grid')) {
                container.classList.remove('flex', 'flex-col', 'gap-2.5');
                container.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-4', 'content-start');
            }

            // Simple scroll cleanup - removed complex translation logic that caused overlapping
            container.onscroll = null;

            container.innerHTML = filtered.map(s => {
                const isExpanded = String(expandedFeeStudent) === String(s.uid);
                const financials = calculateStudentFinancials(s);
                const isPaidClear = financials.balance <= 0;

                const isDisabled = s.status === 'disabled';
                const statusClasses = isDisabled ? 'grayscale opacity-60' : '';

                return `
                <div id="fee-card-${s.uid}" class="bg-white rounded-2xl border ${isExpanded ? 'border-indigo-500 ring-2 ring-indigo-300 ring-offset-2 shadow-xl' : 'border-gray-100 hover:border-indigo-200'} ${statusClasses} transition-all duration-300 w-full h-fit relative">
                    <div class="p-3 cursor-pointer" onclick="toggleFeeCard('${s.uid}')">
                        <div class="flex items-center gap-3">
                            <div class="relative shrink-0">
                                ${getStudentPhotoHTML(s, 'w-12 h-12')}
                                ${isPaidClear ? '<div class="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white rounded-full p-0.5 z-20 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg></div>' : ''}
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-0.5">
                                    <h4 class="font-bold text-base text-gray-900 truncate">${s.name}</h4>
                                </div>
                                <p class="text-[10px] font-medium text-gray-400 capitalize tracking-tight">${s.class} | ID: ${s.id || '-'} | Roll: ${s.roll || '-'}</p>
                            </div>
                            <div class="text-right shrink-0">
                                <p class="text-xs font-bold ${financials.advance > 0 ? 'text-indigo-600' : (isPaidClear ? 'text-green-600' : 'text-red-600')}">
                                    ${financials.advance > 0 ? `অগ্রিম: ৳${financials.advance}` : (isPaidClear ? 'পরিশোধিত' : `বকেয়া: ৳${financials.balance}`)}
                                </p>
                                <i data-lucide="chevron-${isExpanded ? 'up' : 'down'}" class="w-4 h-4 text-gray-400 mx-auto mt-1 transition-transform duration-600" style="transform: rotate(${isExpanded ? '180deg' : '0deg'})"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="overflow-hidden" style="max-height: ${isExpanded ? '1500px' : '0'}; transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1); opacity: ${isExpanded ? '1' : '0'};">
                        <div class="border-t bg-gray-50">
                            <!-- Tab Switcher for Mobile -->
                            <div class="flex border-b bg-white">
                                <button onclick="event.stopPropagation(); switchFeeGridTab('payment')" 
                                    class="flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${currentFeeGridTab === 'payment' ? 'border-green-600 text-green-600 bg-green-50/50' : 'border-transparent text-gray-400'}">
                                    পেমেন্ট (Payment)
                                </button>
                                <button onclick="event.stopPropagation(); switchFeeGridTab('waiver')" 
                                    class="flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${currentFeeGridTab === 'waiver' ? 'border-orange-600 text-orange-600 bg-orange-50/50' : 'border-transparent text-gray-400'}">
                                    মৌকুফ (Waiver)
                                </button>
                            </div>

                            ${currentFeeGridTab === 'waiver' ? `
                                <div class="p-3">
                                    ${renderWaiverTab(s, financials)}
                                </div>
                            ` : `
                                <!-- Stats -->
                                <div class="grid ${financials.advance > 0 ? 'grid-cols-3' : 'grid-cols-2'} gap-2 p-3">
                                    <div class="bg-white rounded p-2 border-l-2 border-red-500 shadow-sm">
                                        <p class="text-xs text-gray-500">মোট ধার্য</p>
                                        <p class="text-lg font-bold text-gray-800">৳${financials.totalDue}</p>
                                    </div>
                                    <div class="bg-white rounded p-2 border-l-2 border-green-500 shadow-sm">
                                        <p class="text-xs text-green-600 font-bold">মোট জমা</p>
                                        <p class="text-lg font-bold text-gray-800">৳${financials.totalPaid}</p>
                                    </div>
                                    ${financials.advance > 0 ? `
                                    <div class="bg-white rounded p-2 border-l-2 border-indigo-500 shadow-sm">
                                        <p class="text-xs text-indigo-500 font-bold">অগ্রিম জমা</p>
                                        <p class="text-lg font-bold text-indigo-600">৳${financials.advance}</p>
                                    </div>
                                    ` : ''}
                                </div>
                                
                                 <!-- Fee Breakdown -->
                                <div class="p-3">
                                    <h5 class="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">ফি বিবরণ</h5>
                                    <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
                                        ${(() => {
                        const dueDetails = financials.details.filter(f => f.balance > 0);
                        return (financials.balance <= 0 || dueDetails.length === 0)
                            ? '<p class="text-xs text-green-600 font-bold text-center py-2">✅ কোনো বকেয়া নেই (No Dues)</p>'
                            : dueDetails.map(f => `
                                                    <div class="bg-white p-2 rounded border border-gray-100">
                                                        <div class="flex justify-between items-center mb-1">
                                                            <span class="font-semibold text-sm text-gray-700">${f.name}</span>
                                                            <span class="font-bold text-sm text-gray-800">৳${f.balance}</span>
                                                        </div>
                                                        <div class="flex flex-wrap gap-1">
                                                            ${(f.unpaidItems || []).map(item => `
                                                                <div class="flex items-center gap-1 bg-gray-100 text-gray-600 rounded-full pl-2 pr-1 py-0.5 border border-gray-200">
                                                                    <span class="text-[10px] font-medium">${item.label}</span>
                                                                </div>
                                                            `).join('')}
                                                            ${(f.partialItems || []).map(item => `
                                                                <div class="flex items-center gap-1 bg-orange-50 text-orange-700 rounded-full pl-2 pr-1 py-0.5 border border-orange-200">
                                                                    <span class="text-[10px] font-medium">${item.label}: ৳${item.remaining}</span>
                                                                </div>
                                                            `).join('')}
                                                        </div>
                                                    </div>
                                                `).join('');
                    })()}
                                    </div>
                                </div>

                                <!-- Payment History -->
                                <details class="p-2 border-t border-gray-100 group">
                                    <summary class="flex justify-between items-center cursor-pointer list-none text-sm font-bold text-gray-700 uppercase tracking-wide py-1 hover:text-green-600 transition">
                                        <span>লেনদেন ইতিহাস (History)</span>
                                        <i data-lucide="chevron-down" class="w-4 h-4 transition-transform group-open:rotate-180"></i>
                                    </summary>
                                    <div class="max-h-40 overflow-y-auto space-y-2 no-scrollbar mt-2 pt-2 border-t border-gray-50">
                                        ${renderStudentTransactionHistory(s.uid)}
                                    </div>
                                </details>
                                
                                <!-- Payment Input -->
                                <div class="p-3 border-t bg-white">
                                    <label class="text-sm font-semibold text-gray-700 mb-1 block">নতুন পেমেন্ট</label>
                                    <div class="flex gap-2 mb-2">
                                        <input type="number" id="pay-list-${s.uid}" placeholder="বকেয়া: ৳${financials.balance}" 
                                            class="flex-1 px-2 py-1.5 text-sm border rounded focus:ring-2 focus:ring-green-500 outline-none">
                                        <button onclick="event.stopPropagation(); submitPayment('${s.uid}', 'pay-list-${s.uid}', this)" 
                                            class="px-3 py-1.5 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 shadow-sm">
                                            জমা
                                        </button>
                                    </div>
                                    
                                    <div class="flex gap-2">
                                        <button onclick="event.stopPropagation(); printStudentFeeReport('${s.uid}')" 
                                            class="flex-1 py-1.5 bg-gray-100 text-gray-700 rounded text-xs font-semibold hover:bg-gray-200 flex items-center justify-center gap-1">
                                            <i data-lucide="printer" class="w-3 h-3"></i> প্রিন্ট
                                        </button>
                                        <button onclick="event.stopPropagation(); shareFeeDueReport('${s.uid}')" 
                                            class="flex-1 py-1.5 bg-green-50 text-green-700 rounded text-xs font-semibold hover:bg-green-100 flex items-center justify-center gap-1">
                                            <i data-lucide="share-2" class="w-3 h-3"></i> শেয়ার
                                        </button>
                                    </div>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
                `;
            }).join('');

            setTimeout(() => lucide.createIcons(), 10);
        }

        function toggleFeeCard(uid) {
            openStudentFeeDetails(uid);
        }

        let currentDetailUid = null;
        let currentFeeGridTab = 'payment';
        let currentFeeModalTab = 'payment';

        function openStudentFeeDetails(uid) {
            const student = students.find(s => s.uid === uid);
            if (!student) return;
            showStudentFeeDetailPanel(student);
        }

        function closeFeeModal() {
            const drawer = document.getElementById('fee-details-drawer');
            const panel = document.getElementById('desktop-fee-panel-container');
            const backdrop = document.getElementById('fee-details-backdrop');

            if (panel) {
                panel.classList.remove('scale-100', 'opacity-100');
                panel.classList.add('scale-95', 'opacity-0');
            }
            if (backdrop) backdrop.style.opacity = '0';

            setTimeout(() => {
                if (drawer) drawer.classList.add('hidden');
                const content = document.getElementById('fee-details-content');
                const placeholder = document.getElementById('student-fees-placeholder');
                if (content) {
                    content.classList.add('hidden');
                    content.innerHTML = '';
                }
                if (placeholder) placeholder.classList.remove('hidden');
            }, 300);

            document.querySelectorAll('[id^="fee-card-"]').forEach(el => {
                el.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-50');
            });
            currentDetailUid = null;
        }

        function showStudentFeeDetailPanel(student) {
            currentDetailUid = student.uid;
            const drawer = document.getElementById('fee-details-drawer');
            const panelContainer = document.getElementById('desktop-fee-panel-container');
            const backdrop = document.getElementById('fee-details-backdrop');

            if (drawer) drawer.classList.remove('hidden');

            setTimeout(() => {
                if (panelContainer) {
                    panelContainer.classList.remove('scale-95', 'opacity-0');
                    panelContainer.classList.add('scale-100', 'opacity-100');
                }
                if (backdrop) backdrop.style.opacity = '1';
            }, 10);

            document.querySelectorAll('[id^="fee-card-"]').forEach(el => {
                el.classList.remove('ring-2', 'ring-indigo-500', 'bg-indigo-50');
            });
            const activeCard = document.getElementById(`fee-card-${student.uid}`);
            if (activeCard) {
                activeCard.classList.add('ring-2', 'ring-indigo-500', 'bg-indigo-50');
            }

            const container = document.getElementById('fee-details-content');
            const placeholder = document.getElementById('student-fees-placeholder');
            if (container) {
                const financials = calculateStudentFinancials(student);
                const isDesktop = window.innerWidth >= 768;
                const contentHtml = currentFeeModalTab === 'payment' ? renderPaymentTab(student, financials, isDesktop) : renderWaiverTab(student, financials);

                const isDisabled = student.status === 'disabled';
                const headerGradient = isDisabled ? 'from-gray-600 to-gray-700' : 'from-indigo-600 to-indigo-700';

                container.classList.remove('hidden');
                placeholder?.classList.add('hidden');
                container.innerHTML = `
                    <div class="h-full flex flex-col md:flex-row-reverse m-0 overflow-hidden bg-slate-50">
                        <!-- RIGHT SIDE: Actions & Profile -->
                        <div class="flex-1 md:w-[60%] flex flex-col bg-white md:border-l border-gray-100 shadow-2xl relative z-10">
                            <!-- Header (Profile) -->
                            <div class="p-4 md:p-5 bg-gradient-to-r ${headerGradient} text-white flex items-center justify-between shrink-0 relative z-[100] cursor-pointer" onclick="closeFeeModal()">
                                <div class="flex items-center gap-4">
                                    ${getStudentPhotoHTML(student, 'w-14 h-14')}
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2 mb-0.5">
                                            <h3 class="font-bold text-xl leading-tight cursor-default text-white">${student.name || 'Unknown'}</h3>
                                            <div class="flex items-center gap-2 bg-black/10 px-2 py-1 rounded-full border border-white/10 ml-1" onclick="event.stopPropagation()">
                                                <span class="text-[10px] font-black uppercase tracking-tighter text-white/80">${student.status === 'disabled' ? 'Inactive' : 'Active'}</span>
                                                <label class="toggle-switch">
                                                    <input type="checkbox" ${student.status !== 'disabled' ? 'checked' : ''} onchange="toggleStudentStatus('${student.uid}')">
                                                    <span class="toggle-slider ${student.status === 'disabled' ? 'disabled' : ''}"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <p class="text-[11px] opacity-80 cursor-default text-indigo-50/80 font-medium">${student.class || '-'} | ID: ${student.id || '-'} | Roll: ${student.roll || '-'}</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-1 relative z-[110]" onclick="event.stopPropagation()" onmousedown="event.stopPropagation()" ontouchstart="event.stopPropagation()">
                                    <!-- Desktop Only: History/Print -->
                                    <button type="button" onclick="printStudentLedger('${student.uid}')" class="hidden md:inline-flex p-1.5 hover:bg-white/20 rounded-full transition-colors" title="ইতিহাস ও প্রিন্ট">
                                        <i data-lucide="history" class="w-4.5 h-4.5 pointer-events-none"></i>
                                    </button>

                                    <!-- Desktop Only: Share & Edit -->
                                    <button type="button" onclick="shareFeeDueReport('${student.uid}')" class="hidden md:inline-flex p-1.5 hover:bg-white/20 rounded-full transition-colors" title="শেয়ার">
                                        <i data-lucide="share-2" class="w-4.5 h-4.5 pointer-events-none"></i>
                                    </button>
                                    <button type="button" onclick="editStudent('${student.uid}')" class="hidden md:inline-flex p-1.5 hover:bg-white/20 rounded-full transition-colors" title="এডিট">
                                        <i data-lucide="pencil" class="w-4.5 h-4.5 pointer-events-none"></i>
                                    </button>

                                    <!-- Mobile Only: More Menu -->
                                    <div class="relative md:hidden">
                                        <button type="button" onclick="toggleFeePanelMenu('${student.uid}')" class="p-1.5 hover:bg-white/20 rounded-full transition-colors" title="আরও অপশন">
                                            <i data-lucide="more-vertical" class="w-4.5 h-4.5 pointer-events-none"></i>
                                        </button>
                                        <!-- Dropdown -->
                                        <div id="fee-panel-menu-${student.uid}" class="hidden absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[70] origin-top-right animate-fade-in">
                                            <button type="button" onclick="printStudentLedger('${student.uid}'); toggleFeePanelMenu('${student.uid}')" class="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50">
                                                <div class="p-1.5 bg-indigo-50 text-indigo-600 rounded-full">
                                                    <i data-lucide="history" class="w-4 h-4"></i>
                                                </div>
                                                ইতিহাস ও প্রিন্ট
                                            </button>
                                            <button type="button" onclick="shareFeeDueReport('${student.uid}'); toggleFeePanelMenu('${student.uid}')" class="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50">
                                                <div class="p-1.5 bg-green-50 text-green-600 rounded-full">
                                                    <i data-lucide="share-2" class="w-4 h-4"></i>
                                                </div>
                                                শেয়ার করুন
                                            </button>
                                            <button type="button" onclick="editStudent('${student.uid}'); toggleFeePanelMenu('${student.uid}')" class="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                                <div class="p-1.5 bg-amber-50 text-amber-600 rounded-full">
                                                    <i data-lucide="pencil" class="w-4 h-4"></i>
                                                </div>
                                                এডিট প্রোফাইল
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Always Visible: Close -->
                                    <button type="button" onclick="closeFeeModal()" class="p-1.5 hover:bg-white/20 rounded-full transition-colors ml-0.5" title="বন্ধ করুন">
                                        <i data-lucide="x" class="w-5 h-5 pointer-events-none"></i>
                                    </button>
                                </div>
                            </div>
                            
                            <div class="flex-1 flex flex-col overflow-hidden bg-white">
                                <!-- Fixed Tabs -->
                                <div class="flex border-b bg-white shrink-0 relative z-[90]">
                                    <button onclick="event.stopPropagation(); switchFeeModalTab('payment')" 
                                        class="flex-1 py-3 md:py-4 text-xs md:text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${currentFeeModalTab === 'payment' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-gray-500 hover:bg-gray-50'}">
                                        পেমেন্ট (Payment)
                                    </button>
                                    <button onclick="event.stopPropagation(); switchFeeModalTab('waiver')" 
                                        class="flex-1 py-3 md:py-4 text-xs md:text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${currentFeeModalTab === 'waiver' ? 'border-orange-600 text-orange-600 bg-orange-50/50' : 'border-transparent text-gray-500 hover:bg-gray-50'}">
                                        মৌকুফ (Waiver)
                                    </button>
                                </div>

                                <!-- Scrollable Body -->
                                <div class="flex-1 overflow-y-auto no-scrollbar bg-slate-50/30">
                                    <!-- Stats Grid (Now scrolls) -->
                                    <div class="grid ${financials.advance > 0 ? 'grid-cols-3' : 'grid-cols-2'} gap-1.5 md:gap-4 p-3 md:p-6 bg-gray-50/50 border-b md:bg-white md:border-none md:pb-2">
                                        <div class="bg-white rounded-2xl md:rounded-2xl p-2.5 md:p-4 border border-red-100 shadow-sm md:bg-red-50/50 md:border-red-200">
                                            <p class="text-[10px] md:text-[10px] text-red-500 mb-0.5 uppercase tracking-wider font-extrabold">বকেয়া (Due)</p>
                                            <p class="text-xl md:text-3xl font-black text-red-600">৳${Math.max(0, financials.balance).toLocaleString('bn-BD')}</p>
                                        </div>
                                        <div class="bg-white rounded-2xl md:rounded-2xl p-2.5 md:p-4 border border-emerald-100 shadow-sm md:bg-emerald-50/50 md:border-emerald-200">
                                            <p class="text-[10px] md:text-[10px] text-emerald-500 mb-0.5 uppercase tracking-wider font-extrabold tracking-tighter">${currentFeeModalTab === 'waiver' ? 'মোট মৌকুফ' : 'পরিশোধিত'}</p>
                                            <p class="text-xl md:text-3xl font-black text-emerald-600">৳${(currentFeeModalTab === 'waiver' ? financials.totalWaiver : financials.totalPaid).toLocaleString('bn-BD')}</p>
                                        </div>
                                        ${financials.advance > 0 ? `
                                        <div class="bg-white rounded-2xl md:rounded-2xl p-2.5 md:p-4 border border-indigo-100 shadow-sm md:bg-indigo-50/50 md:border-indigo-200">
                                            <p class="text-[10px] md:text-[10px] text-indigo-500 mb-0.5 uppercase tracking-wider font-extrabold">অগ্রিম (Advance)</p>
                                            <p class="text-xl md:text-3xl font-black text-indigo-600">৳${financials.advance.toLocaleString('bn-BD')}</p>
                                        </div>
                                        ` : ''}
                                    </div>

                                    <!-- Tab Content -->
                                    ${contentHtml}
                                </div>
                            </div>
                        </div>

                        <!-- LEFT SIDE: Detailed Due & History (Desktop Only) -->
                        <div class="hidden md:flex md:w-[40%] flex-col overflow-hidden bg-slate-50">
                            <div class="p-6 border-b flex items-center justify-between bg-white shadow-sm z-10 shrink-0">
                                <h4 class="font-black text-slate-800 text-2xl">বকেয়া ও লেনদেন বিবরণ</h4>
                                <div class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Details</div>
                            </div>
                            <div class="flex-1 overflow-y-auto p-6 no-scrollbar space-y-8 bg-slate-50/50">
                                <!-- Optional Fees Add Bar (Moved to Left Side) -->
                                ${(() => {
                        const availableOptionalFees = feeTypes.filter(f => f.type === 'optional' && f.classFees[student.class] && (!student.optionalFees || !student.optionalFees.includes(f.id)));
                        if (availableOptionalFees.length === 0) return '';
                        return `
                                    <div class="bg-white rounded-2xl p-5 border border-indigo-100 shadow-sm relative overflow-hidden group">
                                        <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
                                        <div class="relative z-10">
                                            <h5 class="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                                                <i data-lucide="plus-circle" class="w-4 h-4 text-indigo-500"></i> ঐচ্ছিক ফি যোগ করুন
                                            </h5>
                                            <div class="space-y-3">
                                                ${availableOptionalFees.map(f => `
                                                    <div class="flex items-center gap-3 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl hover:bg-white hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group/item" onclick="addOptionalFee('${student.uid}', '${f.id}')">
                                                        <div class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center transition group-hover/item:scale-110 shadow-sm">
                                                            <i data-lucide="plus" class="w-4 h-4"></i>
                                                        </div>
                                                        <div>
                                                            <p class="text-sm font-black text-slate-700">${f.name}</p>
                                                            <p class="text-[11px] font-bold text-indigo-500">৳${f.classFees[student.class].toLocaleString('bn-BD')}</p>
                                                        </div>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    </div>`;
                    })()}

                                <div>
                                    <h5 class="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
                                        <i data-lucide="info" class="w-4 h-4"></i> বিস্তারিত বকেয়া ফি
                                    </h5>
                                    <div class="space-y-3">
                                        ${renderDetailedFeeStatus(student, financials)}
                                    </div>
                                </div>
                                <div>
                                    <h5 class="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest mb-4">
                                        <i data-lucide="history" class="w-4 h-4"></i> সাম্প্রতিক লেনদেন রসিদ
                                    </h5>
                                    <div class="space-y-4">
                                        ${renderStudentTransactionHistory(student.uid)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                lucide.createIcons();

                setTimeout(() => {
                    const input = document.getElementById(`pay-detail-${student.uid}`);
                    if (input) { input.focus(); input.select(); }
                }, 100);
            }
        }

        function switchFeeGridTab(tab) {
            currentFeeGridTab = tab;
            renderFeesStudentGrid();
        }

        function switchFeeModalTab(tab) {
            currentFeeModalTab = tab;
            if (currentDetailUid) {
                const student = students.find(s => s.uid === currentDetailUid);
                if (student) showStudentFeeDetailPanel(student);
            }
        }

        function renderDetailedFeeStatus(student, financials) {
            const dueDetails = financials.details;
            if (!dueDetails || dueDetails.length === 0) return '<p class="text-sm text-center text-gray-400 py-8 bg-white rounded-2xl border border-dashed border-gray-200">কোনো তথ্য পাওয়া যায়নি</p>';

            return dueDetails.map(f => {
                const feeTypeObj = feeTypes.find(t => t.id === f.id);
                const isOptional = feeTypeObj && feeTypeObj.type === 'optional';
                const canRemove = isOptional && f.paid === 0;

                return `
                <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group hover:border-indigo-400 transition-colors">
                    <div class="p-4 bg-slate-50/80 border-b flex justify-between items-center group-hover:bg-indigo-50/30 transition-colors">
                        <span class="font-black text-xs text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            ${f.name}
                            ${canRemove ? `<button onclick="removeOptionalFee('${student.uid}', '${f.id}')" class="p-1 hover:bg-red-100 text-red-500 rounded-full transition" title="মুছে ফেলুন"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>` : ''}
                        </span>
                        <span class="font-black text-lg ${f.balance > 0 ? 'text-red-500' : 'text-emerald-500'}">৳${f.balance.toLocaleString('bn-BD')}</span>
                    </div>
                    <div class="p-4 bg-white divide-y divide-slate-100">
                        ${f.items.map(item => `
                            <div class="py-3 flex justify-between items-center text-sm">
                                <span class="text-slate-600 font-bold">${item.label}</span>
                                <div class="flex items-center gap-4">
                                    <span class="text-slate-400 line-through decoration-slate-200 text-xs">৳${item.amount.toLocaleString('bn-BD')}</span>
                                    <div class="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 font-black ${item.remaining > 0 ? 'text-slate-800' : 'text-emerald-500'} text-base">
                                        ${item.remaining <= 0 ? '<span class="flex items-center gap-1 text-emerald-500"><i data-lucide="check-circle" class="w-4 h-4"></i> PAID</span>' : `৳${item.remaining.toLocaleString('bn-BD')}`}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `}).join('');
        }

        function renderPaymentTab(student, financials, isDesktop = false) {

            const dueDetails = financials.details.filter(f => f.balance > 0);
            const feeListHtml = (financials.balance <= 0 || dueDetails.length === 0)
                ? '<div class="p-8 bg-green-50 rounded-2xl text-center text-green-700 font-bold border border-green-100 flex flex-col items-center gap-3"><i data-lucide="check-circle-2" class="w-10 h-10"></i><p class="text-lg">কোনো বকেয়া নেই (No Dues)</p></div>'
                : dueDetails.map(f => {
                    const feeTypeObj = feeTypes.find(t => t.id === f.id);
                    const isOptional = feeTypeObj && feeTypeObj.type === 'optional';
                    const canRemove = isOptional && f.paid === 0;

                    return `
                    <div class="p-4 bg-white rounded-xl border border-gray-100 hover:border-indigo-200 transition shadow-sm mb-3 group/card">
                        <div class="flex justify-between items-start mb-2">
                            <span class="font-bold text-base text-gray-800 flex items-center gap-2">
                                ${f.name}
                                ${canRemove ? `<button onclick="removeOptionalFee('${student.uid}', '${f.id}')" class="p-1 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition opacity-100 md:opacity-0 md:group-hover/card:opacity-100" title="মুছে ফেলুন"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>` : ''}
                            </span>
                            <span class="font-black text-lg text-indigo-700">৳${f.balance.toLocaleString('bn-BD')}</span>
                        </div>
                        <div class="flex flex-wrap gap-1.5 mt-2">
                            ${(f.unpaidItems || []).map(item => `
                                <div class="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded-md border border-gray-200 text-xs font-medium">
                                    <span>${item.label}</span>
                                </div>
                            `).join('')}
                            ${(f.partialItems || []).map(item => `
                                <div class="flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-1 rounded-md border border-orange-200 text-xs font-medium">
                                    <span>${item.label}: ৳${item.remaining.toLocaleString('bn-BD')}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
                }).join('');

            const availableOptionalFees = feeTypes.filter(f => f.type === 'optional' && f.classFees[student.class] && (!student.optionalFees || !student.optionalFees.includes(f.id)));
            let optionalFeeHtml = '';

            if (availableOptionalFees.length > 0) {
                optionalFeeHtml = `
                    <div class="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 shadow-sm mb-3">
                        <h5 class="flex items-center gap-2 text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">
                            <i data-lucide="plus-circle" class="w-4 h-4"></i> ঐচ্ছিক ফি যোগ করুন
                        </h5>
                        <div class="space-y-2">
                            ${availableOptionalFees.map(f => `
                                <div class="flex items-center justify-between gap-3 p-3 bg-white border border-indigo-100 rounded-xl shadow-sm active:scale-95 transition-all cursor-pointer" onclick="addOptionalFee('${student.uid}', '${f.id}')">
                                    <div class="flex items-center gap-3">
                                        <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                                            <i data-lucide="plus" class="w-4 h-4"></i>
                                        </div>
                                        <div>
                                            <p class="text-xs font-bold text-gray-700">${f.name}</p>
                                            <p class="text-[10px] font-bold text-indigo-500">৳${parseFloat(f.classFees[student.class]).toLocaleString('bn-BD')}</p>
                                        </div>
                                    </div>
                                    <div class="p-1.5 bg-indigo-600 text-white rounded-lg">
                                        <i data-lucide="arrow-right" class="w-3 h-3"></i>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
            }

            return `
                <div class="flex flex-col h-full bg-white relative">
                    <div id="fee-list-container-${student.uid}" class="space-y-3 transition-all duration-300">
                        ${isDesktop ? '' : feeListHtml}
                        ${optionalFeeHtml}
                    </div>

                    <div id="payment-footer-${student.uid}" class="p-5 md:p-6 border-t bg-gray-50 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-20 flex flex-col transition-all duration-300">
                        <label class="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">পেমেন্ট গ্রহণ করুন</label>
                        <div class="flex gap-2 mb-3">
                            <input type="number" id="pay-detail-${student.uid}" placeholder="বকেয়া: ৳${financials.balance}" class="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition bg-white text-base">
                            <button onclick="submitPayment('${student.uid}', 'pay-detail-${student.uid}', this)" class="px-6 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition shadow-md">জমা</button>
                        </div>
                        <div class="flex gap-2 mb-3">
                            <button onclick="printStudentFeeReport('${student.uid}')" class="flex-1 py-2 md:py-2.5 bg-white text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-100 border flex items-center justify-center gap-1 shadow-sm"><i data-lucide="printer" class="w-3.5 h-3.5"></i> রিপোর্ট</button>
                            <button onclick="event.stopPropagation(); shareFeeDueReport('${student.uid}')" class="flex-1 py-2 md:py-2.5 bg-green-50 text-green-700 rounded-lg text-sm font-bold hover:bg-green-100 border border-green-100 flex items-center justify-center gap-1 shadow-sm"><i data-lucide="share-2" class="w-3.5 h-3.5"></i> শেয়ার</button>
                        </div>
                        <details id="history-details-${student.uid}" 
                            ontoggle="toggleHistoryView('${student.uid}', this.open)"
                            class="border-t pt-2 group flex flex-col transition-all duration-300">
                            <summary class="flex justify-between items-center cursor-pointer list-none text-xs font-bold text-gray-400 uppercase tracking-widest py-1 hover:text-green-600 transition shrink-0">
                                <span>লেনদেন ইতিহাস (History)</span>
                                <i data-lucide="chevron-down" class="w-3 h-3 transition-transform group-open:rotate-180"></i>
                            </summary>
                            <div id="history-list-${student.uid}" class="hidden overflow-y-auto space-y-2 no-scrollbar mt-2 bg-white rounded-lg border p-1 transition-all">
                                ${renderStudentTransactionHistory(student.uid)}
                                <button onclick="event.stopPropagation(); printStudentLedger('${student.uid}')" class="w-full py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition text-center border border-dashed border-indigo-200 mt-2 shrink-0">
                                    <i data-lucide="external-link" class="w-3 h-3 inline-block mr-1"></i> সম্পূর্ণ ইতিহাস দেখুন (View All)
                                </button>
                            </div>
                        </details>
                    </div>
                </div>`;
        }

        function toggleHistoryView(uid, isOpen) {
            const feeList = document.getElementById(`fee-list-container-${uid}`);
            const footer = document.getElementById(`payment-footer-${uid}`);
            const historyList = document.getElementById(`history-list-${uid}`);
            const details = document.getElementById(`history-details-${uid}`);

            if (!feeList || !footer || !historyList || !details) return;

            // Ensure transition classes exist
            if (!feeList.classList.contains('transition-all')) feeList.classList.add('transition-all', 'duration-500', 'ease-in-out');
            if (!historyList.classList.contains('transition-all')) historyList.classList.add('transition-all', 'duration-500', 'ease-in-out');

            if (isOpen) {
                // Expand History
                feeList.style.maxHeight = "0";
                feeList.style.opacity = "0";
                setTimeout(() => feeList.classList.add('hidden'), 500);

                footer.classList.remove('shrink-0', 'bg-gray-50');
                footer.classList.add('flex-1', 'bg-white', 'h-full');

                details.classList.add('flex-1', 'flex', 'min-h-0');
                historyList.classList.remove('hidden');
                setTimeout(() => {
                    historyList.style.maxHeight = "2000px";
                    historyList.style.opacity = "1";
                }, 10);
            } else {
                // Return to Fees
                historyList.style.maxHeight = "0";
                historyList.style.opacity = "0";
                setTimeout(() => historyList.classList.add('hidden'), 500);

                feeList.classList.remove('hidden');
                setTimeout(() => {
                    feeList.style.maxHeight = "2000px";
                    feeList.style.opacity = "1";
                }, 10);

                footer.classList.add('shrink-0', 'bg-gray-50');
                footer.classList.remove('flex-1', 'bg-white', 'h-full');
                details.classList.remove('flex-1', 'flex', 'min-h-0');
            }
        }

        async function addOptionalFee(uid, feeId) {
            const student = students.find(s => s.uid === uid);
            if (!student) return;

            if (!student.optionalFees) student.optionalFees = [];
            if (!student.optionalFees.includes(feeId)) {
                student.optionalFees.push(feeId);
                localStorage.setItem('cc_students', JSON.stringify(students));
                await syncClasses();
                showToast('অপশনাল ফি যোগ করা হয়েছে');
                showStudentFeeDetailPanel(student);
            }
        }

        function toggleFeePanelMenu(uid) {
            const menu = document.getElementById(`fee-panel-menu-${uid}`);
            if (menu) {
                const isHidden = menu.classList.contains('hidden');
                // Close all other menus first if needed (optional)
                document.querySelectorAll('[id^="fee-panel-menu-"]').forEach(el => el.classList.add('hidden'));

                if (isHidden) {
                    menu.classList.remove('hidden');
                } else {
                    menu.classList.add('hidden');
                }
            }
        }

        async function removeOptionalFee(uid, feeId) {
            const student = students.find(s => s.uid === uid);
            if (!student) return;

            const fee = feeTypes.find(f => f.id === feeId);
            const feeName = fee ? fee.name : 'Unknown Fee';

            if (await customConfirm(`আপনি কি নিশ্চিত যে "${feeName}" মুছে ফেলতে চান?`, 'ফি মুছে ফেলা')) {
                if (student.optionalFees) {
                    student.optionalFees = student.optionalFees.filter(id => id !== feeId);
                    localStorage.setItem('cc_students', JSON.stringify(students));
                    await syncClasses();
                    showToast('ঐচ্ছিক ফি মুছে ফেলা হয়েছে');
                    showStudentFeeDetailPanel(student);
                }
            }
        }

        function toggleWaiverCard(idx) {
            const body = document.getElementById(`waiver-body-${idx}`);
            const icon = document.getElementById(`waiver-icon-${idx}`);

            if (body.style.maxHeight && body.style.maxHeight !== "0px") {
                body.style.maxHeight = "0px";
                body.style.opacity = "0";
                icon.classList.remove('rotate-180');
            } else {
                body.style.maxHeight = body.scrollHeight + "px";
                body.style.opacity = "1";
                icon.classList.add('rotate-180');
            }
        }

        function renderWaiverTab(student, financials) {
            let waiverHtml = financials.details.map((f, idx) => `
                <div class="bg-white rounded-xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
                    <div class="flex flex-col p-4 bg-gray-50/50 border-b cursor-pointer select-none" onclick="toggleWaiverCard('${idx}')">
                        <div class="flex justify-between items-center mb-3">
                            <div class="flex items-center gap-3">
                                <i id="waiver-icon-${idx}" data-lucide="chevron-down" class="w-5 h-5 text-gray-400 transition-transform duration-300"></i>
                                <p class="font-black text-sm text-gray-800 uppercase tracking-wide">${f.name}</p>
                            </div>
                            <div class="flex items-center gap-1.5 bg-orange-100/50 px-2 py-1 rounded-lg border border-orange-200" onclick="event.stopPropagation()">
                                <input type="checkbox" id="persist-${student.uid}-${idx}" ${(student.waivers && student.waivers[f.name]) ? 'checked' : ''} 
                                    onchange="applyBulkWaiver('${student.uid}', '${f.name}', document.getElementById('bulk-input-${student.uid}-${idx}').value, this.checked)"
                                    class="w-4 h-4 text-orange-600 rounded cursor-pointer focus:ring-orange-500">
                                <label for="persist-${student.uid}-${idx}" class="text-[10px] text-orange-700 font-black cursor-pointer whitespace-nowrap">আগামীতেও?</label>
                            </div>
                        </div>
                        <div class="flex items-center gap-3" onclick="event.stopPropagation()">
                            <div class="flex-1 flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-200 focus-within:border-orange-400 transition-all">
                                <span class="text-xs text-gray-400 font-bold uppercase tracking-tight shrink-0">Bulk Amount:</span>
                                <input type="number" id="bulk-input-${student.uid}-${idx}" value="${(student.waivers && student.waivers[f.name]) || ''}" placeholder="৳সব খাতে একবারে..." 
                                    onchange="applyBulkWaiver('${student.uid}', '${f.name}', this.value, document.getElementById('persist-${student.uid}-${idx}').checked)"
                                    class="w-full bg-transparent text-sm outline-none text-right font-black text-orange-600 appearance-none">
                            </div>
                        </div>
                    </div>
                    <div id="waiver-body-${idx}" class="transition-all duration-300 ease-in-out bg-white" style="max-height: 0; overflow: hidden;">
                        <div class="p-4 space-y-3 overflow-y-auto custom-scrollbar bg-gray-50/20" style="max-height: 250px;">
                            ${f.items.map((item) => {
                const feeId = item.id;
                const currentWaiver = (student.waivers && student.waivers[feeId]) || 0;
                return `
                                    <div class="flex items-center justify-between gap-3 p-2 bg-white rounded-lg border border-gray-100 hover:border-orange-100 transition shadow-sm">
                                        <span class="text-xs font-bold text-gray-700 truncate">${item.label}</span>
                                        <div class="relative w-24">
                                            <input type="number" value="${currentWaiver || ''}" placeholder="৳0" onchange="applyWaiver('${student.uid}', '${feeId}', this.value)"
                                                class="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-right font-black bg-gray-50/30 text-orange-700">
                                        </div>
                                    </div>`;
            }).join('')}
                        </div>
                    </div>
                </div>`).join('');

            return `<div class="p-4 bg-gray-50/30 min-h-full">${waiverHtml}</div>`;
        }

        async function applyWaiver(uid, feeId, amount) {
            const student = students.find(s => s.uid === uid);
            if (!student) return;

            if (!student.waivers) student.waivers = {};

            const val = parseFloat(amount);
            if (isNaN(val) || val <= 0) {
                delete student.waivers[feeId];
            } else {
                student.waivers[feeId] = val;
            }

            localStorage.setItem('cc_students', JSON.stringify(students));
            await syncClasses();

            // Only show panel on desktop
            if (window.innerWidth >= 768) {
                showStudentFeeDetailPanel(student);
            }

            // Always refresh grid (which handles expansion on mobile)
            renderFeesStudentGrid();
            if (typeof refreshAppUI === 'function') refreshAppUI();
            showToast('মৌকুফ সেভ হয়েছে');
        }

        function applyBulkWaiver(uid, feeName, amount, isPersistent = false) {
            const student = students.find(s => s.uid === uid);
            if (!student) return;

            if (!student.waivers) student.waivers = {};

            const val = parseFloat(amount);

            if (isPersistent) {
                // Persistent storage: Save at fee name level
                if (isNaN(val) || val <= 0) {
                    delete student.waivers[feeName];
                } else {
                    student.waivers[feeName] = val;
                }
                // Cleanup: Remove any index-based waivers for this fee name to avoid confusion
                Object.keys(student.waivers).forEach(key => {
                    if (key.startsWith(feeName + '-')) {
                        delete student.waivers[key];
                    }
                });
            } else {
                // Not persistent: Apply to all CURRENT occurrences only
                delete student.waivers[feeName];

                const financials = calculateStudentFinancials(student);
                const feeCategory = financials.details.find(d => d.name === feeName);
                if (feeCategory) {
                    feeCategory.breakdown.forEach((_, idx) => {
                        const feeId = feeName + '-' + idx;
                        if (isNaN(val) || val <= 0) {
                            delete student.waivers[feeId];
                        } else {
                            student.waivers[feeId] = val;
                        }
                    });
                }
            }

            localStorage.setItem('cc_students', JSON.stringify(students));

            // Only show panel on desktop
            if (window.innerWidth >= 768) {
                showStudentFeeDetailPanel(student);
            }

            // Always refresh grid
            renderFeesStudentGrid();
            if (typeof refreshAppUI === 'function') refreshAppUI();

            let msg = isPersistent ? 'সব আগামী ফি-তেও মৌকুফ সেট হয়েছে' : 'শুধু বর্তমান ফি-গুলোতে মৌকুফ সেট হয়েছে';
            if (isNaN(val) || val <= 0) msg = 'মৌকুফ মুছে ফেলা হয়েছে';
            showToast(msg);
        }
        function renderStudentTransactionHistory(uid) {
            const history = feePayments.filter(p => p.uid === uid).sort((a, b) => new Date(b.date) - new Date(a.date));
            if (history.length === 0) return '<p class="text-xs text-center text-gray-400 py-4 bg-gray-50/50 rounded-lg">কোনো লেনদেন নেই (No History)</p>';

            return history.map(t => {
                const date = new Date(t.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' });

                if (t.deleted) {
                    const deletedDate = t.deletedAt ? new Date(t.deletedAt).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' }) : '';
                    return `
                    <div class="flex justify-between items-center bg-red-50/30 p-2 rounded border border-red-50 opacity-60">
                        <div class="flex-1 min-w-0 pr-2">
                            <div class="flex items-center gap-2 mb-1">
                                <p class="text-xs font-bold text-gray-400 line-through">৳${t.amount}</p>
                                <p class="text-[10px] text-gray-400 line-through">${date}</p>
                            </div>
                            <div class="text-[10px] text-red-500 font-medium flex items-center gap-1">
                                <i data-lucide="trash-2" class="w-3 h-3"></i>
                                মুছে ফেলা হয়েছে ${deletedDate ? `(${deletedDate})` : ''}
                            </div>
                        </div>
                    </div>`;
                }

                let feeInfo = '';
                if (t.allocation && t.allocation.length > 0) {
                    feeInfo = t.allocation.map(a => `<span class="bg-indigo-50/50 text-indigo-700 px-2 py-0.5 rounded-md text-[10px] mr-1 mb-1 border border-indigo-100 font-bold">${a.itemLabel || a.name || a.feeName}</span>`).join('');
                }

                return `
                <div class="flex justify-between items-center bg-white p-3 rounded-xl hover:bg-indigo-50/30 transition group border border-gray-100 hover:border-indigo-200">
                    <div class="flex-1 min-w-0 pr-2">
                        <div class="flex items-center gap-2 mb-1.5">
                            <p class="text-sm font-black text-slate-800">৳${t.amount}</p>
                            <p class="text-xs font-bold text-slate-400 uppercase tracking-tight">${date}</p>
                        </div>
                        <div class="flex flex-wrap gap-1">
                            ${feeInfo}
                        </div>
                    </div>
                    <div class="flex items-center gap-1 shrink-0">
                        <button onclick="reprintReceipt('${t.id}')" class="text-gray-400 hover:text-indigo-600 p-1.5 rounded hover:bg-white transition" title="রশিদ প্রিন্ট করুন">
                            <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                        </button>
                        <button onclick="revertPayment('${t.id}')" class="text-gray-300 hover:text-red-500 p-1.5 rounded hover:bg-red-50 transition" title="Undo">
                            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>
                </div>`;
            }).join('');
        }

        async function revertPayment(paymentId) {
            const confirmed = await customConfirm('আপনি কি সত্যিই এই লেনদেনটি মুছে ফেলতে চান?', 'লেনদেন মুছুন');
            if (!confirmed) return;

            const index = feePayments.findIndex(p => p.id === paymentId);
            if (index === -1) return showToast('লেনদেন পাওয়া যায়নি');

            const sid = feePayments[index].uid;
            feePayments[index].deleted = true;
            feePayments[index].deletedAt = new Date().toISOString();

            if (typeof ShadowStorage !== 'undefined') {
                await ShadowStorage.save(STORAGE_KEYS.feePayments, feePayments);
                await saveData();
            } else {
                localStorage.setItem(STORAGE_KEYS.feePayments, JSON.stringify(feePayments));
            }

            refreshAppUI();
            if (document.getElementById('transaction-history-drawer') && !document.getElementById('transaction-history-drawer').classList.contains('hidden')) {
                openTransactionHistoryModal();
            }
            showToast('✅ লেনদেন মুছে ফেলা হয়েছে!');
        }

        function reprintReceipt(paymentId) {
            const payment = feePayments.find(p => p.id === paymentId);
            if (!payment) return showToast('লেনদেন খুঁজে পাওয়া যায়নি');
            const student = students.find(s => s.uid === payment.uid) || {};

            pendingPayment = {
                uid: payment.uid,
                amount: payment.amount,
                finalAmount: payment.amount,
                date: payment.date,
                finalDetails: payment.allocation || payment.details || [],
                allocation: payment.allocation || payment.details || [],
                studentName: student.name || 'Unknown Student',
                studentClass: student.class || '',
                studentRoll: student.roll || '',
                studentMobile: student.mobile || '',
            };
            printMoneyReceipt();
        }

        function getPaymentAllocation(student, payAmount, excludedIds = []) {
            const financials = calculateStudentFinancials(student);
            let remaining = parseFloat(payAmount);
            let allocated = [];

            // FIFO Allocation using pre-calculated payableItems
            for (let item of financials.payableItems) {
                if (remaining <= 0.01) break;

                // Skip excluded items
                if (excludedIds.includes(item.itemId)) continue;

                const pay = Math.min(remaining, item.remaining);
                allocated.push({
                    feeId: item.feeId,
                    feeName: item.feeName,
                    itemId: item.itemId,
                    itemLabel: item.itemLabel,
                    description: `${item.feeName} - ${item.itemLabel}`,
                    amount: pay,
                    itemRemaining: item.remaining,
                    waiver: item.waiver || 0
                });
                remaining -= pay;
            }

            // Round remaining to avoid floating point issues
            remaining = Math.max(0, Math.round(remaining * 100) / 100);

            return { allocated: allocated, wallet: remaining, totalPayable: payAmount };
        }

        let currentUpcomingAllocationIds = []; // Global state for upcoming selections

        function getUpcomingFees(student) {
            const nextDate = new Date();
            nextDate.setMonth(nextDate.getMonth() + 24); // Look 24 months ahead

            const currentFinancials = calculateStudentFinancials(student); // Standard (Today)
            const futureFinancials = calculateStudentFinancials(student, nextDate); // Future

            // Find items in future that are NOT in current payable list
            // (Meaning they become due in the future month)
            const currentIds = new Set(currentFinancials.payableItems.map(i => i.itemId));

            const upcoming = futureFinancials.payableItems.filter(item => !currentIds.has(item.itemId));

            // Sort by date (oldest/soonest first)
            return upcoming.sort((a, b) => {
                // Find sortDate from original items if possible, or assume based on month logic?
                // Actually, calculateStudentFinancials pushes to payableItems. Need to ensure payableItems has sortDate.
                // Wait, payableItems is constructed later. Let's check calculateStudentFinancials return structure.
                // Ah, payableItems is constructed from fee items. Let's ensure sortDate is carried over to payableItems.

                // Oops, I need to check where payableItems is built.
                return (a.sortDate || 0) - (b.sortDate || 0);
            });
        }

        function switchUpcomingFeeTab(feeId) {
            // Hide all fee content divs
            document.querySelectorAll('[data-fee-content]').forEach(div => {
                div.classList.add('hidden');
            });
            // Show selected fee content
            const selectedContent = document.querySelector(`[data-fee-content="${feeId}"]`);
            if (selectedContent) selectedContent.classList.remove('hidden');

            // Update tab styling
            document.querySelectorAll('.upcoming-fee-tab').forEach(btn => {
                btn.classList.remove('bg-indigo-600', 'text-white');
                btn.classList.add('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
            });
            const selectedTab = document.querySelector(`[data-fee-tab="${feeId}"]`);
            if (selectedTab) {
                selectedTab.classList.remove('bg-gray-100', 'text-gray-600', 'hover:bg-gray-200');
                selectedTab.classList.add('bg-indigo-600', 'text-white');
            }
        }

        function toggleUpcomingAllocation(itemId) {
            const index = currentUpcomingAllocationIds.indexOf(itemId);
            if (index > -1) {
                currentUpcomingAllocationIds.splice(index, 1);
            } else {
                currentUpcomingAllocationIds.push(itemId);
            }
            renderPaymentConfirmationUI();
        }

        function submitPayment(uid, inputId = null) {
            const amountInput = inputId ? document.getElementById(inputId) : (document.getElementById(`pay-detail-${uid}`) || document.getElementById(`pay-list-${uid}`));
            if (!amountInput) return showToast("ইনপুট খুঁজে পাওয়া যায়নি");

            const amount = parseFloat(amountInput.value);
            if (isNaN(amount) || amount <= 0) return showToast('সঠিক পরিমাণ লিখুন');

            const student = students.find(s => s.uid === uid);
            if (!student) return showToast("শিক্ষার্থী পাওয়া যায়নি");

            // Initialize global state for this payment session
            currentExcludedAllocationIds = [];
            currentUpcomingAllocationIds = []; // Reset upcoming selections

            const financials = calculateStudentFinancials(student);
            const prevDue = financials.balance || 0;

            // Auto-Select Upcoming Fees if Overpayment is sufficient
            let autoOverpayment = amount - prevDue;
            if (autoOverpayment > 0) {
                const upcoming = getUpcomingFees(student);
                upcoming.forEach(fee => {
                    if (autoOverpayment >= fee.remaining - 0.01) {
                        currentUpcomingAllocationIds.push(fee.itemId);
                        autoOverpayment -= fee.remaining;
                    }
                });
            }

            pendingPayment = {
                uid: student.uid,
                amount: amount,
                date: new Date().toISOString(),
                allocation: null, // Will be set by renderPaymentConfirmationUI
                studentName: student.name,
                studentClass: student.class,
                studentRoll: student.roll,
                studentMobile: student.mobile,
                prevDue: prevDue,
                // remainingDue will be calculated in UI render
                collectorName: currentCollector.name,
                collectorId: currentCollector.id
            };

            renderPaymentConfirmationUI();

            // Show Modal and Switch Tabs
            document.getElementById('payment-confirm-actions').classList.replace('hidden', 'flex');
            document.getElementById('payment-success-actions').classList.replace('flex', 'hidden');
            document.getElementById('payment-modal-subtitle').textContent = "পেমেন্ট বিবরণ যাচাই করুন";

            // Switch to Details tab by default if auto-distribution needs review, or keep Overview
            switchConfirmTab('overview');
            document.getElementById('confirm-tab-bar').classList.remove('md:hidden');

            document.getElementById('payment-confirmation-modal').classList.remove('hidden');
        }

        function renderPaymentConfirmationUI() {
            if (!pendingPayment) return;
            const student = students.find(s => s.uid === pendingPayment.uid);
            if (!student) return;

            // 1. Calculate Allocation with current exclusions
            const allocationData = getPaymentAllocation(student, pendingPayment.amount, currentExcludedAllocationIds);

            // Calculate Remaining Due (Before upcoming allocations modify the wallet)
            pendingPayment.remainingDue = Math.max(0, pendingPayment.prevDue - (pendingPayment.amount - allocationData.wallet));

            // NEW: Handle Upcoming Allocations
            const upcomingFees = getUpcomingFees(student);
            let availableWallet = allocationData.wallet;
            const validUpcomingAllocations = [];

            if (currentUpcomingAllocationIds.length > 0) {
                upcomingFees.forEach(item => {
                    if (currentUpcomingAllocationIds.includes(item.itemId)) {
                        if (availableWallet >= item.remaining - 0.01) {
                            const allocAmount = item.remaining;
                            availableWallet -= allocAmount;
                            validUpcomingAllocations.push({
                                ...item,
                                feeId: item.feeId,
                                feeName: item.feeName || item.label,
                                amount: allocAmount,
                                isUpcoming: true
                            });
                        } else if (availableWallet > 0) {
                            const allocAmount = availableWallet;
                            availableWallet = 0;
                            validUpcomingAllocations.push({
                                ...item,
                                feeId: item.feeId,
                                feeName: item.feeName || item.label,
                                amount: allocAmount,
                                isUpcoming: true
                            });
                        }
                    }
                });
            }

            // Sync with allocationData for saving/displaying in main list
            if (validUpcomingAllocations.length > 0) {
                allocationData.allocated.push(...validUpcomingAllocations.map(i => ({
                    feeId: i.feeId,
                    feeName: i.feeName,
                    itemId: i.itemId,
                    itemLabel: i.itemLabel || i.label,
                    amount: i.amount,
                    itemRemaining: i.remaining,
                    waiver: i.waiver || 0,
                    description: `${i.feeName || i.label} - ${i.itemLabel || i.label}`
                })));
                allocationData.wallet = availableWallet;
            }

            // Update Pending Payment State
            pendingPayment.allocation = allocationData;

            // 2. Update Overview Numbers
            const summaryPrev = document.getElementById('summary-prev-due');
            if (summaryPrev) summaryPrev.textContent = `৳${pendingPayment.prevDue}`;
            const summaryPay = document.getElementById('summary-paying');
            if (summaryPay) summaryPay.textContent = `৳${pendingPayment.amount}`;
            const summaryRem = document.getElementById('summary-remaining');
            if (summaryRem) summaryRem.textContent = `৳${pendingPayment.remainingDue}`;

            // 3. Handle Wallet/Advance Warning & Upcoming Options
            const baseAlloc = getPaymentAllocation(student, pendingPayment.amount, currentExcludedAllocationIds);
            const totalExcess = baseAlloc.wallet;

            const extraWarning = document.getElementById('payment-overpayment-warning');
            const extraDiv = document.getElementById('extra-amount-options');

            if (totalExcess > 0.01) {
                if (extraWarning) extraWarning.classList.remove('hidden');
                if (extraDiv) {
                    extraDiv.classList.remove('hidden');
                    const extraDisplay = document.getElementById('extra-amount-display');
                    if (extraDisplay) extraDisplay.textContent = totalExcess.toLocaleString();

                    // Render Upcoming Fees Options
                    let upcomingContainer = document.getElementById('upcoming-fee-selection-container');
                    if (!upcomingContainer) {
                        upcomingContainer = document.createElement('div');
                        upcomingContainer.id = 'upcoming-fee-selection-container';
                        upcomingContainer.className = 'mt-3 pt-3 border-t border-slate-200';
                        const radios = extraDiv.querySelector('.space-y-2');
                        if (radios) radios.parentNode.insertBefore(upcomingContainer, radios.nextSibling);
                        else extraDiv.appendChild(upcomingContainer);
                    }

                    if (upcomingFees.length > 0) {
                        const isWalletAction = document.querySelector('input[name="extra-action"][value="wallet"]')?.checked !== false;

                        if (isWalletAction) {
                            // Group fees by fee type
                            const groupedFees = {};
                            upcomingFees.forEach(item => {
                                if (!groupedFees[item.feeId]) {
                                    groupedFees[item.feeId] = {
                                        feeName: item.feeName,
                                        items: []
                                    };
                                }
                                groupedFees[item.feeId].items.push(item);
                            });

                            const feeTypes = Object.keys(groupedFees);
                            const activeFeeTab = feeTypes[0]; // Default to first tab

                            upcomingContainer.innerHTML = `
                                <div class="flex items-center justify-between mb-2">
                                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">আসন্ন ফি অ্যাডজাস্ট করুন (Upcoming Fees)</p>
                                    <span class="text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">পরবর্তী ২৪ মাস</span>
                                </div>
                                ${feeTypes.length > 1 ? `
                                <div class="flex gap-1 mb-2 overflow-x-auto pb-1">
                                    ${feeTypes.map(feeId => `
                                        <button 
                                            onclick="switchUpcomingFeeTab('${feeId}')"
                                            data-fee-tab="${feeId}"
                                            class="upcoming-fee-tab px-2 py-1 text-[10px] font-semibold rounded whitespace-nowrap transition-all ${feeId === activeFeeTab ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                                            ${groupedFees[feeId].feeName}
                                        </button>
                                    `).join('')}
                                </div>` : ''}
                                ${feeTypes.map(feeId => `
                                    <div data-fee-content="${feeId}" class="space-y-1 max-h-40 overflow-y-auto pr-1 custom-scrollbar ${feeId !== activeFeeTab ? 'hidden' : ''}">
                                        ${groupedFees[feeId].items.map(item => {
                                const isChecked = currentUpcomingAllocationIds.includes(item.itemId);
                                let isDisabled = false;
                                if (!isChecked && availableWallet < 0.01) isDisabled = true;

                                return `
                                                <label class="flex items-center justify-between p-2 rounded-lg border ${isChecked ? 'bg-indigo-50 border-indigo-200' : (isDisabled ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed' : 'bg-white border-slate-100 hover:border-slate-200 cursor-pointer')} text-xs transition-all">
                                                    <div class="flex items-center gap-2">
                                                        <input type="checkbox" onchange="toggleUpcomingAllocation('${item.itemId}')" 
                                                            ${isChecked ? 'checked' : ''} 
                                                            ${isDisabled ? 'disabled' : ''}
                                                            class="rounded text-indigo-600 focus:ring-indigo-500 border-gray-300 w-3.5 h-3.5">
                                                        <div class="font-medium text-gray-700">${item.itemLabel}</div>
                                                    </div>
                                                    <div class="font-black text-indigo-600">৳${item.remaining.toLocaleString()}</div>
                                                </label>
                                            `;
                            }).join('')}
                                    </div>
                                `).join('')}
                            `;
                        } else {
                            upcomingContainer.innerHTML = '';
                        }
                        upcomingContainer.classList.remove('hidden');
                    } else {
                        upcomingContainer.classList.add('hidden');
                    }
                }
            } else {
                if (extraWarning) extraWarning.classList.add('hidden');
                if (extraDiv) extraDiv.classList.add('hidden');
            }

            // 4. Render Allocation List with Checkboxes (Interactive)
            const listContainer = document.getElementById('payment-allocation-list');
            if (listContainer) {
                const financials = calculateStudentFinancials(student);
                let html = '';

                // Track allocated amounts
                const allocatedMap = {};
                allocationData.allocated.forEach(a => allocatedMap[a.itemId] = a.amount);

                financials.payableItems.forEach(item => {
                    const payAmount = allocatedMap[item.itemId] || 0;
                    const isAllocated = payAmount > 0; // Partial or Full
                    const isExcluded = currentExcludedAllocationIds.includes(item.itemId);

                    // Style determination
                    let itemClass = "border-gray-100 hover:bg-gray-50";
                    let amountClass = "text-gray-400";
                    let textClass = "text-gray-700 font-medium";
                    let statusBadge = "";

                    if (isAllocated) {
                        itemClass = "bg-green-50/50 border-green-100";
                        amountClass = "text-green-700";
                    } else if (isExcluded) {
                        itemClass = "opacity-60 bg-gray-50";
                        textClass = "text-gray-400 line-through";
                    } else {
                        // Not Excluded but No Funds (or 0 allocation)
                        statusBadge = '<span class="text-[9px] text-amber-500 font-bold">তহবিল নেই (No Funds)</span>';
                    }

                    // Checkbox is checked if money is being paid OR if it's partially paid
                    const isChecked = isAllocated;

                    html += `
                        <label class="flex justify-between items-center text-sm py-2 px-2 rounded-lg border mb-1 cursor-pointer transition-all ${itemClass}">
                            <div class="flex items-center gap-3">
                                <input type="checkbox" 
                                    onchange="togglePaymentAllocation('${item.itemId}')" 
                                    ${isChecked ? 'checked' : ''}
                                    class="w-4 h-4 text-green-600 rounded focus:ring-green-500 border-gray-300">
                                <div class="flex flex-col">
                                    <span class="${textClass}">${item.feeName} - ${item.itemLabel}</span>
                                    ${statusBadge}
                                </div>
                            </div>
                            <span class="font-bold ${amountClass}">
                                ${isAllocated ? '৳' + payAmount : '৳' + item.remaining}
                            </span>
                        </label>
                    `;
                });

                // Append Upcoming Allocations to Main List
                if (validUpcomingAllocations.length > 0) {
                    html += `<div class="mt-3 mb-1 text-[10px] font-black text-indigo-400 uppercase tracking-widest border-t border-indigo-100 pt-2">আসন্ন পেমেন্ট (Upcoming)</div>`;
                    html += validUpcomingAllocations.map(item => `
                        <div class="flex justify-between items-center text-sm py-2 px-2 rounded-lg border mb-1 bg-indigo-50 border-indigo-200">
                            <div class="flex items-center gap-3">
                                <i data-lucide="calendar-clock" class="w-4 h-4 text-indigo-500"></i>
                                <div class="flex flex-col">
                                    <span class="text-indigo-900 font-bold">${item.feeName || item.label} - ${item.itemLabel || item.label}</span>
                                </div>
                            </div>
                            <span class="font-bold text-indigo-700">৳${item.amount.toLocaleString()}</span>
                        </div>
                     `).join('');
                }

                // Show Wallet/Advance Entry at bottom if exists
                if (allocationData.wallet > 0.01) {
                    html += `
                    <div class="flex justify-between text-sm py-2 px-2 bg-green-100/50 rounded-lg mt-2 border border-green-200">
                        <div class="flex items-center gap-2">
                             <div class="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white"><i data-lucide="check" class="w-2.5 h-2.5"></i></div>
                             <span class="text-green-800 font-black">অগ্রিম ব্যালেন্স (Advance)</span>
                        </div>
                        <span class="font-bold text-green-800">৳${allocationData.wallet}</span>
                    </div>`;
                }

                if (financials.payableItems.length === 0 && allocationData.wallet > 0) {
                    html = `
                    <div class="flex justify-between text-sm py-2 px-2 bg-green-100/50 rounded-lg mt-2 border border-green-200">
                        <span class="text-green-800 font-black">পুরো টাকা অগ্রিম জমা (Advance)</span>
                        <span class="font-bold text-green-800">৳${allocationData.wallet}</span>
                    </div>`;
                }

                listContainer.innerHTML = html;
                lucide.createIcons();
            }
        }

        function togglePaymentAllocation(itemId) {
            // Simple toggle exclusion logic works because default state is included
            // If it's in excluded list -> Remove it (Include)
            // If it's not -> Add it (Exclude)
            if (currentExcludedAllocationIds.includes(itemId)) {
                currentExcludedAllocationIds = currentExcludedAllocationIds.filter(id => id !== itemId);
            } else {
                currentExcludedAllocationIds.push(itemId);
            }
            renderPaymentConfirmationUI();
        }

        async function confirmPayment() {
            if (!pendingPayment) return;

            try {
                const inputs = document.querySelectorAll(`input[id *= "${pendingPayment.uid}"]`);
                inputs.forEach(i => i.value = '');
            } catch (e) { console.error("Could not clear input:", e); }

            let extraAction = 'wallet';
            const radio = document.querySelector('input[name="extra-action"]:checked');
            if (radio) extraAction = radio.value;

            let finalAmount = pendingPayment.amount;
            let finalDetails = { ...pendingPayment.allocation };

            if (extraAction === 'return' && finalDetails.wallet > 0) {
                finalAmount -= finalDetails.wallet;
                finalDetails.wallet = 0;
            }

            pendingPayment.finalAmount = finalAmount;
            pendingPayment.finalDetails = finalDetails;

            const lastId = feePayments.reduce((max, p) => {
                const pid = parseInt(p.id);
                return !isNaN(pid) && pid > max ? pid : max;
            }, 0);
            const newId = (lastId + 1).toString();

            const newPayment = {
                id: newId,
                uid: pendingPayment.uid,
                amount: finalAmount,
                date: pendingPayment.date,
                details: finalDetails,
                allocation: finalDetails.allocated, // Backward compatibility
                studentName: pendingPayment.studentName,
                studentClass: pendingPayment.studentClass,
                studentRoll: pendingPayment.studentRoll,
                studentMobile: pendingPayment.studentMobile,
                collectorName: pendingPayment.collectorName,
                collectorId: pendingPayment.collectorId
            };

            pendingPayment.id = newId;
            feePayments.push(newPayment);

            // Save with full synchronization
            if (typeof ShadowStorage !== 'undefined') {
                await ShadowStorage.save(STORAGE_KEYS.feePayments, feePayments);
                await saveData();
                refreshAppUI();
            } else {
                localStorage.setItem(STORAGE_KEYS.feePayments, JSON.stringify(feePayments));
                localStorage.setItem(STORAGE_KEYS.students, JSON.stringify(students));
                refreshAppUI();
            }

            showToast(extraAction === 'return' ? `৳${finalAmount} জমা হয়েছে (অতিরিক্ত ফেরত দেওয়া হয়েছে)` : `৳${finalAmount} পেমেন্ট সফল হয়েছে!`);

            document.getElementById('payment-modal-subtitle').textContent = "ট্রানজেকশন রেকর্ড করা হয়েছে";
            document.getElementById('payment-confirm-actions').classList.replace('flex', 'hidden');
            document.getElementById('payment-success-actions').classList.replace('hidden', 'flex');

            // Success State Tabs
            document.getElementById('btn-confirm-sharing').classList.remove('hidden');
            document.getElementById('confirm-tab-bar').classList.remove('md:hidden');
            switchConfirmTab('sharing');

            const mobileText = document.getElementById('mobile-receipt-text');
            if (mobileText) mobileText.value = generatePaymentText(pendingPayment);

            // Always update all screens in real-time
            refreshAppUI();
        }

        function switchConfirmTab(tab) {
            const overview = document.getElementById('confirm-tab-overview');
            const details = document.getElementById('confirm-tab-details');
            const sharing = document.getElementById('confirm-tab-sharing');

            const btnOverview = document.getElementById('btn-confirm-overview');
            const btnDetails = document.getElementById('btn-confirm-details');
            const btnSharing = document.getElementById('btn-confirm-sharing');

            const activeClasses = ['border-indigo-600', 'text-indigo-600', 'bg-indigo-50/50'];
            const inactiveClasses = ['border-transparent', 'text-gray-500'];

            // Helper to reset button
            const resetBtn = (btn) => {
                if (!btn) return;
                btn.classList.remove(...activeClasses);
                btn.classList.add(...inactiveClasses);
            };
            const setBtnActive = (btn) => {
                if (!btn) return;
                btn.classList.remove(...inactiveClasses);
                btn.classList.add(...activeClasses);
            };

            // Hide all tabs by default (md:hidden)
            [overview, details, sharing].forEach(el => el?.classList.add('md:hidden'));
            [btnOverview, btnDetails, btnSharing].forEach(resetBtn);

            if (tab === 'overview') {
                overview?.classList.remove('md:hidden');
                setBtnActive(btnOverview);
            } else if (tab === 'details') {
                details?.classList.remove('md:hidden');
                setBtnActive(btnDetails);
            } else if (tab === 'sharing') {
                sharing?.classList.remove('md:hidden');
                setBtnActive(btnSharing);
            }
        }


        function printMoneyReceipt() {
            if (!pendingPayment) return;

            const t = pendingPayment;
            const amount = t.finalAmount !== undefined ? t.finalAmount : t.amount;
            const details = t.finalDetails || t.allocation;
            const d = new Date(t.date);
            const dateStr = d.toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            const receiptNo = `R-${t.id}`;
            const studentObj = students.find(s => s.uid === t.uid);
            const displayId = studentObj && studentObj.id ? studentObj.id : t.uid;

            // Unified Photo Logic
            const photoSrc = getStudentPhoto(studentObj);
            const initial = (t.studentName || '?').charAt(0).toUpperCase();
            const photoHtml = `
                <div style="width: 55px; height: 55px; border-radius: 8px; background: #f9fafb; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-weight: 700; font-size: 22px; position: relative; overflow: hidden;">
                    <img src="${photoSrc}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 10;" onerror="handlePhotoError(this, '${t.uid}', '${(t.studentName || '').replace(/'/g, "\\'")}')">
                    <span style="position: relative; z-index: 0;">${initial}</span>
                </div>`;

            const printContent = `
                <div class="p-6">
                    ${getInstituteHeader('মানি রিসিট (Money Receipt)', false)}
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 15px; margin-bottom: 25px; font-size: 13px;">
                        <div style="line-height: 1.7; flex: 1;">
                            <div style="background: #fff; display: inline-block; padding: 2px 8px; border: 1px solid #000; margin-bottom: 5px;">
                                <strong style="color: #000;">রশিদ নং:</strong> <span style="font-family: monospace; font-weight: 700; color: #000;">${receiptNo}</span>
                            </div>
                            <div><strong style="color: #000; width: 60px; display: inline-block;">তারিখ:</strong> ${dateStr}</div>
                            <div><strong style="color: #000; width: 60px; display: inline-block;">মোবাইল:</strong> ${t.studentMobile || '--'}</div>
                        </div>
                        <div style="flex: 1.2; display: flex; gap: 15px; justify-content: flex-end; align-items: center;">
                            <div style="text-align: right; line-height: 1.5;">
                                <div style="font-weight: 800; font-size: 18px; color: #000; margin-bottom: 2px;">${t.studentName}</div>
                                <div style="color: #000;">আইডি: <strong>${displayId}</strong></div>
                                <div style="color: #000; font-size: 12px; margin-top: 2px;">ক্লাস: ${t.studentClass} | রোল: ${t.studentRoll || '--'}</div>
                            </div>
                            ${photoHtml}
                        </div>
                    </div>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                        <thead>
                            <tr style="background-color: #fff; border: 1px solid #000;">
                                <th style="padding: 10px; text-align: left; font-weight: 900; border: 1px solid #000; color: #000;">বিবরণ (Description)</th>
                                <th style="padding: 10px; text-align: right; width: 120px; font-weight: 900; border: 1px solid #000; color: #000;">টাকা (Amount)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${(() => {
                    const groups = {};
                    const allocs = details.allocated || (Array.isArray(details) ? details : []);
                    allocs.forEach(item => {
                        const parts = item.description ? item.description.split(' - ') : [];
                        const name = parts[0] || item.feeName || 'তথ্য নেই';
                        const basicDetail = parts.length > 1 ? parts.slice(1).join(' - ') : (item.itemLabel || '');

                        let detailStr = basicDetail;
                        const amount = parseFloat(item.amount);
                        const waiver = parseFloat(item.waiver || 0);
                        const itemRemaining = parseFloat(item.itemRemaining || 0);

                        // Calculate due after this payment
                        const dueAfter = itemRemaining - amount;
                        const extras = [];

                        if (waiver > 0) extras.push(`মওকুফ: ৳${waiver}`);
                        // Only show "Due" calculation if we have the original remaining data (new payments)
                        if (item.itemRemaining !== undefined && dueAfter > 0.01) extras.push(`বকেয়া: ৳${dueAfter}`);

                        // Append extras to detail string
                        if (extras.length > 0) {
                            detailStr += ` <span style="font-weight: normal; color: #555;">(${extras.join(', ')})</span>`;
                        }

                        if (!groups[name]) groups[name] = { total: 0, details: [] };
                        groups[name].total += parseFloat(item.amount);
                        if (detailStr && !groups[name].details.includes(detailStr)) groups[name].details.push(detailStr);
                    });
                    return Object.entries(groups).map(([name, data]) => `
                                    <tr>
                                        <td style="padding: 10px; border: 1px solid #000; color: #000;">
                                            <div style="font-weight: 700; color: #000; margin-bottom: 2px;">${name}</div>
                                            ${data.details.length > 0 ? `<div style="font-size: 11px; color: #000;">${data.details.join(', ')}</div>` : ''}
                                        </td>
                                        <td style="padding: 10px; border: 1px solid #000; text-align: right; font-weight: 700; color: #000;">${data.total.toLocaleString()}</td>
                                    </tr>`).join('');
                })()}
                            ${details.wallet > 0 ? `<tr><td style="padding: 10px; border: 1px solid #000; font-style: italic; color: #000;">ওয়ালেট / অগ্রিম জমা (Advance Credit)</td><td style="padding: 10px; border: 1px solid #000; text-align: right; font-weight: 700; color: #000;">${details.wallet.toLocaleString()}</td></tr>` : ''}
                        </tbody>
                        <tfoot>
                            <tr style="background: #fff;">
                                <td style="padding: 10px; text-align: right; font-weight: 900; border: 1px solid #000; color: #000;">মোট জমা (Total Collected)</td>
                                <td style="padding: 10px; text-align: right; font-weight: 900; font-size: 16px; border: 1px solid #000; color: #000;">৳${amount.toLocaleString()}</td>
                            </tr>
                            ${t.prevDue !== undefined ? `<tr><td colspan="2" style="padding: 10px; border: 1px solid #000; text-align: right; font-size: 12px; color: #000;"><span style="margin-right: 20px;">পূর্বের বকেয়া: ৳${t.prevDue.toLocaleString()}</span><strong>বর্তমান বকেয়া: ৳${t.remainingDue.toLocaleString()}</strong></td></tr>` : ''}
                        </tfoot>
                    </table>
                    <div style="font-size: 12px; font-weight: 700; color: #000; margin-bottom: 40px; font-style: italic;">কথায়: ${convertNumberToBanglaWords(amount)} টাকা মাত্র।</div>
                    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                        <div style="text-align: center; width: 150px;"><div style="height: 40px;"></div><div style="border-top: 1.5px solid #111; padding-top: 5px; font-size: 12px; font-weight: 700;">আদায়কারীর স্বাক্ষর</div></div>
                        <div style="text-align: center; width: 150px;"><div style="height: 40px;"></div><div style="border-top: 1.5px solid #111; padding-top: 5px; font-size: 12px; font-weight: 700;">কর্তৃপক্ষের স্বাক্ষর</div></div>
                    </div>
                </div>`;

            document.getElementById('receipt-print-content').innerHTML = `<div class="bg-white shadow-lg a5-page mx-auto relative overflow-hidden">${printContent}</div>`;

            // Populate SMS Text Tab
            const smsText = generatePaymentText(t);
            const smsArea = document.getElementById('receipt-sms-text');
            if (smsArea) smsArea.value = smsText;

            // Populate Allocation Detail Tab
            const detailList = document.getElementById('receipt-allocation-list');
            if (detailList) {
                let html = '';
                const allocItems = details.allocated || (Array.isArray(details) ? details : []);
                allocItems.forEach(item => {
                    html += `
                        <div class="flex justify-between items-center p-3 bg-white border border-gray-100 rounded-xl">
                            <div>
                                <p class="text-xs font-bold text-gray-800">${item.feeName}</p>
                                <p class="text-[10px] text-gray-500">${item.itemLabel}</p>
                            </div>
                            <p class="text-sm font-black text-indigo-600">৳${item.amount.toLocaleString()}</p>
                        </div>
                    `;
                });
                detailList.innerHTML = html;
            }

            // Set default tab and show modal
            switchReceiptTab('visual');
            document.getElementById('receipt-preview-modal').classList.remove('hidden');

            // Auto-trigger browser print after a short delay for rendering
            setTimeout(() => {
                window.print();
            }, 500);
        }

        function triggerBrowserPrint() {
            window.print();
        }

        function downloadReceiptAsImage() {
            const element = document.getElementById("receipt-print-content");
            if (!element) return;
            const btn = document.querySelector('button[onclick="downloadReceiptAsImage()"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> প্রসেসিং...`;
            btn.disabled = true;

            html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#ffffff" }).then(canvas => {
                const link = document.createElement("a");
                link.download = `Receipt_${new Date().getTime()}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                btn.innerHTML = originalText;
                btn.disabled = false;
                lucide.createIcons();
                showToast("রশিদ ডাউনলোড শুরু হয়েছে!");
            }).catch(err => {
                console.error("Image generation failed:", err);
                showToast("ইমেজ জেনারেট করতে সমস্যা হয়েছে");
                btn.innerHTML = originalText;
                btn.disabled = false;
                lucide.createIcons();
            });
        }

        function copyPaymentText() {
            if (!pendingPayment) return;
            const text = generatePaymentText(pendingPayment);
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => showToast('রশিদ কপি করা হয়েছে!')).catch(() => fallbackCopyTextToClipboard(text));
            } else {
                fallbackCopyTextToClipboard(text);
            }
        }

        function fallbackCopyTextToClipboard(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed"; textArea.style.opacity = "0";
            document.body.appendChild(textArea);
            textArea.focus(); textArea.select();
            try {
                if (document.execCommand('copy')) showToast('রশিদ কপি করা হয়েছে!');
                else showToast('কপি ব্যর্থ হয়েছে');
            } catch (err) { showToast('কপি করতে সমস্যা হয়েছে'); }
            document.body.removeChild(textArea);
        }

        function shareMoneyReceipt() {
            sendDirectSMS();
        }

        function sendDirectSMS() {
            let mobile = '';
            if (pendingPayment && pendingPayment.studentMobile) {
                mobile = pendingPayment.studentMobile;
            } else if (window.lastModalMobile) {
                mobile = window.lastModalMobile;
            }

            if (!mobile) return showToast('শিক্ষার্থীর মোবাইল নম্বর নেই');

            let text = '';
            const modalText = document.getElementById('receipt-sms-text');
            const confirmText = document.getElementById('mobile-receipt-text');
            const desktopText = document.getElementById('desktop-receipt-text');

            if (modalText && !modalText.closest('.hidden')) {
                text = modalText.value;
            } else if (confirmText && !confirmText.closest('.hidden')) {
                text = confirmText.value;
            } else if (desktopText && !desktopText.closest('.hidden')) {
                text = desktopText.value;
            } else if (pendingPayment) {
                text = generatePaymentText(pendingPayment);
            }

            if (!text) return showToast('শেয়ার করার জন্য কোনো টেক্সট পাওয়া যায়নি');

            window.location.href = `sms:${mobile.replace(/\D/g, '')}?body=${encodeURIComponent(text)}`;
        }

        function sendDirectWhatsApp() {
            let mobile = '';
            if (pendingPayment && pendingPayment.studentMobile) {
                mobile = pendingPayment.studentMobile;
            } else if (window.lastModalMobile) {
                mobile = window.lastModalMobile;
            }

            if (!mobile) return showToast('শিক্ষার্থীর মোবাইল নম্বর নেই');

            let text = '';
            const modalText = document.getElementById('receipt-sms-text');
            const confirmText = document.getElementById('mobile-receipt-text');
            const desktopText = document.getElementById('desktop-receipt-text');

            if (modalText && !modalText.closest('.hidden')) {
                text = modalText.value;
            } else if (confirmText && !confirmText.closest('.hidden')) {
                text = confirmText.value;
            } else if (desktopText && !desktopText.closest('.hidden')) {
                text = desktopText.value;
            } else if (pendingPayment) {
                text = generatePaymentText(pendingPayment);
            }

            if (!text) return showToast('শেয়ার করার জন্য কোনো টেক্সট পাওয়া যায়নি');

            let cleanMobile = mobile.replace(/\D/g, '');
            if (cleanMobile.length === 11 && cleanMobile.startsWith('01')) cleanMobile = '88' + cleanMobile;
            window.open(`https://wa.me/${cleanMobile}?text=${encodeURIComponent(text)}`, '_blank');
        }

        // Helper: Number to Words (Simplified Bangla)
        function convertNumberToBanglaWords(num) {
            // Placeholder: A real implementation is complex. 
            // For now, returning numeric string. User can implement full library later.
            return num.toString();
        }
        // --- Fee Type Management Logic ---
        let editingFeeTypeId = null;

        function openAddFeeTypeModal(id = null) {
            editingFeeTypeId = id;
            const modal = document.getElementById('add-fee-type-modal');
            const modalTitle = modal.querySelector('h3');

            // Populate class inputs first
            const container = document.getElementById('class-fee-inputs');
            if (!classes || classes.length === 0) {
                container.innerHTML = '<p class="col-span-full text-gray-500 text-sm">কোনো ক্লাস নেই। আগে ক্লাস যোগ করুন।</p>';
            } else {
                container.innerHTML = classes.map(cls => `
                    <div>
                        <label class="block text-xs text-gray-600 mb-1">${cls}</label>
                        <input type="number" id="fee-amount-${cls}" placeholder="0" class="w-full p-2 border rounded text-sm focus:ring-1 focus:ring-green-500">
                    </div>
                `).join('');
            }

            if (id) {
                // Edit Mode
                const fee = feeTypes.find(f => f.id === id);
                if (!fee) return;

                modalTitle.textContent = 'ফি টাইপ এডিট করুন';
                document.getElementById('fee-name').value = fee.name;
                document.getElementById('fee-type').value = fee.type;
                document.getElementById('fee-start-date').value = fee.startDate;
                document.getElementById('fee-end-date').value = fee.endDate || '';

                // Type Specific Settings
                document.getElementById('monthly-fee-settings').classList.add('hidden');
                document.getElementById('optional-fee-settings').classList.add('hidden');

                if (fee.type === 'monthly') {
                    document.getElementById('monthly-fee-settings').classList.remove('hidden');
                    document.getElementById('fee-due-day').value = fee.dueDay || '';
                    document.getElementById('fee-days-before').value = fee.daysBefore !== undefined ? fee.daysBefore : '';
                } else if (fee.type === 'optional') {
                    document.getElementById('optional-fee-settings').classList.remove('hidden');
                    document.getElementById('fee-cycle-select').value = fee.feeCycle || 'monthly';
                }

                // Clear unused values just in case
                if (fee.type !== 'monthly') {
                    document.getElementById('fee-due-day').value = '';
                    document.getElementById('fee-days-before').value = '';
                }
                if (fee.type !== 'optional') {
                    document.getElementById('fee-cycle-select').value = 'monthly';
                }

                // Set class fees
                if (fee.classFees) {
                    Object.entries(fee.classFees).forEach(([cls, amt]) => {
                        const inp = document.getElementById(`fee-amount-${cls}`);
                        if (inp) inp.value = amt;
                    });
                }

                // Set discounts
                if (fee.discounts?.orphan) {
                    document.getElementById('discount-orphan').checked = true;
                    document.getElementById('discount-amount-orphan').value = fee.discounts.orphan;
                } else {
                    document.getElementById('discount-orphan').checked = false;
                    document.getElementById('discount-amount-orphan').value = '';
                }

                if (fee.discounts?.helpless) {
                    document.getElementById('discount-helpless').checked = true;
                    document.getElementById('discount-amount-helpless').value = fee.discounts.helpless;
                } else {
                    document.getElementById('discount-helpless').checked = false;
                    document.getElementById('discount-amount-helpless').value = '';
                }

            } else {
                // Add Mode
                modalTitle.textContent = 'নতুন ফি টাইপ যোগ করুন';
                document.getElementById('fee-name').value = '';
                document.getElementById('fee-type').value = 'monthly';
                // Set default date to today
                document.getElementById('fee-start-date').value = new Date().toISOString().split('T')[0];
                document.getElementById('fee-end-date').value = '';

                // Reset type settings
                document.getElementById('monthly-fee-settings').classList.remove('hidden'); // Default is monthly
                document.getElementById('optional-fee-settings').classList.add('hidden');

                document.getElementById('fee-due-day').value = '';
                document.getElementById('fee-days-before').value = '';
                document.getElementById('fee-cycle-select').value = 'monthly';

                // Clear class inputs
                container.querySelectorAll('input').forEach(i => i.value = '');

                // Clear discounts
                document.getElementById('discount-orphan').checked = false;
                document.getElementById('discount-amount-orphan').value = '';
                document.getElementById('discount-helpless').checked = false;
                document.getElementById('discount-amount-helpless').value = '';
            }

            modal.classList.remove('hidden');
            setTimeout(() => lucide.createIcons(), 10);
        }

        async function saveFeeType() {
            const name = document.getElementById('fee-name').value;
            const type = document.getElementById('fee-type').value;
            const startDate = document.getElementById('fee-start-date').value;
            const endDate = document.getElementById('fee-end-date').value;

            // New fields
            const dueDay = document.getElementById('fee-due-day').value;
            const daysBefore = document.getElementById('fee-days-before').value;
            const feeCycle = document.getElementById('fee-cycle-select').value;

            if (!name || !startDate) {
                return showToast('নাম এবং শুরুর তারিখ আবশ্যক!');
            }

            const classFees = {};
            let hasFee = false;
            classes.forEach(cls => {
                const val = document.getElementById(`fee-amount-${cls}`).value;
                if (val) {
                    classFees[cls] = parseFloat(val);
                    hasFee = true;
                }
            });

            if (!hasFee) {
                return showToast('অন্তত একটি ক্লাসের ফি নির্ধারণ করুন!');
            }

            const discounts = {};
            if (document.getElementById('discount-orphan').checked) {
                discounts['orphan'] = parseFloat(document.getElementById('discount-amount-orphan').value) || 0;
            }
            if (document.getElementById('discount-helpless').checked) {
                discounts['helpless'] = parseFloat(document.getElementById('discount-amount-helpless').value) || 0;
            }

            const newFee = {
                id: editingFeeTypeId || Date.now().toString(),
                name,
                type,
                startDate,
                endDate,
                dueDay: type === 'monthly' ? parseInt(dueDay) : null,
                daysBefore: type === 'monthly' ? parseInt(daysBefore) : null,
                feeCycle: type === 'optional' ? feeCycle : null,
                classFees,
                discounts,
                createdAt: editingFeeTypeId
                    ? (feeTypes.find(f => f.id === editingFeeTypeId)?.createdAt || new Date().toISOString())
                    : new Date().toISOString()
            };

            if (editingFeeTypeId) {
                const index = feeTypes.findIndex(f => f.id === editingFeeTypeId);
                if (index !== -1) {
                    feeTypes[index] = newFee;
                    showToast('ফি টাইপ আপডেট করা হয়েছে!');
                }
            } else {
                feeTypes.push(newFee);
                showToast('ফি টাইপ সফলভাবে তৈরি হয়েছে!');
            }

            await ShadowStorage.save(STORAGE_KEYS.feeTypes, feeTypes);
            renderFeeTypesGrid(); // Immediate UI refresh
            closeModal('add-fee-type-modal');
            if (typeof refreshAppUI === 'function') refreshAppUI();
        }

        function toggleFeeTypeCard(id) {
            const body = document.getElementById(`fee-type-body-${id}`);
            const icon = document.getElementById(`fee-type-icon-${id}`);

            if (body.style.maxHeight && body.style.maxHeight !== "0px") {
                body.style.maxHeight = "0px";
                icon.classList.remove('rotate-180');
            } else {
                body.style.maxHeight = "250px"; // Max height for scrolling
                icon.classList.add('rotate-180');
            }
        }

        // Student Search Toggle & Filter
        function toggleCollectSearch() {
            const container = document.getElementById('collect-search-container');
            const input = document.getElementById('collect-search-input');

            if (container.style.width === '32px') {
                container.style.width = '200px';
                input.classList.remove('opacity-0');
                input.focus();
            } else {
                if (input.value === '') {
                    container.style.width = '32px';
                    input.classList.add('opacity-0');
                }
            }
        }

        function filterStudentSelect() {
            const localInput = document.getElementById('collect-search-input');
            const globalInput = document.getElementById('student-search');
            // Determine active filter text from either input
            const filter = (localInput?.value || globalInput?.value || '').toLowerCase();
            const suggestionsBox = document.getElementById('fee-student-suggestions'); // This ID must exist in HTML

            if (!filter) {
                if (suggestionsBox) suggestionsBox.classList.add('hidden');
                return;
            }

            // Search in global students array instead of iterating select options
            const matches = students.filter(s =>
                (s.name || '').toLowerCase().includes(filter) ||
                (s.roll || '').toString().includes(filter) ||
                (s.class || '').toLowerCase().includes(filter) ||
                (s.mobile || '').includes(filter)
            );

            if (suggestionsBox) {
                if (matches.length === 0) {
                    suggestionsBox.innerHTML = `<div class="p-3 text-sm text-gray-500 text-center">কোনো শিক্ষার্থী পাওয়া যায়নি</div>`;
                } else {
                    suggestionsBox.innerHTML = matches.map(s => `
                        <div onclick="selectStudentFromSuggestion('${s.uid}')" 
                            class="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer flex justify-between items-center transition">
                            <div>
                                <div class="font-bold text-gray-800 text-sm">${s.name}</div>
                                <div class="text-xs text-gray-500">Class: ${s.class} | ID: ${s.id || '-'} | Roll: ${s.roll || '-'}</div>
                            </div>
                            <div class="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full font-medium">
                                Select
                            </div>
                        </div>
                    `).join('');
                }
                suggestionsBox.classList.remove('hidden');
            }
        }

        function selectStudentFromSuggestion(uid) {
            const select = document.getElementById('fee-student-select');
            if (select) {
                select.value = uid;
                // Trigger change event to load details
                if (typeof loadStudentFeeStatus === 'function') loadStudentFeeStatus();
            }

            // Hide suggestions and clear search
            const suggestionsBox = document.getElementById('fee-student-suggestions');
            if (suggestionsBox) suggestionsBox.classList.add('hidden');

            // Optional: Clear search inputs
            const localInput = document.getElementById('collect-search-input');
            const globalInput = document.getElementById('student-search');

            if (localInput) {
                localInput.value = '';
                // Only collapse if it was open - handled by toggleCollectSearch logic on blur usually
                // But for now, just clear text
            }
            if (globalInput) {
                globalInput.value = '';
            }
        }

        function toggleMainSearch() {
            const container = document.getElementById('main-search-container');
            const input = document.getElementById('student-search');
            const titleContainer = document.getElementById('header-title-container');
            const leftSide = document.getElementById('header-left-side');
            const headerActions = document.getElementById('header-actions');
            const icon = container.querySelector('i');

            if (container.style.width === '40px') {
                // Expand search
                container.style.width = window.innerWidth < 640 ? 'calc(100vw - 120px)' : '350px';
                input.classList.remove('opacity-0');

                if (titleContainer) {
                    titleContainer.classList.add('hidden');
                }

                // Show Filter Button
                const filterBtn = document.getElementById('adv-filter-toggle');
                if (filterBtn) {
                    filterBtn.classList.remove('opacity-0', 'pointer-events-none');
                }

                // Hide sister buttons on mobile to prevent overflow
                if (window.innerWidth < 640 && headerActions) {
                    Array.from(headerActions.children).forEach(child => {
                        if (child !== container) child.classList.add('hidden');
                    });
                }

                if (leftSide) leftSide.style.gap = '0';

                input.focus();

                // Switch to Active Theme
                icon.classList.remove('text-white');
                icon.classList.add('text-indigo-600');
            } else {
                if (input.value === '') {
                    // Collapse search
                    container.style.width = '40px';
                    input.classList.add('opacity-0');

                    if (titleContainer) {
                        titleContainer.classList.remove('hidden');
                    }

                    // Hide Filter Button
                    const filterBtn = document.getElementById('adv-filter-toggle');
                    if (filterBtn) {
                        filterBtn.classList.add('opacity-0', 'pointer-events-none');
                    }
                    // Hide Menu if open - DISABLED: Modal should persist
                    // const filterModal = document.getElementById('adv-filter-modal');
                    // if (filterModal) filterModal.classList.add('hidden');

                    if (headerActions) {
                        Array.from(headerActions.children).forEach(child => {
                            child.classList.remove('hidden');
                        });
                    }

                    if (leftSide) leftSide.style.gap = '0.75rem';

                    // Revert to Inactive Theme
                    icon.classList.add('text-white');
                    icon.classList.remove('text-indigo-600');
                }
            }
        }

        // Toggle Search Bar Animation
        function toggleFeeSearch() {
            const container = document.getElementById('fee-search-container');
            const input = document.getElementById('fee-search-input');

            if (container.style.width === '40px') {
                container.style.width = '200px'; // Expanded width
                input.classList.remove('opacity-0');
                input.focus();
            } else {
                if (input.value === '') {
                    container.style.width = '40px'; // Collapse if empty
                    input.classList.add('opacity-0');
                }
            }
        }

        function renderFeeTypesGrid() {
            const container = document.getElementById('fee-types-grid');
            if (!container) return;

            // Show/Hide Trash Button based on content
            const trashBtn = document.getElementById('fee-trash-btn');
            const hasTrash = feeTypes.some(f => f.deletedAt);
            if (trashBtn) {
                if (hasTrash) trashBtn.classList.remove('hidden');
                else trashBtn.classList.add('hidden');
            }

            // Search Logic (Global + Local)
            const localVal = document.getElementById('fee-search-input')?.value || '';
            const globalVal = document.getElementById('student-search')?.value || '';
            const searchVal = (localVal || globalVal).toLowerCase();
            const filteredFees = feeTypes.filter(f =>
                !f.deletedAt &&
                (f.name.toLowerCase().includes(searchVal) ||
                    f.type.toLowerCase().includes(searchVal))
            );

            if (!filteredFees || filteredFees.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center text-gray-400 py-12">
                        <i data-lucide="inbox" class="w-16 h-16 mx-auto mb-3 opacity-50"></i>
                        <p>${searchVal ? 'কোনো ফি পাওয়া যায়নি' : 'কোনো ফি নেই। নতুন ফি যোগ করুন।'}</p>
                    </div>`;
            } else {
                container.innerHTML = filteredFees.map(fee => `
                    <div class="bg-white rounded-xl border shadow-sm hover:shadow-md transition relative group overflow-hidden">
                        <!-- Header (Click to Toggle) -->
                        <div class="p-4 cursor-pointer bg-white z-10 relative" onclick="toggleFeeTypeCard('${fee.id}')">
                            <div class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition z-20" onclick="event.stopPropagation()">
                                <button onclick="openAddFeeTypeModal('${fee.id}')" class="text-blue-500 hover:text-blue-700 p-1 bg-blue-50 rounded-full hover:bg-blue-100 shadow-sm" title="এডিট করুন">
                                    <i data-lucide="edit-2" class="w-4 h-4"></i>
                                </button>
                                <button onclick="deleteFeeType('${fee.id}')" class="text-red-500 hover:text-red-700 p-1 bg-red-50 rounded-full hover:bg-red-100 shadow-sm" title="ডিলিট করুন">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                            </div>
                            
                            <div class="flex items-center gap-3">
                                <div class="p-2 bg-green-50 text-green-600 rounded-lg shrink-0">
                                    <i data-lucide="banknote" class="w-5 h-5"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h5 class="font-bold text-gray-800 truncate">${fee.name}</h5>
                                </div>
                                <i id="fee-type-icon-${fee.id}" data-lucide="chevron-down" class="w-5 h-5 text-gray-400 transition-transform duration-300"></i>
                            </div>
                        </div>

                        <!-- Collapsible Body -->
                        <div id="fee-type-body-${fee.id}" class="transition-all duration-300 ease-in-out px-4 overflow-y-auto custom-scrollbar" style="max-height: 0; overflow: hidden;">
                            <div class="pb-4 space-y-3 border-t pt-3">
                                <div class="space-y-1">
                                    <p class="text-xs text-gray-500 flex items-center gap-1">
                                        <i data-lucide="calendar" class="w-3 h-3"></i> 
                                        শুরু: ${fee.startDate}
                                    </p>
                                    ${fee.endDate ? `<p class="text-xs text-gray-500 flex items-center gap-1"><i data-lucide="calendar-off" class="w-3 h-3"></i> শেষ: ${fee.endDate}</p>` : ''}
                                </div>

                                <div class="bg-gray-50 rounded p-2">
                                    <p class="text-[10px] font-bold text-gray-600 mb-1 uppercase tracking-wider">ক্লাস রেট</p>
                                    <div class="flex flex-wrap gap-1">
                                        ${Object.entries(fee.classFees).map(([cls, amt]) => `
                                            <span class="text-xs bg-white border px-1.5 py-0.5 rounded text-gray-700 shadow-sm">${cls}: ৳${amt}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            setTimeout(() => lucide.createIcons(), 10);
        }

        async function deleteFeeType(id) {
            // Soft Delete Implementation
            if (typeof customConfirm === 'function') {
                if (await customConfirm('আপনি কি নিশ্চিত যে আপনি এই ফি টাইপটি ট্র্যাশে পাঠাতে চান?', 'ট্র্যাশে মুভ করুন')) {
                    executeSoftDelete(id);
                }
            } else {
                if (confirm('আপনি কি নিশ্চিত যে আপনি এই ফি টাইপটি ট্র্যাশে পাঠাতে চান?')) {
                    executeSoftDelete(id);
                }
            }

            async function executeSoftDelete(targetId) {
                const sId = String(targetId);
                const index = feeTypes.findIndex(f => String(f.id) === sId);

                if (index !== -1) {
                    const feeName = feeTypes[index].name;

                    // New: Ask for data cleanup
                    const shouldCleanup = await customConfirm('এই ফি টাইপটির সকল বকেয়া এবং পরিশোধিত তথ্য কি শিক্ষার্থীদের প্রোফাইল থেকেও মুছে দিতে চান? (Paid data মুছলে ট্রানজেকশন অ্যামাউন্ট কমে যাবে)', 'পুরো ডাটা মুছুন');

                    if (shouldCleanup) {
                        try {
                            // 1. Clear student-specific data (Overrides and Waivers)
                            students.forEach(student => {
                                if (student.feeOverrides) {
                                    Object.keys(student.feeOverrides).forEach(key => {
                                        if (key.startsWith(sId + '-')) delete student.feeOverrides[key];
                                    });
                                }
                                if (student.waivers) {
                                    Object.keys(student.waivers).forEach(key => {
                                        if (key.startsWith(sId + '-') || key === feeName) delete student.waivers[key];
                                    });
                                }
                            });

                            // 2. Clear Payment records
                            feePayments.forEach(payment => {
                                const alloc = payment.details ? payment.details.allocated : (payment.allocation || []);
                                if (Array.isArray(alloc)) {
                                    let removedAmount = 0;
                                    const remainingAlloc = alloc.filter(item => {
                                        if (String(item.feeId) === sId) {
                                            removedAmount += parseFloat(item.amount || 0);
                                            return false;
                                        }
                                        return true;
                                    });

                                    if (removedAmount > 0) {
                                        payment.amount = Math.max(0, parseFloat(payment.amount) - removedAmount);
                                        if (payment.details) payment.details.allocated = remainingAlloc;
                                        payment.allocation = remainingAlloc;

                                        // If amount becomes 0, mark payment as deleted
                                        if (payment.amount < 0.01) {
                                            payment.deleted = true;
                                            payment.deletedAt = new Date().toISOString();
                                        }
                                    }
                                }
                            });

                            // Save with full synchronization
                            if (typeof ShadowStorage !== 'undefined') {
                                await ShadowStorage.save(STORAGE_KEYS.students, students);
                                await ShadowStorage.save(STORAGE_KEYS.feePayments, feePayments);
                            } else {
                                localStorage.setItem(STORAGE_KEYS.students, JSON.stringify(students));
                                localStorage.setItem(STORAGE_KEYS.feePayments, JSON.stringify(feePayments));
                            }
                        } catch (err) {
                            console.error('Error during fee cleanup:', err);
                            showToast('ডাটা ক্লিনিং করার সময় সমস্যা হয়েছে', 'error');
                        }
                    }

                    // Mark as deleted instead of removing
                    feeTypes[index].deletedAt = new Date().toISOString();
                    localStorage.setItem('cc_fee_types', JSON.stringify(feeTypes));

                    renderFeeTypesGrid();
                    if (typeof refreshAppUI === 'function') refreshAppUI();
                    showToast(shouldCleanup ? 'ফি এবং সংশ্লিষ্ট ডাটা মুছে ফেলা হয়েছে' : 'ফি টাইপ ট্র্যাশে পাঠানো হয়েছে');
                } else {
                    console.warn('Fee deletion failed: ID not found', sId);
                    showToast('ফি খুঁজে পাওয়া যায়নি', 'error');
                }
            }
        }

        // --- FEE TRASH MANAGEMENT ---
        function openFeeTrashModal() {
            const trashItems = feeTypes.filter(f => f.deletedAt);
            const modalId = 'fee-trash-modal-dynamic';
            let modal = document.getElementById(modalId);

            // Remove existing modal if present to ensure fresh render
            if (modal) modal.remove();

            const html = `
                <div id="${modalId}" class="fixed inset-0 bg-black/50 z-[700] flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in">
                    <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden animate-slide-up">
                        <div class="p-4 border-b bg-rose-50 flex justify-between items-center">
                            <div class="flex items-center gap-2 text-rose-700">
                                <i data-lucide="trash-2" class="w-5 h-5"></i>
                                <h3 class="font-bold text-lg">রিসাইকেল বিন (Recycle Bin)</h3>
                            </div>
                            <button onclick="document.getElementById('${modalId}').remove()" class="text-rose-400 hover:text-rose-600 p-1 rounded-full hover:bg-rose-100 transition">
                                <i data-lucide="x" class="w-6 h-6"></i>
                            </button>
                        </div>
                        
                        <div class="p-4 overflow-y-auto flex-1 bg-gray-50/50">
                            ${trashItems.length === 0 ? `
                                <div class="text-center text-gray-400 py-12 flex flex-col items-center">
                                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                        <i data-lucide="trash" class="w-8 h-8 text-gray-300"></i>
                                    </div>
                                    <p>ট্র্যাশ খালি (Empty)</p>
                                </div>
                            ` : `
                                <div class="space-y-3">
                                    ${trashItems.map(item => {
                const delDate = new Date(item.deletedAt);
                const expiryDate = new Date(delDate.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
                const daysLeft = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));

                return `
                                        <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-rose-100 transition-colors">
                                            <div>
                                                <h4 class="font-bold text-gray-800">${item.name}</h4>
                                                <div class="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                    <span class="bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded flex items-center gap-1">
                                                        <i data-lucide="clock" class="w-3 h-3"></i> ${daysLeft} দিন বাকি
                                                    </span>
                                                    <span>Deleted: ${delDate.toLocaleDateString('bn-BD')}</span>
                                                </div>
                                            </div>
                                            <div class="flex gap-2">
                                                <button onclick="restoreFeeType('${item.id}')" 
                                                    class="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition" title="Restore">
                                                    <i data-lucide="refresh-ccw" class="w-4 h-4"></i>
                                                </button>
                                                <button onclick="permanentDeleteFeeType('${item.id}')" 
                                                    class="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition" title="Delete Forever">
                                                    <i data-lucide="x" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </div>
                                        `;
            }).join('')}
                                </div>
                            `}
                        </div>

                        ${trashItems.length > 0 ? `
                        <div class="p-3 bg-gray-50 border-t text-center">
                            <p class="text-xs text-gray-500 flex items-center justify-center gap-1">
                                <i data-lucide="info" class="w-3 h-3"></i>
                                ৭ দিন পর আইটেমগুলো স্বয়ংক্রিয়ভাবে মুছে যাবে
                            </p>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML('beforeend', html);
            lucide.createIcons();
        }

        async function restoreFeeType(id) {
            const index = feeTypes.findIndex(f => String(f.id) === String(id));
            if (index !== -1) {
                delete feeTypes[index].deletedAt; // Remove deleted mark
                localStorage.setItem('cc_fee_types', JSON.stringify(feeTypes));
                renderFeeTypesGrid();
                openFeeTrashModal(); // Refresh trash view
                if (typeof refreshAppUI === 'function') refreshAppUI();
                showToast('ফি রিস্টোর করা হয়েছে');
            }
        }

        async function permanentDeleteFeeType(id) {
            if (await customConfirm('আপনি কি নিশ্চিত যে আপনি এটি চিরতরে মুছে ফেলতে চান? এটি আর ফিরিয়ে আনা যাবে না।', 'চিরতরে ডিলিট')) {
                const initialLen = feeTypes.length;
                feeTypes = feeTypes.filter(f => String(f.id) !== String(id));
                localStorage.setItem('cc_fee_types', JSON.stringify(feeTypes));

                openFeeTrashModal(); // Refresh trash UI
                renderFeeTypesGrid(); // Should technically not change main grid but good practice
                if (typeof refreshAppUI === 'function') refreshAppUI();
                showToast('ফি চিরতরে মুছে ফেলা হয়েছে');
            }
        }

        function cleanupTrash() {
            const now = new Date();
            const retentionPeriod = 7 * 24 * 60 * 60 * 1000; // 7 Days in ms

            const initialCount = feeTypes.length;
            feeTypes = feeTypes.filter(f => {
                if (!f.deletedAt) return true; // Keep active items
                const delTime = new Date(f.deletedAt).getTime();
                return (now.getTime() - delTime) < retentionPeriod; // Keep if younger than 7 days
            });

            if (feeTypes.length !== initialCount) {
                console.log(`Auto-cleaned ${initialCount - feeTypes.length} trash items.`);
                localStorage.setItem('cc_fee_types', JSON.stringify(feeTypes));
                renderFeeTypesGrid();
            }
        }

        // --- DUE REPORT & SHARE FUNCTIONS ---
        function shareStudentFeeReport(uid) {
            const student = students.find(s => s.uid === uid);
            if (!student) return;

            const numbers = student.mobile ? student.mobile.replace(/\D/g, '') : '';
            const formattedNum = numbers.startsWith('88') ? numbers : (numbers.startsWith('0') ? '88' + numbers : numbers);

            const financials = calculateStudentFinancials(student);
            if (financials.balance <= 0) {
                showToast("কোনো বকেয়া নেই! (No Dues)");
                return;
            }

            const displayId = student.id || student.uid;
            const instituteName = localStorage.getItem('institute_name') || 'Institute';
            const date = new Date().toLocaleDateString('bn-BD');

            // Draft Simple Message
            let msg = `বকেয়া রিপোর্ট\n`;
            msg += `${instituteName}\n`;
            msg += `তারিখ: ${date}\n`;
            msg += `শিক্ষার্থী: ${student.name} (ID: ${displayId})\n`;
            msg += `মোট বকেয়া: ৳${financials.balance}\n\n`;

            msg += `বিবরণ:\n`;
            financials.details.forEach(fee => {
                if (fee.balance > 0) {
                    msg += `• ${fee.name}: ৳${fee.balance}\n`;
                    let itemTexts = [];
                    if (fee.unpaidItems && fee.unpaidItems.length > 0) {
                        itemTexts.push(...fee.unpaidItems.map(ui => `${ui.label} (৳${ui.amount})`));
                    }
                    if (fee.partialItems && fee.partialItems.length > 0) {
                        itemTexts.push(...fee.partialItems.map(p => `${p.label} (বকেয়া: ৳${p.remaining})`));
                    }
                    if (itemTexts.length > 0) {
                        msg += `  (${itemTexts.join(', ')})\n`;
                    }
                }
            });
            msg += `\nঅনুগ্রহ করে বকেয়া পরিশোধ করুন। ধন্যবাদ।`;

            // Open Action Modal or Direct Link
            // Since browsers block automated window.open logic sometimes, let's show a simple choice modal using SweetAlert style or just standard prompt? 
            // Let's use a custom modal for better UX if possible, but for now standard confirm/prompt is tricky for dual choice.
            // We will inject a simple choices modal dynamically.

            // Create a temporary modal
            const modalId = 'share-choice-modal-' + Date.now();
            const modalHtml = `
                <div id="${modalId}" class="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in">
                    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
                        <div class="p-4 border-b bg-gray-50 flex justify-between items-center">
                            <h3 class="font-bold text-gray-800">শেয়ার অপশন</h3>
                            <button onclick="document.getElementById('${modalId}').remove()" class="text-gray-500 hover:text-red-500"><i data-lucide="x" class="w-5 h-5"></i></button>
                        </div>
                        <div class="p-5 space-y-3">
                             <a href="sms:${formattedNum}?body=${encodeURIComponent(msg)}"  onclick="document.getElementById('${modalId}').remove()"
                                class="flex items-center justify-center w-full gap-2 p-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition shadow-sm">
                                <i data-lucide="message-square" class="w-5 h-5"></i> Send SMS
                             </a>
                             <a href="https://wa.me/${formattedNum}?text=${encodeURIComponent(msg)}" target="_blank" onclick="document.getElementById('${modalId}').remove()"
                                class="flex items-center justify-center w-full gap-2 p-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition shadow-sm">
                                <i data-lucide="message-circle" class="w-5 h-5"></i> Send WhatsApp
                             </a>
                             <div class="mt-4 pt-3 border-t">
                                <label class="text-xs font-bold text-gray-500 uppercase">Message Preview:</label>
                                <textarea readonly class="w-full h-32 text-xs border rounded p-2 mt-1 bg-gray-50 focus:outline-none resize-none">${msg}</textarea>
                             </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            lucide.createIcons();
        }

        function shareFeeDueReport(uid) {
            const student = students.find(s => s.uid === uid);
            if (!student) return;

            const msg = generateDueReportText(student);
            const numbers = student.mobile ? student.mobile.replace(/\D/g, '') : '';
            const formattedNum = numbers.startsWith('88') ? numbers : (numbers.startsWith('0') ? '88' + numbers : numbers);
            window.lastModalMobile = student.mobile;

            // Create enhanced modal with copy button
            const modalId = 'share-due-modal-' + Date.now();
            const modalHtml = `
                <div id="${modalId}" class="fixed inset-0 bg-black/60 z-[700] flex items-center justify-center backdrop-blur-sm p-4 animate-fade-in">
                    <div class="bg-white rounded-xl shadow-2xl w-full max-md overflow-hidden relative">
                        <!-- Header Close Button -->
                        <button onclick="document.getElementById('${modalId}').remove()" 
                            class="absolute top-3 right-3 p-1.5 text-white/70 hover:text-white transition-all z-50">
                            <i data-lucide="x" class="w-5 h-5"></i>
                        </button>
                        
                        <div class="p-4 border-b bg-gradient-to-r from-green-600 to-emerald-600 flex items-center pr-12">
                            <h3 class="font-bold text-white">বকেয়া রিপোর্ট শেয়ার করুন</h3>
                        </div>
                        <div class="p-5 space-y-3">
                            <div class="border rounded-lg p-3 bg-gray-50">
                                <label class="text-xs font-bold text-gray-600 uppercase mb-2 block">Message Preview:</label>
                                <textarea id="due-msg-${modalId}" readonly class="w-full h-48 text-xs border-0 rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none font-mono">${msg}</textarea>
                            </div>
                            
                            <button onclick="copyDueMessage('due-msg-${modalId}')" 
                                class="flex items-center justify-center w-full gap-2 p-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition shadow-sm">
                                <i data-lucide="copy" class="w-5 h-5"></i> কপি করুন (Copy)
                            </button>
                            
                            <div class="grid grid-cols-2 gap-2">
                                <a href="sms:${formattedNum}?body=${encodeURIComponent(msg)}" onclick="document.getElementById('${modalId}').remove()"
                                    class="flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition shadow-sm text-sm">
                                    <i data-lucide="message-square" class="w-4 h-4"></i> SMS
                                </a>
                                <a href="https://wa.me/${formattedNum}?text=${encodeURIComponent(msg)}" target="_blank" onclick="document.getElementById('${modalId}').remove()"
                                    class="flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition shadow-sm text-sm">
                                    <i data-lucide="message-circle" class="w-4 h-4"></i> WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            lucide.createIcons();
        }

        function copyDueMessage(textareaId) {
            const textarea = document.getElementById(textareaId);
            if (!textarea) return;

            textarea.select();
            textarea.setSelectionRange(0, 99999); // For mobile

            copyToClipboard(textarea.value).then(() => {
                showToast('✅ মেসেজ কপি হয়েছে!');
            });
        }


        function printStudentFeeReport(uid) {
            const student = students.find(s => s.uid === uid);
            if (!student) return;

            document.getElementById('receipt-print-content').innerHTML = generateIndivDueReportHTML(student);

            // Populate SMS Text Tab for Due Report
            const smsArea = document.getElementById('receipt-sms-text');
            if (smsArea) smsArea.value = generateDueReportText(student);
            window.lastModalMobile = student.mobile;

            document.getElementById('receipt-preview-modal').classList.remove('hidden');
            switchReceiptTab('visual');

            setTimeout(() => { window.print(); }, 500);
        }

        function displayReportInModal(html) {
            const content = document.getElementById('receipt-print-content');
            const modal = document.getElementById('receipt-preview-modal');
            if (content && modal) {
                content.innerHTML = html;
                modal.classList.remove('hidden');
                if (typeof switchReceiptTab === 'function') {
                    switchReceiptTab('visual');
                }
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        }

        function printBatchDueReports() {
            if (selectedStudents.length === 0) return showToast("কোনো শিক্ষার্থী নির্বাচন করা হয়নি");

            const batchHtml = selectedStudents.map(uid => {
                const s = students.find(st => st.uid === uid);
                return s ? generateIndivDueReportHTML(s) : '';
            }).join('');

            displayReportInModal(batchHtml);

            // Auto-print after a short delay to ensure rendering
            setTimeout(() => { window.print(); }, 800);
        }

        // --- PAYMENT UI HELPER FUNCTIONS ---

        function generatePaymentText(t) {
            const date = new Date(t.date).toLocaleDateString('bn-BD');
            const instituteName = instituteInfo.name || 'Class Connect Academy';

            let text = `মানি রিসিট (Receipt)\n`;
            text += `${instituteName}\n`;
            text += `================\n`;

            const studentObj = students.find(s => s.uid === t.uid);
            const displayId = studentObj && studentObj.id ? studentObj.id : t.uid;

            text += `আইডি: ${displayId}\n`;
            text += `শিক্ষার্থী: ${t.studentName}\n`;
            text += `ক্লাস: ${t.studentClass}\n`;
            if (t.studentRoll && t.studentRoll !== 'N/A' && t.studentRoll !== '--') {
                text += `রোল: ${t.studentRoll}\n`;
            }
            text += `তারিখ: ${date}\n`;

            const displayAmount = t.finalAmount !== undefined ? t.finalAmount : t.amount;
            text += `জমাঃ ৳${displayAmount.toLocaleString()}\n`;
            text += `_________________\n`;

            const details = t.finalDetails || t.allocation;
            if (details && details.length > 0) {
                text += `বিবরণ (Details):\n`;
                details.forEach(item => {
                    text += `   • ${item.name || item.feeName}: ৳${item.amount}\n`;
                });
            } else if (details && details.allocated) {
                text += `বিবরণ (Details):\n`;
                details.allocated.forEach(item => {
                    text += `   • ${item.description || item.feeName}: ৳${item.amount}\n`;
                });
                if (details.wallet > 0) {
                    text += `   • ওয়ালেট: ৳${details.wallet}\n`;
                }
            }

            if (t.remainingDue !== undefined && t.remainingDue > 0) {
                text += `বকেয়া: ৳${t.remainingDue.toLocaleString()}\n`;
            }

            text += `\nTrxID: ${t.id}\n`;
            text += `পেমেন্ট সফল হয়েছে। ধন্যবাদ!`;
            return text;
        }

        function renderSidePanelSuccess(t) {
            const container = document.getElementById('desktop-fee-panel-container');
            if (!container) return;

            // Use t.finalAmount if set, else t.amount
            const displayAmount = t.finalAmount !== undefined ? t.finalAmount : t.amount;
            const receiptText = generatePaymentText(t);

            container.innerHTML = `
                <div class="h-full flex flex-col relative w-full animated fade-in-up">
                    <div class="flex-1 flex flex-col items-center p-6 space-y-4 overflow-y-auto">
                        <div class="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-200 shrink-0">
                            <i data-lucide="check" class="w-8 h-8"></i>
                        </div>
                        
                        <div class="text-center">
                            <h2 class="text-xl font-bold text-gray-800">পেমেন্ট সফল হয়েছে!</h2>
                            <p class="text-3xl font-bold text-gray-800 my-2">৳${displayAmount}</p>
                            <span class="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                TrxID: ${t.id}
                            </span>
                        </div>

                        <!-- Editable Receipt Text Area -->
                        <div class="w-full bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div class="flex justify-between items-center mb-2">
                                <label class="text-xs font-bold text-gray-500 uppercase">রশিদ টেক্সট (এডিট করা যাবে)</label>
                                <button onclick="copyTextFromElement('desktop-receipt-text')" class="text-indigo-600 hover:text-indigo-800 text-xs font-bold flex items-center gap-1">
                                    <i data-lucide="copy" class="w-3 h-3"></i> কপি
                                </button>
                            </div>
                            <textarea id="desktop-receipt-text" class="w-full h-32 text-xs font-mono p-2 border rounded bg-white focus:ring-1 focus:ring-indigo-500 outline-none text-gray-700 resize-none">${receiptText}</textarea>
                        </div>
                    </div>

                    <div class="p-4 border-t bg-white shrink-0 space-y-3">
                         <button onclick="printMoneyReceipt()" class="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition shadow-lg flex items-center justify-center gap-2">
                            <i data-lucide="printer" class="w-4 h-4"></i> রশিদ প্রিন্ট করুন
                        </button>
                        
                         <button onclick="openStudentFeeDetails('${t.uid}')" class="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition">
                            বন্ধ করুন
                        </button>
                    </div>
                </div>
            `;
            lucide.createIcons();
        }

        function copyTextFromElement(elementId) {
            const el = document.getElementById(elementId);
            if (!el) return showToast('Error: Text element not found');

            const text = el.value;

            // API Copy (Secure Context)
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast('রশিদ কপি করা হয়েছে!');
                }).catch(err => {
                    console.warn('Clipboard API failed, trying fallback...', err);
                    fallbackCopyTextToClipboard(text);
                });
            } else {
                // Flash select fallback for textarea
                el.select();
                try {
                    document.execCommand('copy');
                    showToast('রশিদ কপি করা হয়েছে! (Local)');
                } catch (e) {
                    fallbackCopyTextToClipboard(text);
                }
            }
        }

        function fallbackCopyTextToClipboard(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;

            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            textArea.style.opacity = "0"; // Invisible but selectable

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    showToast('রশিদ কপি করা হয়েছে! (Local)');
                } else {
                    showToast('কপি ব্যর্থ হয়েছে');
                }
            } catch (err) {
                console.error('Fallback copy failed', err);
                showToast('কপি করতে সমস্যা হয়েছে');
            }

            document.body.removeChild(textArea);
        }

// ===== Block 4: Institute Settings =====
        // --- Institute Settings ---
        function openInstituteSettings() {
            document.getElementById('institute-name-input').value = instituteInfo.name || '';
            document.getElementById('institute-address-input').value = instituteInfo.address || '';
            document.getElementById('institute-contact-input').value = instituteInfo.contact || '';
            document.getElementById('institute-eiin-input').value = instituteInfo.eiin || '';
            document.getElementById('institute-established-input').value = instituteInfo.established || '';
            document.getElementById('institute-id-limit-input').value = instituteInfo.idLimit || 3;

            document.getElementById('institute-settings-modal').classList.remove('hidden');
        }

        function saveInstituteSettings() {
            instituteInfo = {
                name: document.getElementById('institute-name-input').value.trim() || 'Class Connect Academy',
                address: document.getElementById('institute-address-input').value.trim(),
                contact: document.getElementById('institute-contact-input').value.trim(),
                eiin: document.getElementById('institute-eiin-input').value.trim(),
                established: document.getElementById('institute-established-input').value.trim(),
                idLimit: parseInt(document.getElementById('institute-id-limit-input').value) || 3
            };

            ShadowStorage.save(STORAGE_KEYS.instituteInfo, instituteInfo);
            closeModal('institute-settings-modal');

            if (typeof showToast === 'function') {
                showToast('প্রতিষ্ঠানের তথ্য সংরক্ষিত হয়েছে');
            } else {
                alert('প্রতিষ্ঠানের তথ্য সংরক্ষিত হয়েছে!');
            }
        }


        // --- Institute Header for Print Documents ---
        function getInstituteHeader(title = 'রিপোর্ট', showDate = true) {
            const date = showDate ? new Date().toLocaleDateString('bn-BD', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }) : '';

            const eiinHtml = instituteInfo.eiin ? `<span style="border: 1px solid #333; padding: 2px 10px; border-radius: 99px; margin: 0 5px;">EIIN: ${instituteInfo.eiin}</span>` : '';
            const establishedHtml = instituteInfo.established ? `<span style="border: 1px solid #333; padding: 2px 10px; border-radius: 99px; margin: 0 5px;">স্থাপিত: ${instituteInfo.established}</span>` : '';

            return `
                <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #111; font-family: 'SolaimanLipi', sans-serif;">
                    <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #000; letter-spacing: -0.5px;">
                        ${instituteInfo.name || 'Class Connect Academy'}
                    </h1>
                    ${instituteInfo.address ? `<p style="margin: 5px 0; font-size: 14px; color: #333; font-weight: 500;">${instituteInfo.address}</p>` : ''}
                    
                    <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 10px; margin: 10px 0; font-size: 12px; font-weight: 600;">
                        ${eiinHtml}
                        ${instituteInfo.contact ? `<span style="margin: 0 5px;">যোগাযোগ: ${instituteInfo.contact}</span>` : ''}
                        ${establishedHtml}
                    </div>

                    <div style="margin-top: 15px;">
                        <span style="display: inline-block; background: #000; color: #fff; padding: 4px 15px; font-size: 13px; font-weight: bold; border-radius: 4px; text-transform: uppercase;">
                            ${title}
                        </span>
                    </div>
                    ${date ? `<p style="margin: 10px 0 0; font-size: 12px; color: #555; font-weight: 600;">তারিখ: ${date}</p>` : ''}
                </div>
            `;
        }

        // Helper: Get basic styles for print documents
        function getPrintStyles() {
            return `
                <style>
                    @media print {
                        body { margin: 0; padding: 20px; }
                        @page { margin: 10mm; }
                    }
                    body {
                        font-family: 'SolaimanLipi', 'Inter', 'Segoe UI', sans-serif;
                        padding: 40px;
                        color: #333;
                        line-height: 1.6;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    th, td {
                        padding: 10px;
                        border: 1px solid #ddd;
                        text-align: left;
                        font-size: 13px;
                    }
                    th {
                        background-color: #f8f9fa;
                        font-weight: bold;
                        color: #444;
                    }
                    .text-right { text-align: right; }
                    .text-center { text-align: center; }
                    .font-bold { font-weight: bold; }
                </style>
            `;
        }

        // --- Print Student List ---
        // Removed redundant openReportModal definition to fix collision

        function printStudentList(filterClass = null) {
            const filteredStudents = filterClass
                ? students.filter(s => s.class === filterClass)
                : students;

            if (filteredStudents.length === 0) {
                alert('কোনো শিক্ষার্থী নেই!');
                return;
            }

            const printWindow = window.open('', '_blank', 'width=1000,height=700');

            if (!printWindow) {
                alert('পপ-আপ ব্লক করা হয়েছে! অনুগ্রহ করে পপ-আপ অনুমতি দিন।');
                return;
            }

            const tableRows = filteredStudents.map((s, index) => `
                <tr>
                    <td class="text-center">${index + 1}</td>
                    <td>${s.name}</td>
                    <td class="text-center">${s.id || '-'}</td>
                    <td class="text-center">${s.class}</td>
                    <td class="text-center">${s.roll || '-'}</td>
                    <td>${s.mobile || '-'}</td>
                    <td>${s.guardian || '-'}</td>
                </tr>
            `).join('');

            printWindow.document.write(`
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>শিক্ষার্থী তালিকা - ${instituteInfo.name}</title>
                    ${getPrintStyles()}
                </head>
                <body>
                    ${getInstituteHeader('শিক্ষার্থী তালিকা', true)}
                    
                    <div style="margin-bottom: 15px;">
                        <p><strong>মোট শিক্ষার্থী:</strong> ${filteredStudents.length} জন</p>
                        ${filterClass ? `<p><strong>ক্লাস:</strong> ${filterClass}</p>` : '<p><strong>সকল ক্লাস</strong></p>'}
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th class="text-center" style="width: 50px;">ক্রমিক</th>
                                <th>নাম</th>
                                <th class="text-center" style="width: 80px;">আইডি</th>
                                <th class="text-center" style="width: 100px;">ক্লাস</th>
                                <th class="text-center" style="width: 80px;">রোল</th>
                                <th style="width: 120px;">মোবাইল</th>
                                <th style="width: 150px;">অভিভাবক</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>

                    <div style="margin-top: 60px; page-break-inside: avoid;">
                        <div style="display: flex; justify-content: space-between; padding: 0 50px;">
                            <div style="text-align: center;">
                                <div style="border-top: 1px solid #333; padding-top: 5px; margin-top: 40px; width: 150px;">
                                    শিক্ষক/প্রধান
                                </div>
                            </div>
                            <div style="text-align: center;">
                                <div style="border-top: 1px solid #333; padding-top: 5px; margin-top: 40px; width: 150px;">
                                    প্রস্তুতকারক
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                </html >
            `);

            printWindow.document.close();
            setTimeout(() => {
                printWindow.print();
            }, 250);
        }

        // --- COMPREHENSIVE BACKUP/RESTORE FUNCTIONS ---

        /**
         * Export ALL data from the application
         * Captures every single piece of data: students, transactions, fee types,
         * waivers, classes, institute info, and all localStorage
         */


// ===== Block 5: Dashboard Logic =====
        window.dashboardContext = 'fees'; // 'fees' or 'expenses'
        window.dashboardCurrentFilter = 'All';

        // 1. Dashboard Context Switcher
        window.setDashboardContext = function (ctx) {
            window.dashboardContext = ctx;

            // Update Toggle UI
            const btnFees = document.getElementById('ctx-fees-btn');
            const btnExps = document.getElementById('ctx-expenses-btn');

            if (ctx === 'fees') {
                btnFees.className = 'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 bg-indigo-600 text-white shadow-md shadow-indigo-100';
                btnExps.className = 'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-slate-500 hover:bg-slate-50';

                // Show Fees Elements
                document.getElementById('dash-class-table-container')?.classList.remove('hidden');
                document.getElementById('dash-fees-breakdown')?.classList.remove('hidden');
                document.getElementById('dash-expense-breakdown')?.classList.add('hidden');
                document.getElementById('dash-card-2-substats')?.classList.remove('hidden');

                // Update Labels
                document.getElementById('label-total-students').innerText = 'Students';
                document.getElementById('sublabel-total-students').innerText = 'মোট শিক্ষার্থী';
                document.getElementById('label-total-coll').innerText = 'Collected';
                document.getElementById('sublabel-total-coll').innerText = 'সর্বমোট সংগ্রহ';
                document.getElementById('label-total-due').innerText = 'Due';
                document.getElementById('dash-due-count-label').innerText = 'বর্তমান বকেয়া';

                const fab = document.getElementById('main-fab');
                if (fab) {
                    fab.classList.remove('bg-rose-600');
                    fab.classList.add('bg-indigo-600');
                }

                // Restore Card Accents (Fees Mode - Light Colorful)
                updateCardAccent(1, 'indigo');
                updateCardAccent(2, 'emerald');
                updateCardAccent(3, 'rose');
                updateCardAccent(4, 'blue');
                updateCardAccent(5, 'violet');

                // [NEW] Clear Filter and Re-init for Fees
                window.selectedDashFilterIds = [];
                updateDashFeeFilterLabel();
                initDashFeeSelector();
            } else {
                btnFees.className = 'px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 text-slate-500 hover:bg-slate-50 w-full md:w-auto';
                btnExps.className = 'px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 bg-rose-600 text-white shadow-md shadow-rose-100 w-full md:w-auto';

                // Show Expenses Elements
                document.getElementById('dash-class-table-container')?.classList.add('hidden');
                document.getElementById('dash-fees-breakdown')?.classList.add('hidden');
                document.getElementById('dash-expense-breakdown')?.classList.remove('hidden');
                document.getElementById('dash-card-2-substats')?.classList.add('hidden');

                // Update Labels
                document.getElementById('label-total-students').innerText = 'Vouchers';
                document.getElementById('sublabel-total-students').innerText = 'ভাউচার';
                document.getElementById('label-total-coll').innerText = 'Total Expense';
                document.getElementById('sublabel-total-coll').innerText = 'সর্বমোট ব্যয়';
                document.getElementById('label-total-due').innerText = 'Today';
                document.getElementById('dash-due-count-label').innerText = 'আজকের ব্যয়';

                const fab = document.getElementById('main-fab');
                if (fab) {
                    fab.classList.remove('bg-indigo-600');
                    fab.classList.add('bg-rose-600');
                }

                // Restore Card Accents (Expense Mode - Rose/Red)
                updateCardAccent(1, 'rose');
                updateCardAccent(2, 'rose');
                updateCardAccent(3, 'rose');
                updateCardAccent(4, 'rose');
                updateCardAccent(5, 'rose');

                // [NEW] Clear Filter and Re-init for Expenses
                window.selectedDashFilterIds = [];
                updateDashFeeFilterLabel();
                initDashFeeSelector();
            }

            // Enhanced helper to update light colorful backgrounds and text
            function updateCardAccent(index, color) {
                const card = document.getElementById(`dash-card-${index}`);
                const iconBg = document.getElementById(`dash-icon-bg-${index}`);
                const icon = document.getElementById(`dash-icon-${index}`);
                const label = card?.querySelector(`#label-total-students, #label-total-coll, #label-total-due, #label-month-coll, #label-week-coll`);
                const h2 = card?.querySelector('h2');
                const sublabel = card?.querySelector(`#sublabel-total-students, #sublabel-total-coll, #sublabel-total-due, #sublabel-month-coll, #sublabel-week-coll`);

                if (!card || !iconBg || !icon) return;

                // Reset classes
                const colors = ['indigo', 'emerald', 'rose', 'blue', 'violet', 'amber', 'orange', 'cyan', 'pink', 'teal'];
                colors.forEach(c => {
                    card.classList.remove(`bg-${c}-50/50`, `border-${c}-100/50`, `hover:border-${c}-200`);
                    if (label) label.classList.remove(`text-${c}-500/80`);
                    if (h2) h2.classList.remove(`text-${c}-900`);
                    if (sublabel) sublabel.classList.remove(`text-${c}-400/80`);
                    icon.classList.remove(`text-${c}-600`);
                });

                // Add new light colorful classes
                card.classList.add(`bg-${color}-50/50`, `border-${color}-100/50`, `hover:border-${color}-200`);
                if (label) label.classList.add(`text-${color}-500/80`);
                if (h2) h2.classList.add(`text-${color}-900`);
                if (sublabel) sublabel.classList.add(`text-${color}-400/80`);
                icon.classList.add(`text-${color}-600`);
            }

            // Hide/Show Class Filters based on mode
            const dashFilters = document.getElementById('dashboard-class-filters');
            if (dashFilters) {
                dashFilters.style.display = (ctx === 'expenses' ? 'none' : 'flex');
                // Ensure filters are rendered if becoming visible
                if (ctx === 'fees' && typeof renderDashboardFilters === 'function') {
                    renderDashboardFilters();
                }
            }

            if (typeof renderDashboard === 'function') renderDashboard();
        };

        // 2. Main Dashboard Render
        // [NEW] Helper to get robust date range from inputs
        window.getDashboardDateRange = function () {
            const sInput = document.getElementById('dash-filter-start');
            const eInput = document.getElementById('dash-filter-end');

            // Default to This Month if inputs are empty/invalid (Safety fallback)
            const now = new Date();
            let start = sInput && sInput.valueAsDate ? sInput.valueAsDate : new Date(now.getFullYear(), now.getMonth(), 1);
            let end = eInput && eInput.valueAsDate ? eInput.valueAsDate : now; // Default to now if end date missing

            // Normalize to start/end of day
            const s = new Date(start); s.setHours(0, 0, 0, 0);
            const e = new Date(end); e.setHours(23, 59, 59, 999);

            return { start: s, end: e };
        };

        // 2. Main Dashboard Render
        window.renderDashboard = function () {
            // Set default dates if empty (This Month)
            const today = new Date();
            const sInput = document.getElementById('dash-filter-start');
            const eInput = document.getElementById('dash-filter-end');

            if (sInput && !sInput.value) {
                const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                sInput.valueAsDate = firstDay;
            }
            if (eInput && !eInput.value) {
                eInput.valueAsDate = today;
            }

            // [UPDATED] Show Card 4 and 5 in Fees mode, hide in Expenses mode
            const cardPaid = document.getElementById('dash-card-4');
            const cardPartial = document.getElementById('dash-card-5');

            if (window.dashboardContext === 'fees') {
                if (cardPaid) cardPaid.style.display = 'block';
                if (cardPartial) cardPartial.style.display = 'block';
                renderFeesDashboard();
            } else {
                if (cardPaid) cardPaid.style.display = 'none';
                if (cardPartial) cardPartial.style.display = 'none';
                renderExpensesDashboard();
            }
            renderDashboardFilters();
        };

        function renderFeesDashboard() {
            const classFilter = window.dashboardCurrentFilter || 'All';
            const { start, end } = getDashboardDateRange();
            const payments = feePayments || [];

            // 1. Snapshot Calculation (Enrolled & Active on 'end' date)
            let enrolledActive = 0;
            let totalAdmittedByDate = 0;

            const classFilteredStudents = students.filter(s => {
                if (classFilter !== 'All' && s.class !== classFilter) return false;

                // Enrollment date check
                let enrollDate;
                if (s.admitDate) {
                    enrollDate = new Date(s.admitDate);
                } else if (s.statusHistory && s.statusHistory.length > 0) {
                    const firstDate = s.statusHistory[0].date;
                    enrollDate = new Date(isNaN(firstDate) ? firstDate : parseFloat(firstDate));
                } else {
                    enrollDate = new Date(0); // Assume existed forever if no info
                }

                if (enrollDate > end) return false;
                return true;
            });

            classFilteredStudents.forEach(s => {
                totalAdmittedByDate++;
                // Status Snapshot
                let statusOnDate = s.statusHistory?.[0]?.status || s.status || 'active';
                if (s.statusHistory && s.statusHistory.length > 0) {
                    const sortedHistory = [...s.statusHistory].map(h => ({
                        ...h,
                        timestamp: isNaN(h.date) ? new Date(h.date).getTime() : parseFloat(h.date)
                    })).sort((a, b) => a.timestamp - b.timestamp);

                    for (const entry of sortedHistory) {
                        if (entry.timestamp <= end.getTime()) {
                            statusOnDate = entry.status;
                        } else break;
                    }
                }
                if (statusOnDate === 'active') enrolledActive++;
            });

            // 2. Financial Calculations (Payments in range)
            const filteredPayments = payments.filter(p => {
                if (p.deleted) return false;
                const pDate = new Date(p.date || 0);
                if (pDate < start || pDate > end) return false;

                const s = students.find(st => st.uid === p.uid);
                if (!s) return false;
                if (classFilter !== 'All' && s.class !== classFilter) return false;

                // [NEW] Fee Type Filter check
                if (window.selectedDashFilterIds && window.selectedDashFilterIds.length > 0) {
                    const allocation = p.details?.allocated || p.allocation || [];
                    const hasMatch = allocation.some(a => window.selectedDashFilterIds.includes((a.feeId || a.id)?.toString()));
                    if (!hasMatch) return false;
                }

                return true;
            });

            // [UPDATED] Calculate total collection accounting for specific fee filter
            let totalCollection = 0;
            const activeStudentIds = new Set();

            filteredPayments.forEach(p => {
                let pMatchedAtLeastOne = false;
                if (window.selectedDashFilterIds && window.selectedDashFilterIds.length > 0) {
                    const allocation = p.details?.allocated || p.allocation || [];
                    allocation.forEach(a => {
                        const feeId = (a.feeId || a.id)?.toString();
                        if (window.selectedDashFilterIds.includes(feeId)) {
                            totalCollection += (parseFloat(a.amount) || 0);
                            pMatchedAtLeastOne = true;
                        }
                    });
                } else {
                    totalCollection += (parseFloat(p.amount) || 0);
                    pMatchedAtLeastOne = true;
                }
                if (pMatchedAtLeastOne) activeStudentIds.add(p.uid);
            });

            let paidCount = 0;
            let partialCount = 0;
            let dueCount = 0;
            let totalDueAmount = 0;

            classFilteredStudents.forEach(s => {
                // Determine if they were active on this date for due calculation
                let statusOnDate = s.statusHistory?.[0]?.status || s.status || 'active';
                if (s.statusHistory && s.statusHistory.length > 0) {
                    const sortedHistory = [...s.statusHistory].map(h => ({
                        ...h,
                        timestamp: isNaN(h.date) ? new Date(h.date).getTime() : parseFloat(h.date)
                    })).sort((a, b) => a.timestamp - b.timestamp);

                    for (const entry of sortedHistory) {
                        if (entry.timestamp <= end.getTime()) statusOnDate = entry.status;
                        else break;
                    }
                }

                if (statusOnDate !== 'active') return;

                const fin = calculateStudentFinancials(s, end);
                const hasPaidInRange = activeStudentIds.has(s.uid);

                // [UPDATED] Calculate relevant balance for fee filter
                let relevantBalance = 0;
                if (window.selectedDashFilterIds && window.selectedDashFilterIds.length > 0) {
                    fin.details.forEach(d => {
                        if (window.selectedDashFilterIds.includes(d.id?.toString())) {
                            relevantBalance += (d.balance || 0);
                        }
                    });
                } else {
                    relevantBalance = fin.balance;
                }

                if (relevantBalance <= 0) {
                    if (hasPaidInRange) paidCount++;
                } else {
                    dueCount++;
                    totalDueAmount += relevantBalance;
                    if (hasPaidInRange) partialCount++;
                }
            });

            // 3. Update UI
            const elStudents = document.getElementById('dash-total-students');
            if (elStudents) {
                elStudents.innerHTML = `${enrolledActive} <span class="text-sm text-gray-400 font-medium">/ ${totalAdmittedByDate}</span>`;
            }
            const elSubLabelStudents = document.getElementById('sublabel-total-students');
            if (elSubLabelStudents) elSubLabelStudents.innerText = `অ্যাক্টিভ শিক্ষার্থী (সীমার শেষ দিন)`;

            const elColl = document.getElementById('dash-total-coll');
            if (elColl) elColl.innerText = '৳' + totalCollection.toLocaleString();

            const elCollCount = document.getElementById('dash-coll-students-count');
            if (elCollCount) elCollCount.innerText = activeStudentIds.size.toLocaleString('bn-BD');

            const elDue = document.getElementById('dash-total-due');
            if (elDue) elDue.innerText = '৳' + totalDueAmount.toLocaleString();
            const elDueLabel = document.getElementById('dash-due-count-label');
            if (elDueLabel) elDueLabel.innerText = `${dueCount.toLocaleString('bn-BD')} জন বকেয়া`;

            const elPaid = document.getElementById('dash-paid-count');
            if (elPaid) elPaid.innerText = `${paidCount.toLocaleString('bn-BD')} জন`;

            const elPartial = document.getElementById('dash-partial-count');
            if (elPartial) elPartial.innerText = `${partialCount.toLocaleString('bn-BD')} জন`;

            renderDashboardClassTable(activeStudentIds, filteredPayments);
        }

        function renderExpensesDashboard() {
            const { start, end } = getDashboardDateRange();

            const searchVal = (document.getElementById('student-search')?.value || '').toLowerCase().trim();

            const filteredExpenses = (expenses || []).filter(e => {
                const d = new Date(e.date || 0);
                if (d < start || d > end) return false;

                // [NEW] Expense Title/Voucher Filter
                if (window.selectedDashFilterIds && window.selectedDashFilterIds.length > 0) {
                    if (!window.selectedDashFilterIds.includes(e.title)) return false;
                }

                if (searchVal) {
                    const title = (e.title || '').toLowerCase();
                    const id = (e.id || '').toLowerCase();
                    const itemsText = (e.items || []).map(i => i.desc || '').join(' ').toLowerCase();
                    return title.includes(searchVal) || id.includes(searchVal) || itemsText.includes(searchVal);
                }
                return true;
            });

            const totalAmount = filteredExpenses.reduce((sum, e) => sum + (parseFloat(e.total) || 0), 0);

            // Update Cards
            // Card 1: Vouchers
            const elVouchers = document.getElementById('dash-total-students');
            if (elVouchers) elVouchers.innerText = filteredExpenses.length.toLocaleString();
            const elLabelVouchers = document.getElementById('label-total-students');
            if (elLabelVouchers) elLabelVouchers.innerText = 'Vouchers';
            const elSubLabelVouchers = document.getElementById('sublabel-total-students');
            if (elSubLabelVouchers) elSubLabelVouchers.innerText = `ভাউচার (সীমার মধ্যে)`;

            // Card 2: Total Expenses
            const elColl = document.getElementById('dash-total-coll');
            if (elColl) elColl.innerText = '৳' + totalAmount.toLocaleString();
            const elLabelColl = document.getElementById('label-total-coll');
            if (elLabelColl) elLabelColl.innerText = 'Expenses';
            const elSubLabelColl = document.getElementById('sublabel-total-coll');
            if (elSubLabelColl) elSubLabelColl.innerText = `মোট ব্যয় (সীমার মধ্যে)`;

            // Card 3: Today's Expense
            const today = new Date();
            const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const endToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

            const todayExpenses = (expenses || []).filter(e => {
                const d = new Date(e.date);
                return d >= startToday && d <= endToday;
            });
            const todayTotal = todayExpenses.reduce((sum, e) => sum + (parseFloat(e.total) || 0), 0);

            const elToday = document.getElementById('dash-total-due');
            if (elToday) elToday.innerText = '৳' + todayTotal.toLocaleString();
            const elLabelToday = document.getElementById('label-total-due');
            if (elLabelToday) elLabelToday.innerText = 'Today';
            const elDueCountLabel = document.getElementById('dash-due-count-label');
            if (elDueCountLabel) elDueCountLabel.innerText = 'আজকের মোট ব্যয়';

            renderExpensesBreakdown(filteredExpenses);
        }

        // [NEW] Helper to render Class Breakdown Table
        function renderDashboardClassTable(activeStudentIds, filteredPayments) {
            const container = document.getElementById('dash-class-table-container');
            if (!container) return;

            const { end } = getDashboardDateRange();

            // Group data by class
            const classStats = {};
            (classes || []).forEach(c => {
                classStats[c] = {
                    name: c,
                    total: 0,
                    active: 0,
                    paid: 0,
                    partial: 0,
                    due: 0,
                    collected: 0,
                    dueAmount: 0
                };
            });

            // 1. Collection per class (from filtered payments in range)
            filteredPayments.forEach(p => {
                const s = students.find(st => st.uid === p.uid);
                if (s && classStats[s.class]) {
                    classStats[s.class].collected += (parseFloat(p.amount) || 0);
                }
            });

            // 2. Snapshot & Financials per student
            students.forEach(s => {
                // Enrollment check
                let enrollDate = s.admitDate ? new Date(s.admitDate) : new Date(0);
                if (enrollDate > end) return;

                if (!classStats[s.class]) return;

                // Status snapshot on end date
                let statusOnDate = s.status || 'active';
                if (s.statusHistory && s.statusHistory.length > 0) {
                    const sortedH = [...s.statusHistory].map(h => ({
                        ...h,
                        ts: isNaN(h.date) ? new Date(h.date).getTime() : parseFloat(h.date)
                    })).sort((a, b) => a.ts - b.ts);
                    for (const entry of sortedH) {
                        if (entry.ts <= end.getTime()) statusOnDate = entry.status;
                        else break;
                    }
                }

                classStats[s.class].total++;
                if (statusOnDate !== 'active') return;

                classStats[s.class].active++;

                // Financials
                const fin = calculateStudentFinancials(s, end);
                const hasPaidInRange = activeStudentIds.has(s.uid);

                if (fin.balance <= 0) {
                    if (hasPaidInRange) classStats[s.class].paid++;
                } else {
                    classStats[s.class].due++;
                    classStats[s.class].dueAmount += fin.balance;
                    if (hasPaidInRange) classStats[s.class].partial++;
                }
            });

            // Generate HTML
            let html = `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div class="p-4 border-b flex justify-between items-center bg-gray-50/50">
                    <h3 class="font-bold text-gray-700 text-sm">শ্রেণীভিত্তিক রিপোর্ট (সামারি)</h3>
                </div>
                <div class="overflow-x-auto overflow-y-hidden">
                    <table class="w-full text-left text-[10px] md:text-xs border-collapse">
                        <thead class="bg-indigo-50/80 text-indigo-900 font-bold uppercase tracking-wider whitespace-nowrap">
                            <tr>
                                <th class="p-3">ক্লাস</th>
                                <th class="p-3 text-center">শিক্ষার্থী</th>
                                <th class="p-3 text-center text-emerald-600">পূর্ণ</th>
                                <th class="p-3 text-center text-amber-600">আংশিক</th>
                                <th class="p-3 text-center text-rose-600">বকেয়া (জন)</th>
                                <th class="p-3 text-right">আদায়</th>
                                <th class="p-3 text-right text-red-600">বকেয়া (৳)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 whitespace-nowrap">
            `;

            (classes || []).forEach(c => {
                const stat = classStats[c];
                if (!stat) return;
                html += `
                    <tr class="hover:bg-gray-50 transition">
                        <td class="p-3 font-bold text-gray-700">${c}</td>
                        <td class="p-3 text-center text-gray-500">${stat.active} / ${stat.total}</td>
                        <td class="p-3 text-center font-bold text-emerald-600">${stat.paid}</td>
                        <td class="p-3 text-center font-bold text-amber-600">${stat.partial}</td>
                        <td class="p-3 text-center font-bold text-rose-600">${stat.due}</td>
                        <td class="p-3 text-right font-bold text-gray-700">৳${stat.collected.toLocaleString()}</td>
                        <td class="p-3 text-right font-bold text-red-500">৳${stat.dueAmount.toLocaleString()}</td>
                    </tr>
                `;
            });

            html += `</tbody></table></div></div>`;
            container.innerHTML = html;
        }



        function renderDashboardFilters() {
            const container = document.getElementById('dashboard-class-filters');
            if (!container) return;
            container.innerHTML = '';

            const createBtn = (label, val) => {
                const isActive = (window.dashboardCurrentFilter || 'All') === val;
                const btn = document.createElement('button');
                btn.textContent = label;
                btn.className = `px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm whitespace-nowrap shrink-0 ${isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-transparent shadow-indigo-200'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`;
                btn.onclick = () => {
                    window.dashboardCurrentFilter = val;
                    // Instant UI feedback [NEW]
                    renderDashboardFilters();

                    // Sync with report modal filter
                    const rSelect = document.getElementById('dash-report-class-filter');
                    if (rSelect) rSelect.value = val;

                    // Background heavy calculation
                    renderDashboard();
                };
                return btn;
            };

            container.appendChild(createBtn('সব (All)', 'All'));
            classes.forEach(c => container.appendChild(createBtn(c, c)));
        }

        function renderExpensesBreakdown(data) {
            const container = document.getElementById('dash-expense-breakdown');
            if (!container) return;

            const categoryStats = {};
            const expensesToRender = data || expenses || [];
            expensesToRender.forEach(e => {
                try {
                    const cat = e.title || 'অন্যান্য (Other)';
                    categoryStats[cat] = (categoryStats[cat] || 0) + (parseFloat(e.total) || 0);
                } catch (err) {
                    console.error('Error in breakdown calculation for:', e, err);
                }
            });

            const sorted = Object.entries(categoryStats).sort((a, b) => b[1] - a[1]);

            container.innerHTML = `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6" >
                    <h3 class="font-bold text-gray-700 mb-6 flex items-center gap-2">
                        <i data-lucide="pie-chart" class="w-5 h-5 text-rose-600"></i>
                        ব্যয়ের খাতসমূহ (Expense Breakdown)
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${sorted.map(([cat, amount]) => `
                            <div class="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 flex justify-between items-center group hover:bg-rose-50 transition-colors">
                                <div>
                                    <p class="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-0.5">${cat}</p>
                                    <p class="text-base font-black text-rose-700">৳${amount.toLocaleString()}</p>
                                </div>
                                <div class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-rose-600">
                                    <i data-lucide="trending-up" class="w-5 h-5"></i>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            lucide.createIcons();
        }



        // --- Report Modal Logic ---
        window.setReportDate = function (type) {
            const today = new Date();
            let start = new Date();
            let end = new Date();

            if (type === 'today') { /* already today */ }
            else if (type === 'week') { start.setDate(today.getDate() - (today.getDay() + 1) % 7); }
            else if (type === 'month') { start = new Date(today.getFullYear(), today.getMonth(), 1); }
            else if (type === 'prevMonth') {
                start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                end = new Date(today.getFullYear(), today.getMonth(), 0);
            }

            const sEl = document.getElementById('report-start-date');
            const eEl = document.getElementById('report-end-date');
            if (sEl) sEl.valueAsDate = start;
            if (eEl) eEl.valueAsDate = end;
        };

        window.generateDashboardReport = function () {
            const start = document.getElementById('report-start-date').value;
            const end = document.getElementById('report-end-date').value;
            if (!start || !end) return alert('তারিখ নির্বাচন করুন');

            const startDate = new Date(start);
            const endDate = new Date(end); endDate.setHours(23, 59, 59, 999);

            let total = 0;
            const classStats = {};

            if (window.dashboardContext === 'fees') {
                feePayments.forEach(p => {
                    if (p.deleted) return;
                    const d = new Date(p.date);
                    if (d >= startDate && d <= endDate) {
                        const s = students.find(st => st.uid === p.uid);
                        if (!s) return;

                        let amountToAdd = 0;
                        if (window.selectedDashFilterIds && window.selectedDashFilterIds.length > 0) {
                            const allocation = p.details?.allocated || p.allocation || [];
                            allocation.forEach(a => {
                                if (window.selectedDashFilterIds.includes((a.feeId || a.id)?.toString())) {
                                    amountToAdd += (parseFloat(a.amount) || 0);
                                }
                            });
                        } else {
                            amountToAdd = parseFloat(p.amount);
                        }

                        if (amountToAdd > 0) {
                            total += amountToAdd;
                            const c = s.class || 'Unassigned';
                            classStats[c] = (classStats[c] || 0) + amountToAdd;
                        }
                    }
                });
            } else {
                expenses.forEach(e => {
                    const d = new Date(e.date);
                    if (d >= startDate && d <= endDate) {
                        // [NEW] Expense Title Filter
                        if (window.selectedDashFilterIds && window.selectedDashFilterIds.length > 0) {
                            if (!window.selectedDashFilterIds.includes(e.title)) return;
                        }

                        total += e.total;
                        classStats[e.title] = (classStats[e.title] || 0) + e.total;
                    }
                });
            }

            document.getElementById('report-results').classList.remove('hidden');
            document.getElementById('report-empty').classList.add('hidden');
            document.getElementById('report-total-coll').innerText = '৳' + total.toLocaleString();
            document.getElementById('report-date-label').innerText = `${startDate.toLocaleDateString('bn-BD')} - ${endDate.toLocaleDateString('bn-BD')}`;

            const tbody = document.getElementById('report-table-body');
            tbody.innerHTML = '';

            Object.entries(classStats).sort((a, b) => b[1] - a[1]).forEach(([name, amount]) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="px-4 py-3 font-bold text-gray-700">${name}</td>
                    <td class="px-4 py-3 text-right font-black text-indigo-600">৳${amount.toLocaleString()}</td>
                    <td class="px-4 py-3 text-right text-gray-400 text-xs">${Math.round(amount / (total || 1) * 100)}%</td>
                `;
                tbody.appendChild(tr);
            });
        };

        window.printDashboardCardReport = function (type, customStart = null, customEnd = null) {
            // Save state for refresh
            window.lastDashReportArgs = { type, customStart, customEnd };
            const summaryOnly = document.getElementById('dash-print-summary-only')?.checked;

            const panel = document.getElementById('report-preview-side-panel');
            const content = document.getElementById('dash-panel-content');
            const title = document.getElementById('dash-panel-title');
            const subtitle = document.getElementById('dash-panel-subtitle');

            if (!panel || !content) return;

            // Open Panel
            panel.classList.remove('translate-x-full');

            // 1. Determine Date Range & Filter
            let startDate = null;
            let endDate = new Date();
            let periodLabel = 'কাস্টম রিপোর্ট';

            // Sync Filter [FIXED]
            const dashReportFilter = document.getElementById('dash-report-class-filter');
            if (dashReportFilter) {
                dashReportFilter.value = window.dashboardCurrentFilter || 'All';
            }
            const filterState = window.dashboardCurrentFilter || 'All';

            // For dashboard card reports (collected, due), use dashboard date filters
            const dashStartEl = document.getElementById('dash-filter-start');
            const dashEndEl = document.getElementById('dash-filter-end');

            // 1. Unified Date Extraction (Matches Dashboard exactly)
            const { start: dashStart, end: dashEnd } = getDashboardDateRange();
            startDate = dashStart;
            endDate = dashEnd;
            periodLabel = (startDate.getTime() === 0) ? 'শুরু থেকে আজ পর্যন্ত' : `${startDate.toLocaleDateString('bn-BD')} থেকে ${endDate.toLocaleDateString('bn-BD')}`;

            if (type === 'week') periodLabel = 'এই সপ্তাহ';
            else if (type === 'month') periodLabel = 'এই মাস';
            else if (customStart && customEnd) {
                startDate = new Date(customStart);
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date(customEnd);
                endDate.setHours(23, 59, 59, 999);
                periodLabel = `${startDate.toLocaleDateString('bn-BD')} - ${endDate.toLocaleDateString('bn-BD')}`;
            }

            // 2. Synchronized Filtering (Snapshot Alignment)
            // [SYNC] Build set of unique payer UIDs in range (Matches dashboard's activeStudentIds)
            const payerUidsInRange = new Set(
                (feePayments || []).filter(p => {
                    if (p.deleted) return false;
                    const pDate = new Date(p.date || 0);
                    if (pDate < (startDate || new Date(0)) || pDate > endDate) return false;

                    if (window.selectedDashFilterIds && window.selectedDashFilterIds.length > 0) {
                        const allocation = p.details?.allocated || p.allocation || [];
                        return allocation.some(a => window.selectedDashFilterIds.includes((a.feeId || a.id)?.toString()));
                    }
                    return true;
                }).map(p => p.uid)
            );

            const filteredStudents = students.filter(s => {
                // Class check (Strict)
                if (filterState !== 'All' && s.class !== filterState) return false;

                const hasPaymentInRange = payerUidsInRange.has(s.uid);

                // Enrollment check: Only restrict if NOT a collection report or if no payment found
                if (type !== 'collected' && !hasPaymentInRange) {
                    let enrollDate = s.admitDate ? new Date(s.admitDate) : new Date(0);
                    if (enrollDate > endDate) return false;
                }

                // If it's a collected report, ONLY show those who paid (to match dashboard count)
                if (type === 'collected' && !hasPaymentInRange) return false;

                // Status Snapshot: What was their status on the end date?
                let statusOnDate = s.status || 'active';
                if (s.statusHistory && s.statusHistory.length > 0) {
                    const sortedH = [...s.statusHistory].map(h => ({
                        ...h,
                        ts: isNaN(h.date) ? new Date(h.date).getTime() : parseFloat(h.date)
                    })).sort((a, b) => a.ts - b.ts);
                    for (const entry of sortedH) {
                        if (entry.ts <= endDate.getTime()) statusOnDate = entry.status;
                        else break;
                    }
                }

                // Carry forward status for summary counts
                s._statusOnDate = statusOnDate;
                return true;
            });

            const reportData = filteredStudents.map((s, index) => {
                const fin = calculateStudentFinancials(s, endDate);
                const studentPayments = fin.payments || [];

                const periodPaid = studentPayments.reduce((sum, p) => {
                    const pDate = new Date(p.date);
                    if (startDate && pDate < startDate) return sum;
                    if (endDate && pDate > endDate && type !== 'due') return sum;

                    if (window.selectedDashFilterIds && window.selectedDashFilterIds.length > 0) {
                        let amt = 0;
                        const allocation = p.details?.allocated || p.allocation || [];
                        allocation.forEach(a => {
                            if (window.selectedDashFilterIds.includes((a.feeId || a.id)?.toString())) {
                                amt += (parseFloat(a.amount) || 0);
                            }
                        });
                        return sum + amt;
                    }
                    return sum + (parseFloat(p.amount) || 0);
                }, 0);

                let lastPaymentAmt = 0;
                let lastPaymentDateObj = null;
                if (studentPayments.length > 0) {
                    const filtered = studentPayments.filter(p => {
                        if (window.selectedDashFilterIds && window.selectedDashFilterIds.length > 0) {
                            const allocation = p.details?.allocated || p.allocation || [];
                            return allocation.some(a => window.selectedDashFilterIds.includes((a.feeId || a.id)?.toString()));
                        }
                        return true;
                    });
                    if (filtered.length > 0) {
                        const sorted = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
                        const lastPay = sorted[0];
                        lastPaymentDateObj = new Date(lastPay.date);
                        if (window.selectedDashFilterIds && window.selectedDashFilterIds.length > 0) {
                            const allocation = lastPay.details?.allocated || lastPay.allocation || [];
                            lastPaymentAmt = allocation.filter(a => window.selectedDashFilterIds.includes((a.feeId || a.id)?.toString()))
                                .reduce((s, a) => s + (parseFloat(a.amount) || 0), 0);
                        } else {
                            lastPaymentAmt = parseFloat(lastPay.amount) || 0;
                        }
                    }
                }

                const lastPaymentStr = lastPaymentDateObj
                    ? `<div class="flex flex-col items-center leading-tight"><span class="text-sm font-black text-indigo-700">৳${lastPaymentAmt.toLocaleString('bn-BD')}</span><span class="text-[9px] text-gray-400 font-bold">${lastPaymentDateObj.toLocaleDateString('bn-BD')}</span></div>`
                    : '-';

                return {
                    sl: index + 1,
                    id: s.id || s.roll || '-',
                    name: s.name,
                    className: s.class || 'Unassigned',
                    totalPaid: fin.totalPaid || 0,
                    lastPaymentDisplay: lastPaymentStr,
                    periodPaid: periodPaid,
                    due: (window.selectedDashFilterIds && window.selectedDashFilterIds.length > 0)
                        ? fin.details.filter(d => window.selectedDashFilterIds.includes(d.id?.toString())).reduce((s, d) => s + (d.balance || 0), 0)
                        : (fin.balance || 0),
                    _active: s._statusOnDate === 'active'
                };
            }).filter(d => {
                if (type === 'due') return d.due > 0;
                if (type === 'paid') return d.due <= 0 && d.periodPaid > 0;
                if (type === 'partial') return d.due > 0 && d.periodPaid > 0;
                // [FIXED] For 'collected', 'week', 'month', only show students who actually paid
                if (type === 'collected' || type === 'week' || type === 'month' || (type === 'custom' && startDate)) {
                    return d.periodPaid > 0;
                }
                return true;
            });

            let feeContextStr = "";
            if (window.selectedDashFilterIds && window.selectedDashFilterIds.length > 0) {
                const names = window.selectedDashFilterIds.map(id => {
                    const fee = (feeTypes || []).find(f => f.id.toString() === id);
                    return fee ? fee.name : id;
                });
                feeContextStr = ` (${isExpense ? 'ভাউচার' : 'ফি'}: ${names.join(', ')})`;
            }

            let titleLabel = "শিক্ষার্থী তালিকা";
            if (type === 'due') titleLabel = "বকেয়া শিক্ষার্থী তালিকা";
            else if (type === 'paid') titleLabel = "পরিশোধিত শিক্ষার্থী তালিকা";
            else if (type === 'partial') titleLabel = "আংশিক পরিশোধিত তালিকা";

            title.innerText = titleLabel + " (" + (filterState === 'All' ? 'সকল ক্লাস' : filterState) + ")" + feeContextStr;
            subtitle.innerText = periodLabel;

            let html = `
                <style>
                    .print-only-header { display: none; }
                    @media print {
                        .print-only-header { display: block; }
                    }
                </style>
                <div class="mt-2 mb-6 text-center">
                    <h1 class="text-2xl font-bold text-gray-900">${instituteInfo.name}</h1>
                    <h2 class="text-xl font-bold text-indigo-700 my-1">${titleLabel} (${filterState === 'All' ? 'সকল ক্লাস' : filterState})${feeContextStr}</h2>
                    <div class="text-xs text-gray-500 space-y-1">
                        <p>সময়কাল: ${startDate ? (startDate.getTime() === 0 ? 'শুরু থেকে আজ পর্যন্ত' : `${startDate.toLocaleDateString('bn-BD')} থেকে ${endDate.toLocaleDateString('bn-BD')}`) : 'শুরু থেকে আজ পর্যন্ত'}</p>
                        <p>প্রিন্ট: ${new Date().toLocaleString('bn-BD')}</p>
                    </div>
                </div>
            `;

            const renderSummaryCard = (data, label, reportType) => {
                // [SYNC] Count all students displayed in this section matching our report criteria
                const totalStudents = data.length;
                const totalCollection = data.reduce((sum, d) => sum + d.periodPaid, 0);
                const totalDue = data.reduce((sum, d) => sum + d.due, 0);

                // Calculate specific counts
                const countPaid = data.filter(d => d.periodPaid > 0).length;
                const countDue = data.filter(d => d.due > 0).length;

                const paidLabel = (reportType === 'students') ? 'পরিশোধিত' : 'আদায়';

                return `
                    <div class="mb-4">
                        ${label ? `<h3 class="text-lg font-bold text-gray-800 mb-2 text-center uppercase border-b pb-1 border-gray-300">${label}</h3>` : ''}
                        <div class="grid grid-cols-3 border border-gray-800 mb-2 text-[10px] leading-tight" style="border: 1px solid #000 !important;">
                            <div class="p-1 border-r border-gray-800 bg-indigo-50 flex items-center justify-center" style="background-color: #eef2ff !important; border-right: 1px solid #000 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;">
                                <p class="font-bold whitespace-nowrap">মোট শিক্ষার্থী ${totalStudents.toLocaleString('bn-BD')} জন</p>
                            </div>
                            <div class="p-1 border-r border-gray-800 bg-emerald-50 flex items-center justify-center" style="background-color: #ecfdf5 !important; border-right: 1px solid #000 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;">
                                <p class="font-bold whitespace-nowrap">${paidLabel}: (${countPaid.toLocaleString('bn-BD')} জন) ${totalCollection.toLocaleString('bn-BD')}</p>
                            </div>
                            <div class="p-1 bg-rose-50 flex items-center justify-center" style="background-color: #fff1f2 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;">
                                <p class="font-bold whitespace-nowrap">বকেয়া: (${countDue.toLocaleString('bn-BD')} জন) ${totalDue.toLocaleString('bn-BD')}</p>
                            </div>
                        </div>
                    </div>
                `;
            };

            const renderTable = (data) => {
                const rows = data.map((d, index) => `
                    <tr class="border-b border-gray-300 text-center">
                        <td class="p-2 border border-gray-300 text-center whitespace-nowrap">${(index + 1).toLocaleString('bn-BD')}</td>
                        <td class="p-2 border border-gray-300 text-left whitespace-nowrap">
                            <div class="text-gray-800 font-bold">
                                ${d.name} 
                                ${!d._active ? '<span class="ml-1 text-[9px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded border border-gray-200">(নিষ্ক্রিয়)</span>' : ''}
                            </div>
                        </td>
                        <td class="p-2 border border-gray-300 text-right whitespace-nowrap">৳${d.totalPaid.toLocaleString('bn-BD')}</td>
                        <td class="p-2 border border-gray-300 whitespace-nowrap">${d.lastPaymentDisplay}</td>
                        <td class="p-2 border border-gray-300 text-right font-bold bg-emerald-50 text-emerald-700 whitespace-nowrap" style="background-color: #ecfdf5 !important; color: #047857 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;">৳${d.periodPaid.toLocaleString('bn-BD')}</td>
                        <td class="p-2 border border-gray-300 text-right font-bold ${d.due > 0 ? 'bg-rose-50 text-rose-600' : ''} whitespace-nowrap" style="${d.due > 0 ? 'background-color: #fff1f2 !important; color: #e11d48 !important;' : ''} -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;">৳${d.due.toLocaleString('bn-BD')}</td>
                    </tr>
                `).join('');

                return `
                    <table class="w-full text-sm border-collapse border border-gray-300 mb-2 page-break-inside-avoid">
                        <thead class="bg-gray-800 text-white" style="background-color: #1f2937 !important; color: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;">
                            <tr>
                                <th class="p-2 border border-gray-600 text-center whitespace-nowrap">ক্রমিক</th>
                                <th class="p-2 border border-gray-600 text-left whitespace-nowrap">শিক্ষার্থীর নাম</th>
                                <th class="p-2 border border-gray-600 text-right whitespace-nowrap">মোট আদায়</th>
                                <th class="p-2 border border-gray-600 w-24 whitespace-nowrap">শেষ পেমেন্ট</th>
                                <th class="p-2 border border-gray-600 text-right whitespace-nowrap">আদায় (সময়কাল)</th>
                                <th class="p-2 border border-gray-600 text-right whitespace-nowrap">বকেয়া</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white">
                            ${rows}
                        </tbody>
                    </table>
                `;
            };

            if (filterState === 'All') {
                const uniqueClasses = [...new Set(reportData.map(d => d.className))].sort();
                if (reportData.length > 0) {
                    html += `<h3 class="text-lg font-bold text-gray-800 mb-3 text-center uppercase border-b pb-2 border-gray-300">সামগ্রিক সারসংক্ষেপ (সকল ক্লাস)</h3>`;
                    const classWiseSummary = uniqueClasses.map(cls => {
                        const classData = reportData.filter(d => d.className === cls);
                        return {
                            className: cls,
                            studentCount: classData.length,
                            totalCollection: classData.reduce((sum, d) => sum + d.periodPaid, 0),
                            totalDue: classData.reduce((sum, d) => sum + d.due, 0)
                        };
                    });

                    html += `
                        <div class="mb-4">
                            <table class="w-full border-collapse border border-black text-[11px]" style="border: 2px solid #000 !important;">
                                <thead class="bg-white" style="background-color: #ffffff !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;">
                                    <tr>
                                        <th class="p-2 border border-black text-center font-bold whitespace-nowrap" style="border: 1px solid #000 !important;">ক্রমিক</th>
                                        <th class="p-2 border border-black text-center font-bold whitespace-nowrap" style="border: 1px solid #000 !important;">ক্লাস</th>
                                        <th class="p-2 border border-black text-center font-bold whitespace-nowrap" style="border: 1px solid #000 !important;">শিক্ষার্থী সংখ্যা</th>
                                        <th class="p-2 border border-black text-right font-bold whitespace-nowrap" style="border: 1px solid #000 !important;">আদায়</th>
                                        <th class="p-2 border border-black text-right font-bold whitespace-nowrap" style="border: 1px solid #000 !important;">বকেয়া</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white">
                    `;

                    classWiseSummary.forEach((cls, index) => {
                        html += `
                            <tr class="border-b border-black">
                                <td class="p-2 border border-black text-center" style="border: 1px solid #000 !important;">${(index + 1).toLocaleString('bn-BD')}</td>
                                <td class="p-2 border border-black text-center font-semibold" style="border: 1px solid #000 !important;">${cls.className}</td>
                                <td class="p-2 border border-black text-center" style="border: 1px solid #000 !important;">${cls.studentCount.toLocaleString('bn-BD')} জন</td>
                                <td class="p-2 border border-black text-right font-bold" style="border: 1px solid #000 !important;">৳${cls.totalCollection.toLocaleString('bn-BD')}</td>
                                <td class="p-2 border border-black text-right font-bold" style="border: 1px solid #000 !important;">৳${cls.totalDue.toLocaleString('bn-BD')}</td>
                            </tr>
                        `;
                    });

                    const grandTotal = {
                        students: reportData.length,
                        collection: reportData.reduce((sum, d) => sum + d.periodPaid, 0),
                        due: reportData.reduce((sum, d) => sum + d.due, 0)
                    };

                    html += `
                                    <tr class="bg-white font-bold" style="background-color: #ffffff !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;">
                                        <td colspan="2" class="p-2 border border-black text-center font-black" style="border: 1px solid #000 !important;">সর্বমোট</td>
                                        <td class="p-2 border border-black text-center font-black" style="border: 1px solid #000 !important;">${grandTotal.students.toLocaleString('bn-BD')} জন</td>
                                        <td class="p-2 border border-black text-right font-black" style="border: 1px solid #000 !important;">৳${grandTotal.collection.toLocaleString('bn-BD')}</td>
                                        <td class="p-2 border border-black text-right font-black" style="border: 1px solid #000 !important;">৳${grandTotal.due.toLocaleString('bn-BD')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    `;
                    html += `<div class="mb-6"></div>`;
                }

                if (!summaryOnly || filterState !== 'All') {
                    let hasData = false;
                    uniqueClasses.forEach((cls, classIndex) => {
                        const classData = reportData.filter(d => d.className === cls);
                        if (classData.length > 0) {
                            hasData = true;
                            if (classIndex > 0) html += `<div style="page-break-before: always;"></div>`;
                            html += `
                                <div class="print-only-header mt-2 mb-6 text-center">
                                    <h1 class="text-2xl font-bold text-gray-900">${instituteInfo.name}</h1>
                                    <h2 class="text-xl font-bold text-indigo-700 my-1">শিক্ষার্থী তালিকা (${cls})</h2>
                                    <div class="text-xs text-gray-500 space-y-1">
                                        <p>সময়কাল: ${periodLabel}</p>
                                        <p>প্রিন্ট: ${new Date().toLocaleString('bn-BD')}</p>
                                    </div>
                                </div>
                            `;
                            html += `<h3 class="text-lg font-bold text-gray-800 mb-3 text-center uppercase border-b pb-2 border-gray-300">${cls}</h3>`;
                            html += `<div style="overflow-x: auto; width: 100%; margin-bottom: 0.5rem;">`;
                            html += `<div style="min-width: fit-content;">`;
                            html += renderSummaryCard(classData, null, type);
                            if (!summaryOnly) {
                                html += renderTable(classData);
                            }
                            html += `</div></div>`;
                        }
                    });

                    if (!hasData) html += `<div class="text-center p-10 text-gray-500">কোনো তথ্য পাওয়া যায়নি</div>`;
                }
            } else {
                if (reportData.length > 0) {
                    html += `<h3 class="text-lg font-bold text-gray-800 mb-3 text-center uppercase border-b pb-2 border-gray-300">${filterState}</h3>`;
                    html += `<div style="overflow-x: auto; width: 100%; margin-bottom: 0.5rem;">`;
                    html += `<div style="min-width: fit-content;">`;
                    html += renderSummaryCard(reportData, null, type);
                    if (!summaryOnly) {
                        html += renderTable(reportData);
                    }
                    html += `</div></div>`;
                } else {
                    html += `<div class="text-center p-10 text-gray-500">কোনো তথ্য পাওয়া যায়নি</div>`;
                }
            }
            content.innerHTML = html;
        };

        window.closeDashboardReportPreview = () => document.getElementById('report-preview-side-panel').classList.add('translate-x-full');

        window.refreshDashboardPreview = function () {
            if (window.lastDashReportArgs) {
                printDashboardCardReport(
                    window.lastDashReportArgs.type,
                    window.lastDashReportArgs.customStart,
                    window.lastDashReportArgs.customEnd
                );
            }
        };

        // --- FIELD LIBRARY & DYNAMIC FORM MANAGEMENT ---
        // Note: FIELD_LIBRARY is already defined at line 2543

        function hideFixedField(fieldId) {
            if (!hiddenFixedFields.includes(fieldId)) {
                hiddenFixedFields.push(fieldId);
                localStorage.setItem(STORAGE_KEYS.hiddenFixedFields, JSON.stringify(hiddenFixedFields));
            }
            renderCustomFieldInputs();
        }

        function renderCustomFieldInputs(existingData = {}) {
            const tabsContainer = document.getElementById('student-modal-tabs');
            const contentContainer = document.getElementById('student-modal-content');
            if (!tabsContainer || !contentContainer) return;

            // 1. Save current values before clearing
            const currentValues = {};
            document.querySelectorAll('.custom-field-input').forEach(input => {
                currentValues[input.dataset.field] = input.value;
            });
            const data = { ...currentValues, ...existingData };
            const mSplit = splitMobile(data.mobile || '');

            // 2. Clear containers
            tabsContainer.innerHTML = '';
            contentContainer.innerHTML = '';

            // 3. Define Category Overrides & Icons
            const categoryConfig = {
                "ব্যক্তিগত তথ্য": { icon: "user", priority: 1 },
                "একাডেমিক তথ্য": { icon: "graduation-cap", priority: 2 },
                "অভিভাবক তথ্য": { icon: "users", priority: 3 },
                "জরুরি যোগাযোগ": { icon: "phone", priority: 4 },
                "শিক্ষাগত তথ্য": { icon: "book-open", priority: 5 },
                "নথিপত্র": { icon: "file-text", priority: 6 },
                "অন্যান্য": { icon: "layers", priority: 100 }
            };

            // 4. Determine Active Categories
            const allKnownFields = Object.values(FIELD_LIBRARY).flat();
            const activeOtherFields = activeFormFields.filter(f => !allKnownFields.includes(f));

            const categories = Object.keys(FIELD_LIBRARY).filter(cat => {
                const fields = activeFormFields.filter(f => (FIELD_LIBRARY[cat] || []).includes(f));
                return fields.length > 0 || cat === "ব্যক্তিগত তথ্য" || cat === "অভিভাবক তথ্য"; // Always visible
            });

            if (activeOtherFields.length > 0) categories.push("অন্যান্য");

            // Sort by priority
            categories.sort((a, b) => (categoryConfig[a]?.priority || 50) - (categoryConfig[b]?.priority || 50));

            // 5. Generate Tabs and Content
            categories.forEach((catName, index) => {
                const config = categoryConfig[catName] || { icon: "folder" };
                const tabId = catName.replace(/\s+/g, '-').toLowerCase(); // Simple slug

                // --- Tab Button ---
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.onclick = () => switchStudentTab(tabId);
                btn.className = `student-tab-btn flex-1 py-3 text-xs font-bold whitespace-nowrap px-4 border-b-2 transition ${index === 0 ? 'text-indigo-600 border-indigo-600 bg-indigo-50/50' : 'text-gray-500 border-transparent hover:text-gray-700'}`;
                btn.setAttribute('data-tab', tabId);
                btn.innerHTML = catName;
                tabsContainer.appendChild(btn);

                // --- Tab Content ---
                const contentDiv = document.createElement('div');
                contentDiv.id = `tab-content-${tabId}`;
                contentDiv.className = `student-tab-content space-y-5 ${index === 0 ? '' : 'hidden'}`;

                // Header (Hidden but functional for grid layouts if needed)
                contentDiv.innerHTML = `
            <h4 class="hidden flex text-xs font-black text-gray-400 uppercase tracking-wider mb-4 border-b pb-2 items-center gap-2">
                <i data-lucide="${config.icon}" class="w-4 h-4"></i> ${catName}
                </h4>
            `;

                const fieldsContainer = document.createElement('div');
                fieldsContainer.className = "space-y-5";
                contentDiv.appendChild(fieldsContainer);

                // --- Inject Special Content ---
                if (catName === "ব্যক্তিগত তথ্য") {
                    // Inject Default Student Fields
                    fieldsContainer.innerHTML += `
            <div>
        <label class="block text-xs font-medium text-gray-500 mb-1.5">নাম *</label>
        <input type="text" id="inp-name" required value="${data.name || ''}" oninput="saveDraft()"
            class="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium">
    </div>

    <div class="grid grid-cols-2 gap-4">
        <div class="relative">
            <label class="block text-xs font-medium text-gray-500 mb-1.5">ক্লাস *</label>
            <div class="relative">
                <select id="inp-class" onchange="handleClassChange(); saveDraft();" required
                    class="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium appearance-none text-gray-700">
                    <option value="" disabled ${!data.class ? 'selected' : ''}>ক্লাস নির্বাচন করুন</option>
                    ${(typeof classes !== 'undefined' ? classes : []).map(c => `<option value="${c}" ${data.class === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
                <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                    <i data-lucide="chevron-down" class="w-4 h-4"></i>
                </div>
            </div>
        </div>
        <div>
            <label class="block text-xs font-medium text-gray-500 mb-1.5">মোবাইল *</label>
            <div class="flex gap-2">
                <select id="inp-mobile-code" onchange="saveDraft()"
                    class="w-32 p-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium text-sm">
                    ${COUNTRIES.map(c => `<option value="${c.code}" ${mSplit.code === c.code ? 'selected' : ''}>${c.name} (${c.code})</option>`).join('')}
                </select>
                <input type="tel" id="inp-mobile-number" required placeholder="01712xxxxxx" 
                    value="${mSplit.number}" oninput="saveDraft()"
                    class="flex-1 p-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium font-mono text-sm">
            </div>
        </div>
    </div>

    <div class="flex items-center gap-2 p-2.5 bg-indigo-50 rounded-xl border border-indigo-100/50">
        <input type="checkbox" id="auto-gen-check"
            class="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            onchange="toggleAutoGenerate(); saveDraft();">
        <label for="auto-gen-check" class="text-xs font-bold text-indigo-700 select-none cursor-pointer">স্বয়ংক্রিয়
            রোল ও আইডি</label>
    </div>

    <div class="grid grid-cols-2 gap-4">
        <div>
            <label class="block text-xs font-medium text-gray-500 mb-1.5">রোল নং</label>
            <input type="text" id="inp-roll" value="${data.roll || ''}" oninput="saveDraft()"
                class="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium text-center"
                placeholder="০১">
        </div>
        <div>
            <label class="block text-xs font-medium text-gray-500 mb-1.5">আইডি (ID)</label>
            <input type="text" id="inp-id" value="${data.id || ''}" oninput="saveDraft()"
                class="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium font-mono text-sm text-center"
                placeholder="101">
        </div>
    </div>

    <div class="p-3 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
            <label class="block text-xs font-bold text-gray-700 uppercase tracking-wide">স্ট্যাটাস</label>
            <p class="text-[10px] text-gray-400 font-medium">ক্লাস ও ফি এর জন্য</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="inp-status" class="sr-only peer" ${data.status === 'disabled' ? '' : 'checked'}
                onchange="document.getElementById('status-label').textContent = this.checked ? 'Active' : 'Disabled'; document.getElementById('status-label').className = this.checked ? 'ml-2 text-xs font-bold text-indigo-600' : 'ml-2 text-xs font-bold text-red-500'; saveDraft();">
            <div
                class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600">
            </div>
            <span class="ml-2 text-xs font-bold ${data.status === 'disabled' ? 'text-red-500' : 'text-indigo-600'} w-12"
                id="status-label">${data.status === 'disabled' ? 'Disabled' : 'Active'}</span>
        </label>
    </div>
        `;
                }

                if (catName === "অভিভাবক তথ্য") {
                    // Inject Fixed Parent Fields
                    const isFatherHidden = (hiddenFixedFields || []).includes('father');
                    const isMotherHidden = (hiddenFixedFields || []).includes('mother');
                    const isNotesHidden = (hiddenFixedFields || []).includes('notes');

                    fieldsContainer.innerHTML += `
            <div id="field-container-father" class="group ${isFatherHidden ? 'hidden' : ''}">
        <div class="flex justify-between items-center mb-1.5">
            <label class="block text-xs font-medium text-gray-500">পিতার নাম</label>
            <button type="button" onclick="hideFixedField('father')"
                class="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition opacity-0 group-hover:opacity-100"
                title="সরিয়ে ফেলুন">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
        </div>
        <input type="text" id="inp-father" value="${data.fathersName || data.father || ''}" oninput="saveDraft()"
            class="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium">
    </div>

    <div id="field-container-mother" class="group ${isMotherHidden ? 'hidden' : ''}">
        <div class="flex justify-between items-center mb-1.5">
            <label class="block text-xs font-medium text-gray-500">মাতার নাম</label>
            <button type="button" onclick="hideFixedField('mother')"
                class="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition opacity-0 group-hover:opacity-100"
                title="সরিয়ে ফেলুন">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
        </div>
        <input type="text" id="inp-mother" value="${data.mothersName || data.mother || ''}" oninput="saveDraft()"
            class="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium">
    </div>

    <div id="field-container-notes" class="group ${isNotesHidden ? 'hidden' : ''}">
        <div class="flex justify-between items-center mb-1.5">
            <label class="block text-xs font-medium text-gray-500">ঠিকানা / নোট</label>
            <button type="button" onclick="hideFixedField('notes')"
                class="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition opacity-0 group-hover:opacity-100"
                title="সরিয়ে ফেলুন">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
        </div>
        <textarea id="inp-notes" rows="3" oninput="saveDraft()"
            class="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium text-sm">${data.notes || ''}</textarea>
    </div>
        `;
                }

                // --- Inject Library Fields ---
                const catFields = activeFormFields.filter(f => {
                    const libFields = FIELD_LIBRARY[catName] || [];
                    return libFields.includes(f);
                });

                // For "অন্যান্য" category
                if (catName === "অন্যান্য") {
                    activeOtherFields.forEach(field => renderFieldHTML(field, fieldsContainer, data));
                } else if (catFields.length > 0) {
                    // Divider if special content exists
                    if (catName === "অভিভাবক তথ্য" || catName === "ব্যক্তিগত তথ্য") {
                        const hr = document.createElement('div');
                        hr.className = "pt-4 border-t border-dashed";
                        fieldsContainer.appendChild(hr);
                    }
                    catFields.forEach(field => renderFieldHTML(field, fieldsContainer, data));
                }

                contentContainer.appendChild(contentDiv);
            });

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        // Helper to render individual field HTML
        function renderFieldHTML(field, targetContainer, data) {
            if (['শিক্ষার্থীর ছবি', 'জন্ম নিবন্ধন'].includes(field)) {
                const isPhoto = field === 'শিক্ষার্থীর ছবি';
                const val = isPhoto ? (data['imageFilename'] || '') : (data['birthCertFilename'] || '');
                const previewId = isPhoto ? 'preview-photo' : 'preview-birth-cert';
                const inputId = isPhoto ? 'inp-photo' : 'inp-birth-cert';
                const accept = isPhoto ? 'image/*' : 'image/*,.pdf';
                const icon = isPhoto ? 'image' : 'file';

                let isUrl = false;
                let currentSrc = '';
                if (val) {
                    if (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('data:')) {
                        isUrl = true;
                        currentSrc = val;
                    } else {
                        currentSrc = `./${val}`;
                    }
                }

                const defaultPaneClass = isUrl ? 'hidden' : '';
                const urlPaneClass = isUrl ? '' : 'hidden';
                const fileActiveBtnClass = isUrl ? 'text-gray-500 hover:text-gray-900' : 'bg-white text-indigo-600 shadow-sm';
                const urlActiveBtnClass = isUrl ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-900';
                const infoText = val ? 'Saved: ' + val : (isPhoto ? 'Automatic Download on Save' : 'PDF / Image');

                targetContainer.innerHTML += `
            <div class="group bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <div class="flex justify-between items-center">
                    <label class="block text-xs font-bold text-gray-500">${field} ${isPhoto ? '(Passport Size)' : ''}</label>
                    <div class="inline-flex p-0.5 bg-gray-100 rounded-lg text-xs select-none">
                        <button type="button" onclick="toggleUploadMode('${inputId}', 'file')" id="btn-mode-${inputId}-file" class="px-2.5 py-1 rounded-md font-semibold transition ${fileActiveBtnClass}">ফাইল</button>
                        <button type="button" onclick="toggleUploadMode('${inputId}', 'url')" id="btn-mode-${inputId}-url" class="px-2.5 py-1 rounded-md font-semibold transition ${urlActiveBtnClass}">লিঙ্ক (URL)</button>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0 relative shadow-inner">
                        <img id="${previewId}" src="${currentSrc}"
                            class="absolute inset-0 w-full h-full object-cover ${val ? '' : 'hidden'}"
                            onerror="this.src=''; this.classList.add('hidden');">
                        <i data-lucide="${icon}" class="w-6 h-6 text-gray-300"></i>
                    </div>
                    <div class="flex-1 space-y-2">
                        <!-- File Input Pane -->
                        <div id="pane-${inputId}-file" class="${defaultPaneClass}">
                            <input type="file" id="${inputId}" accept="${accept}" onchange="previewFile(this, '${previewId}')"
                                class="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition cursor-pointer"
                                data-field="${field}" data-existing="${val}">
                        </div>
                        <!-- URL Input Pane -->
                        <div id="pane-${inputId}-url" class="${urlPaneClass}">
                            <input type="url" id="${inputId}-url" value="${isUrl ? val : ''}" placeholder="${isPhoto ? 'https://example.com/photo.jpg' : 'https://example.com/document.pdf'}"
                                oninput="previewURL('${inputId}-url', '${previewId}', '${field}', '${inputId}')"
                                class="w-full p-2.5 text-xs border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition font-medium"
                                data-field="${field}">
                        </div>
                        <p id="label-${inputId}-info" class="text-[10px] text-gray-400 mt-1">${infoText}</p>
                    </div>
                </div>
            </div>`;
            } else {
                let inputType = 'text';
                let inputOptions = null;
                const escapedField = field.replace(/'/g, "\\'");

                if (['জন্ম তারিখ'].includes(field)) inputType = 'date';
                else if (['মোবাইল নম্বর', 'অভিভাবকের মোবাইল', 'মোবাইল নম্বর'].includes(field)) inputType = 'tel';
                else if (['বার্ষিক আয়', 'টিসি নম্বর', 'জন্ম নিবন্ধন নম্বর'].includes(field)) inputType = 'number';
                else if (['রক্তের গ্রুপ'].includes(field)) {
                    inputType = 'select';
                    inputOptions = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
                }
                else if (['লিঙ্গ'].includes(field)) {
                    inputType = 'select';
                    inputOptions = ['পুরুষ', 'মহিলা', 'অন্যান্য'];
                }
                else if (['ধর্ম'].includes(field)) {
                    inputType = 'select';
                    inputOptions = ['ইসলাম', 'হিন্দু', 'বৌদ্ধ', 'খ্রিস্টান', 'অন্যান্য'];
                }
                else if (['জাতীয়তা'].includes(field)) {
                    inputType = 'select';
                    inputOptions = ['বাংলাদেশী', 'অন্যান্য'];
                }
                else if (['শিক্ষার্থীর ধরন'].includes(field)) {
                    inputType = 'select';
                    inputOptions = ['নিয়মিত', 'অনিয়মিত', 'ড্রপআউট', 'ট্রান্সফার্ড'];
                }
                else if (['শিফট'].includes(field)) {
                    inputType = 'select';
                    inputOptions = ['প্রভাতী', 'দিবা'];
                }
                else if (['গ্রুপ'].includes(field)) {
                    inputType = 'select';
                    inputOptions = ['বিজ্ঞান', 'মানবিক', 'ব্যবসায় শিক্ষা', 'সাধারণ'];
                }
                else if (['সেকশন'].includes(field)) {
                    inputType = 'select';
                    inputOptions = ['ক', 'খ', 'গ', 'ঘ', 'A', 'B', 'C'];
                }
                else if (['সেশন'].includes(field)) {
                    inputType = 'select';
                    const currentYear = new Date().getFullYear();
                    inputOptions = [String(currentYear - 1), String(currentYear), String(currentYear + 1), String(currentYear + 2)];
                }
                else if (['অভিভাবকের সম্পর্ক', 'সম্পর্ক'].includes(field)) {
                    inputType = 'select';
                    inputOptions = ['পিতা', 'মাতা', 'ভাই', 'বোন', 'চাচা', 'মামু', 'অন্যান্য'];
                }
                else if (['পিতার পেশা'].includes(field)) {
                    inputType = 'select';
                    inputOptions = ['কৃষক', 'ব্যবসায়ী', 'চাকুরীজীবী', 'প্রবাসী', 'শ্রমিক', 'অন্যান্য'];
                }
                else if (['মাতার পেশা'].includes(field)) {
                    inputType = 'select';
                    inputOptions = ['গৃহিনী', 'চাকুরীজীবী', 'ব্যবসায়ী', 'অন্যান্য'];
                }
                else if (['পিএসসি জিপিএ', 'জেএসসি জিপিএ', 'এসএসসি জিপিএ'].includes(field)) {
                    inputType = 'select';
                    inputOptions = ['৫.০০', '৪.৫০ - ৪.৯৯', '৪.০০ - ৪.৪৯', '৩.৫০ - ৩.৯৯', '৩.০০ - ৩.৪৯', '২.০০ - ২.৯৯', '২.০০ এর নিচে'];
                }

                if (inputType === 'select') {
                    targetContainer.innerHTML += `
            <div class="relative group">
        <label class="block text-xs font-medium text-gray-500 mb-1.5">${field}</label>
        <div class="relative">
            <select name="custom_${field}"
                class="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition custom-field-input text-gray-800 font-medium appearance-none"
                data-field="${field}">
                <option value="">নির্বাচন করুন</option>
                ${inputOptions.map(opt => `<option value="${opt}" ${data[field] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
            </select>
            <div class="absolute inset-y-0 right-8 flex items-center pointer-events-none text-gray-400">
                <i data-lucide="chevron-down" class="w-4 h-4"></i>
            </div>
            <button type="button" onclick="removeFieldFromForm('${escapedField}')"
                class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                title="Remove field from view">
                <i data-lucide="eye-off" class="w-4 h-4"></i>
            </button>
        </div>
    </div> `;
                } else {
                    targetContainer.innerHTML += `
            <div class="relative group">
        <label class="block text-xs font-medium text-gray-500 mb-1.5">${field}</label>
        <div class="relative">
            <input type="${inputType}" name="custom_${field}" value="${data[field] || ''}"
                class="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition custom-field-input text-gray-800 font-medium"
                data-field="${field}">
            <button type="button" onclick="removeFieldFromForm('${escapedField}')"
                class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                title="Remove field from view">
                <i data-lucide="eye-off" class="w-4 h-4"></i>
            </button>
        </div>
    </div> `;
                }
            }
        }

        function switchStudentTab(tabId) {
            // Mobile Tabs Logic
            const buttons = document.querySelectorAll('.student-tab-btn');
            buttons.forEach(btn => {
                if (btn.dataset.tab === tabId) {
                    btn.classList.add('text-indigo-600', 'border-indigo-600', 'bg-indigo-50/50');
                    btn.classList.remove('text-gray-500', 'border-transparent', 'hover:text-gray-700');
                    // SCROLL INTO VIEW (User Request)
                    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else {
                    btn.classList.remove('text-indigo-600', 'border-indigo-600', 'bg-indigo-50/50');
                    btn.classList.add('text-gray-500', 'border-transparent', 'hover:text-gray-700');
                }
            });

            // Toggle Content
            const sections = document.querySelectorAll('.student-tab-content');
            sections.forEach(sec => {
                if (sec.id === `tab-content-${tabId}`) {
                    sec.classList.remove('hidden');
                } else {
                    sec.classList.add('hidden');
                }
            });
        }

        function openFieldLibraryModal() {
            const modal = document.getElementById('field-library-modal');
            if (modal) modal.classList.remove('hidden');

            // Render Categories
            const catContainer = document.getElementById('library-categories');
            if (catContainer) {
                catContainer.innerHTML = Object.keys(FIELD_LIBRARY).map((cat, i) => `
            <button onclick="filterFieldLibrary('${cat}')"
        class="category-btn w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between ${i === 0 ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-600'}"
        data-category="${cat}">
            ${cat}
        <span
            class="bg-white px-2 py-0.5 rounded-md text-xs font-bold text-gray-400 shadow-sm border border-gray-100">${FIELD_LIBRARY[cat].length}</span>
    </button>
            `).join('');
            }

            // Render specific fields (default first)
            filterFieldLibrary(Object.keys(FIELD_LIBRARY)[0]);
        }

        function filterFieldLibrary(categoryOrQuery) {
            const isCategory = Object.keys(FIELD_LIBRARY).includes(categoryOrQuery);
            const grid = document.getElementById('library-fields-grid');
            const searchInput = document.getElementById('library-search');
            if (!grid || !searchInput) return;

            let query = isCategory ? '' : (categoryOrQuery || searchInput.value).toLowerCase();

            // UI Toggle
            if (isCategory) {
                document.querySelectorAll('.category-btn').forEach(btn => {
                    if (btn.dataset.category === categoryOrQuery) {
                        btn.className = 'category-btn w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100';
                        // Auto-scroll active category to center (Mobile friendly)
                        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    } else {
                        btn.className = 'category-btn w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between hover:bg-gray-50 text-gray-600 border border-transparent';
                    }
                });
                if (searchInput.value && query === '') searchInput.value = ''; // clear search visual if clicking category
            }

            let fieldsToShow = [];

            if (query) {
                // Search Mode
                Object.entries(FIELD_LIBRARY).forEach(([cat, fields]) => {
                    fields.forEach(f => {
                        if (f.toLowerCase().includes(query)) {
                            fieldsToShow.push({ name: f, category: cat });
                        }
                    });
                });
            } else {
                // Category Mode
                const cat = isCategory ? categoryOrQuery : document.querySelector('.category-btn.bg-indigo-50')?.dataset.category ||
                    Object.keys(FIELD_LIBRARY)[0];
                const fields = FIELD_LIBRARY[cat] || [];
                fieldsToShow = fields.map(f => ({ name: f, category: cat }));
            }

            // Render Grid
            const emptyState = document.getElementById('library-empty-state');
            if (fieldsToShow.length === 0) {
                if (emptyState) emptyState.classList.remove('hidden');
                grid.innerHTML = '';
            } else {
                if (emptyState) emptyState.classList.add('hidden');
                grid.innerHTML = fieldsToShow.map(item => {
                    const isAdded = activeFormFields.includes(item.name);
                    return `
            <div onclick="toggleFieldInForm('${item.name}')"
        class="p-4 rounded-2xl border transition-all duration-200 group relative overflow-hidden cursor-pointer ${isAdded ? 'bg-indigo-50 border-indigo-200 hover:border-red-200 hover:bg-red-50' : 'bg-white border-gray-100 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-50'}">

        <div class="flex justify-between items-start mb-2">
            <div
                class="p-2 rounded-lg ${isAdded ? 'bg-indigo-100 text-indigo-600 group-hover:bg-red-100 group-hover:text-red-500' : 'bg-gray-50 text-gray-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'} transition-colors">
                <i data-lucide="${isAdded ? 'check' : 'plus'}" class="w-5 h-5 group-hover:hidden"></i>
                <i data-lucide="minus" class="w-5 h-5 hidden group-hover:block ${isAdded ? '' : '!hidden'}"></i>
                <i data-lucide="plus" class="w-5 h-5 hidden group-hover:block ${isAdded ? '!hidden' : ''}"></i>
            </div>
            <span
                class="text-[10px] uppercase font-bold tracking-wider text-gray-300 group-hover:text-indigo-300 transition-colors">${item.category}</span>
        </div>

        <h4 class="font-bold text-gray-700 group-hover:text-indigo-700 transition-colors">${item.name}</h4>

        ${isAdded ? '<span class="absolute right-4 bottom-4 text-xs font-bold text-indigo-500 group-hover:text-red-500 transition-colors">যুক্ত আছে (সরান)</span>' : ''}
    </div> `;
                }).join('');
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        function removeFieldFromForm(fieldName) {
            const index = activeFormFields.indexOf(fieldName);
            if (index > -1) {
                activeFormFields.splice(index, 1);
                localStorage.setItem(STORAGE_KEYS.customFields, JSON.stringify(activeFormFields));
                renderCustomFieldInputs();
            }
        }

        function toggleFieldInForm(fieldName) {
            if (activeFormFields.includes(fieldName)) {
                // Remove
                removeFieldFromForm(fieldName);
                // Refresh Library UI
                const searchInput = document.getElementById('library-search');
                if (searchInput && searchInput.value) filterFieldLibrary(null);
                else {
                    const activeCat = document.querySelector('.category-btn.bg-indigo-50')?.dataset.category;
                    if (activeCat) filterFieldLibrary(activeCat);
                }
            } else {
                // Add
                addToForm(fieldName);
            }
        }

        function addToForm(fieldName) {
            if (!activeFormFields.includes(fieldName)) {
                activeFormFields.push(fieldName);
                localStorage.setItem(STORAGE_KEYS.customFields, JSON.stringify(activeFormFields));
                renderCustomFieldInputs();

                // Refresh Library UI to show check mark
                const searchInput = document.getElementById('library-search');
                if (searchInput && searchInput.value) {
                    filterFieldLibrary(null);
                } else {
                    const activeCat = document.querySelector('.category-btn.bg-indigo-50')?.dataset.category;
                    if (activeCat) filterFieldLibrary(activeCat);
                }
            }
        }

        const performSaveDraft = () => {
            const editUid = document.getElementById('edit-uid')?.value;
            if (editUid) return;

            const formData = {
                name: document.getElementById('inp-name')?.value,
                roll: document.getElementById('inp-roll')?.value,
                id: document.getElementById('inp-id')?.value,
                class: document.getElementById('inp-class')?.value,
                mobile: getMobileFromForm(),
                father: document.getElementById('inp-father')?.value,
                mother: document.getElementById('inp-mother')?.value,
                notes: document.getElementById('inp-notes')?.value,
                status: document.getElementById('inp-status')?.checked,
                custom: {}
            };

            document.querySelectorAll('.custom-field-input').forEach(input => {
                if (input.type !== 'file') formData.custom[input.dataset.field] = input.value;
            });

            // Handle URL uploads for Student Photo & Birth Certificate in Draft
            const photoUrlActive = document.getElementById('pane-inp-photo-url') && !document.getElementById('pane-inp-photo-url').classList.contains('hidden');
            const photoUrlInput = document.getElementById('inp-photo-url');
            if (photoUrlActive && photoUrlInput && photoUrlInput.value.trim()) {
                formData.custom['imageFilename'] = photoUrlInput.value.trim();
                formData.custom['imageUploadMode'] = 'url';
            }

            const birthUrlActive = document.getElementById('pane-inp-birth-cert-url') && !document.getElementById('pane-inp-birth-cert-url').classList.contains('hidden');
            const birthUrlInput = document.getElementById('inp-birth-cert-url');
            if (birthUrlActive && birthUrlInput && birthUrlInput.value.trim()) {
                formData.custom['birthCertFilename'] = birthUrlInput.value.trim();
                formData.custom['birthCertUploadMode'] = 'url';
            }

            localStorage.setItem(STORAGE_KEYS.formDraft, JSON.stringify(formData));
        };

        const saveDraft = () => {
            const editUid = document.getElementById('edit-uid')?.value;
            if (editUid) return;
            clearTimeout(draftSaveTimeout);
            draftSaveTimeout = setTimeout(performSaveDraft, 500);
        };

        function clearDraft() { localStorage.removeItem(STORAGE_KEYS.formDraft); }

        function loadDraft() {
            const draft = localStorage.getItem(STORAGE_KEYS.formDraft);
            if (!draft) return;
            try {
                const data = JSON.parse(draft);
                if (data.name !== undefined) document.getElementById('inp-name').value = data.name;
                if (data.roll !== undefined) document.getElementById('inp-roll').value = data.roll;
                if (data.id !== undefined) document.getElementById('inp-id').value = data.id;
                if (data.class !== undefined) document.getElementById('inp-class').value = data.class;
                if (data.mobile !== undefined) {
                    const m = splitMobile(data.mobile || '+88');
                    const cEl = document.getElementById('inp-mobile-code');
                    const nEl = document.getElementById('inp-mobile-number');
                    if (cEl) cEl.value = m.code;
                    if (nEl) nEl.value = m.number;
                }
                if (data.father !== undefined) document.getElementById('inp-father').value = data.father;
                if (data.mother !== undefined) document.getElementById('inp-mother').value = data.mother;
                if (data.notes !== undefined) document.getElementById('inp-notes').value = data.notes;

                if (data.status !== undefined) {
                    const statusInput = document.getElementById('inp-status');
                    if (statusInput) {
                        statusInput.checked = data.status;
                        toggleAutoGenerate(); // Update UI label based on status
                    }
                }

                // Restore Custom Fields
                if (data.custom) {
                    document.querySelectorAll('.custom-field-input').forEach(input => {
                        const field = input.dataset.field;
                        if (data.custom[field] !== undefined) {
                            input.value = data.custom[field];
                        }
                    });

                    // Restore Student Photo and Birth Certificate URL upload inputs
                    const isUrlString = (str) => str && (str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:'));
                    
                    const imgVal = data.custom['imageFilename'];
                    if (isUrlString(imgVal)) {
                        if (typeof window.toggleUploadMode === 'function') {
                            window.toggleUploadMode('inp-photo', 'url');
                            const photoUrlInput = document.getElementById('inp-photo-url');
                            if (photoUrlInput) {
                                photoUrlInput.value = imgVal;
                                if (typeof window.previewURL === 'function') {
                                    window.previewURL('inp-photo-url', 'preview-photo', 'শিক্ষার্থীর ছবি', 'inp-photo');
                                }
                            }
                        }
                    }

                    const birthVal = data.custom['birthCertFilename'];
                    if (isUrlString(birthVal)) {
                        if (typeof window.toggleUploadMode === 'function') {
                            window.toggleUploadMode('inp-birth-cert', 'url');
                            const birthUrlInput = document.getElementById('inp-birth-cert-url');
                            if (birthUrlInput) {
                                birthUrlInput.value = birthVal;
                                if (typeof window.previewURL === 'function') {
                                    window.previewURL('inp-birth-cert-url', 'preview-birth-cert', 'জন্ম নিবন্ধন', 'inp-birth-cert');
                                }
                            }
                        }
                    }
                }
            } catch (e) { console.error("Draft load error:", e); }
        }

        const initDraftListeners = () => {
            const form = document.getElementById('student-form');
            if (form) {
                form.addEventListener('input', saveDraft);
                form.addEventListener('change', saveDraft);
            }
            window.addEventListener('beforeunload', performSaveDraft);
        };
        window.toggleUploadMode = function (inputId, mode) {
            const fileBtn = document.getElementById(`btn-mode-${inputId}-file`);
            const urlBtn = document.getElementById(`btn-mode-${inputId}-url`);
            const filePane = document.getElementById(`pane-${inputId}-file`);
            const urlPane = document.getElementById(`pane-${inputId}-url`);
            const fileInput = document.getElementById(inputId);
            const urlInput = document.getElementById(`${inputId}-url`);
            const previewId = inputId === 'inp-photo' ? 'preview-photo' : 'preview-birth-cert';
            const preview = document.getElementById(previewId);
            const infoLabel = document.getElementById(`label-${inputId}-info`);

            if (mode === 'file') {
                if (fileBtn) fileBtn.className = 'px-2.5 py-1 rounded-md font-semibold transition bg-white text-indigo-600 shadow-sm';
                if (urlBtn) urlBtn.className = 'px-2.5 py-1 rounded-md font-semibold transition text-gray-500 hover:text-gray-900';
                if (filePane) filePane.classList.remove('hidden');
                if (urlPane) urlPane.classList.add('hidden');
                
                // Clear URL input
                if (urlInput) urlInput.value = '';
                
                // Set preview to file input's files if selected, else saved file
                if (fileInput && fileInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        if (preview) {
                            preview.onload = null;
                            preview.onerror = null;
                            preview.src = e.target.result;
                            preview.classList.remove('hidden');
                        }
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                    if (infoLabel) infoLabel.innerText = 'Selected: ' + fileInput.files[0].name;
                } else {
                    const existingName = fileInput ? (fileInput.getAttribute('data-existing') || '') : '';
                    if (existingName && !existingName.startsWith('http://') && !existingName.startsWith('https://') && !existingName.startsWith('data:')) {
                        if (preview) {
                            preview.onload = null;
                            preview.onerror = null;
                            preview.src = `./${existingName}`;
                            preview.classList.remove('hidden');
                        }
                        if (infoLabel) infoLabel.innerText = 'Saved: ' + existingName;
                    } else {
                        if (preview) {
                            preview.onload = null;
                            preview.onerror = null;
                            preview.src = '';
                            preview.classList.add('hidden');
                        }
                        if (infoLabel) infoLabel.innerText = inputId === 'inp-photo' ? 'Automatic Download on Save' : 'PDF / Image';
                    }
                }
            } else {
                if (urlBtn) urlBtn.className = 'px-2.5 py-1 rounded-md font-semibold transition bg-white text-indigo-600 shadow-sm';
                if (fileBtn) fileBtn.className = 'px-2.5 py-1 rounded-md font-semibold transition text-gray-500 hover:text-gray-900';
                if (urlPane) urlPane.classList.remove('hidden');
                if (filePane) filePane.classList.add('hidden');
                
                // Clear file input
                if (fileInput) fileInput.value = '';
                
                // Set preview to URL input value if filled, else saved URL
                if (urlInput && urlInput.value.trim()) {
                    const urlVal = urlInput.value.trim();
                    if (preview) {
                        preview.onload = function() {
                            if (infoLabel) infoLabel.innerText = 'লিঙ্ক ছবির প্রিভিউ সফলভাবে লোড হয়েছে';
                        };
                        preview.onerror = function() {
                            preview.src = '';
                            preview.classList.add('hidden');
                            if (infoLabel) infoLabel.innerText = 'ভুল লিঙ্ক বা ছবি লোড করতে ব্যর্থ';
                        };
                        preview.src = urlVal;
                        preview.classList.remove('hidden');
                    }
                    if (infoLabel) infoLabel.innerText = 'Link URL preview loading...';
                } else {
                    const existingName = fileInput ? (fileInput.getAttribute('data-existing') || '') : '';
                    if (existingName && (existingName.startsWith('http://') || existingName.startsWith('https://') || existingName.startsWith('data:'))) {
                        if (urlInput) urlInput.value = existingName;
                        if (preview) {
                            preview.onload = function() {
                                if (infoLabel) infoLabel.innerText = 'লিঙ্ক ছবির প্রিভিউ সফলভাবে লোড হয়েছে';
                            };
                            preview.onerror = function() {
                                preview.src = '';
                                preview.classList.add('hidden');
                                if (infoLabel) infoLabel.innerText = 'ভুল লিঙ্ক বা ছবি লোড করতে ব্যর্থ';
                            };
                            preview.src = existingName;
                            preview.classList.remove('hidden');
                        }
                        if (infoLabel) infoLabel.innerText = 'Saved URL';
                    } else {
                        if (preview) {
                            preview.onload = null;
                            preview.onerror = null;
                            preview.src = '';
                            preview.classList.add('hidden');
                        }
                        if (infoLabel) infoLabel.innerText = inputId === 'inp-photo' ? 'Automatic Download on Save' : 'PDF / Image';
                    }
                }
            }
            saveDraft();
        };

        window.previewURL = function (urlInputId, previewId, field, inputId) {
            const urlInput = document.getElementById(urlInputId);
            const preview = document.getElementById(previewId);
            const url = urlInput ? urlInput.value.trim() : '';
            const infoLabel = document.getElementById(`label-${inputId}-info`);

            if (url) {
                if (preview) {
                    preview.onload = function() {
                        if (infoLabel) infoLabel.innerText = 'লিঙ্ক ছবির প্রিভিউ সফলভাবে লোড হয়েছে';
                    };
                    preview.onerror = function() {
                        preview.src = '';
                        preview.classList.add('hidden');
                        if (infoLabel) infoLabel.innerText = 'ভুল লিঙ্ক বা ছবি লোড করতে ব্যর্থ';
                    };
                    preview.src = url;
                    preview.classList.remove('hidden');
                }
                if (infoLabel) infoLabel.innerText = 'Link URL preview loading...';
            } else {
                if (preview) {
                    preview.onload = null;
                    preview.onerror = null;
                    preview.src = '';
                    preview.classList.add('hidden');
                }
                if (infoLabel) infoLabel.innerText = field === 'শিক্ষার্থীর ছবি' ? 'Automatic Download on Save' : 'PDF / Image';
            }
            saveDraft();
        };

        function previewFile(input, previewId) {
            const preview = document.getElementById(previewId);
            const parent = preview.parentElement;
            const file = input.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                    preview.classList.remove('hidden');
                    // Update the saved filename text nearby if exists
                    const p = input.parentElement.querySelector('p');
                    if (p) p.innerText = 'Selected: ' + file.name;
                }
                reader.readAsDataURL(file);
            } else {
                // If cancelled and no src, keep hidden or placeholder?
                // If it was already a URL, keep it? 
                // Mostly people just cancel.
            }
        }

        function openAdmissionFormPreview() {
            const studentData = {
                name: document.getElementById('inp-name')?.value || '',
                class: document.getElementById('inp-class')?.value || '',
                mobile: getMobileFromForm(),
                roll: document.getElementById('inp-roll')?.value || '',
                id: document.getElementById('inp-id')?.value || '',
                status: document.getElementById('inp-status')?.checked ? 'Active' : 'Disabled',
                father: document.getElementById('inp-father')?.value || '',
                mother: document.getElementById('inp-mother')?.value || '',
                notes: document.getElementById('inp-notes')?.value || '',
                photoUrl: document.getElementById('preview-photo')?.src || '',
                custom: {}
            };

            // Auto-load photo from root folder if not manually attached
            const currentPhotoUrl = studentData.photoUrl;
            const isPlaceholder = !currentPhotoUrl || currentPhotoUrl.includes('placeholder') || currentPhotoUrl.length < 50;

            if (isPlaceholder && studentData.id && studentData.name) {
                const studentId = studentData.id;
                const studentName = studentData.name;

                // Try to use the same logic as getStudentPhoto
                const dummyStudent = { id: studentId, name: studentName };
                studentData.photoUrl = getStudentPhoto(dummyStudent);
                studentData.photoBaseName = `${studentId} ${studentName} `;
            }

            document.querySelectorAll('.custom-field-input').forEach(input => {
                if (input.dataset.field) studentData.custom[input.dataset.field] = input.value || '';
            });
            currentAdmissionData = studentData;
            const modal = document.getElementById('admission-print-modal');
            if (modal) {
                modal.classList.remove('hidden');
                renderAdmissionForm(studentData, false);
            }
            setTimeout(() => lucide.createIcons(), 100);
        }

        function renderAdmissionForm(data, isBlank = false, hideHeaders = false) {
            const previewContainer = document.getElementById('admission-form-preview');
            if (!previewContainer) return;
            const getValue = (val) => isBlank ? '' : (val || '');

            // RELAXED: Don't require length > 50 (which blocked filenames)
            const showPhoto = !isBlank && data.photoUrl && !data.photoUrl.includes('placeholder');
            const html = `
            <style>
        .admission-form-container { font-family: 'SolaimanLipi', sans-serif; color: #000; line-height: 1.3; }
        .admission-form-field { display: flex; align-items: flex-end; margin-bottom: 14px; } /* Inline layout, space for handwriting */
        .admission-form-label { font-size: 13px; font-weight: 700; color: #000; margin-right: 8px; white-space: nowrap; flex-shrink: 0; }
        .admission-form-value { flex: 1; border-bottom: 1px dashed #000; padding: 0 5px 2px 5px; font-size: 14px; color: #000; font-weight: 600; }
        .admission-form-value-blank { flex: 1; border-bottom: 1px dashed #999; padding: 0 5px 2px 5px; color: transparent; }
        .admission-section-title { font-size: 14px; font-weight: 800; color: #000; margin: 25px 0 8px 0; padding-bottom: 4px; border-bottom: 2px solid #000; text-transform: uppercase; display: ${hideHeaders ? 'none' : 'block'}; }
        .photo-box { width: 110px; height: 130px; border: 1px solid #000; display: flex; align-items: center; justify-content: center; background: #fff; font-size: 10px; color: #666; text-align: center; overflow: hidden; }
        .photo-box img { width: 100%; height: 100%; object-fit: cover; }
    </style>
            <div class="admission-form-container">
        <!-- Header -->
                <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 3px solid #1f2937;">
                    <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #000;">${instituteInfo.name || 'Class Connect Academy'}</h1>
                    <p style="margin: 6px 0 0 0; font-size: 12px; color: #374151;">${instituteInfo.address || ''}</p>
                    <div style="margin-top: 12px; padding: 8px; background: #1f2937; color: white; border-radius: 4px; display: inline-block;">
                        <span style="font-size: 14px; font-weight: 700;">ভর্তি ফরম</span>
                    </div>
                </div>
                <!-- Photo, Personal & Guardian Info Combined -->
                <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <div style="flex: 1;">
                        <div class="admission-section-title">ব্যক্তিগত তথ্য</div>
                        <div class="admission-form-field">
                            <label class="admission-form-label">শিক্ষার্থীর নাম *</label>
                            <div class="${isBlank ? 'admission-form-value-blank' : 'admission-form-value'}">${getValue(data.name)}</div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <div class="admission-form-field">
                                <label class="admission-form-label">ক্লাস *</label>
                                <div class="${isBlank ? 'admission-form-value-blank' : 'admission-form-value'}">${getValue(data.class)}</div>
                            </div>
                            <div class="admission-form-field">
                                <label class="admission-form-label">রোল নং</label>
                                <div class="${isBlank ? 'admission-form-value-blank' : 'admission-form-value'}">${getValue(data.roll)}</div>
                            </div>
                        </div>

                        <!-- Built-in Mobile Field (Full Width) -->
                        <div class="admission-form-field">
                            <label class="admission-form-label" style="margin-bottom: 6px;">মোবাইল নম্বর *</label>
                            <div style="display: flex; gap: 4px;">
                                ${Array(11).fill('').map((_, i) => (getValue(data.mobile)[i] || '')).map(c =>
                `<div style="width: 20px; height: 24px; border: 1px solid #000; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold;">${c}</div>`
            ).join('')}
                            </div>
                        </div>
                    </div>
                    <div style="flex-shrink: 0;">
                        <div class="photo-box">
                            ${showPhoto ? `<img src="${data.photoUrl}" alt="Photo" onerror="handlePhotoError(this, '${data.id}', '${(data.name || '').replace(/'/g, "\\'")}')">` : '<div>ছবি সংযুক্ত করুন</div>'}
                        </div>
                    </div>
                </div>

                <!-- Guardian Info - Full Width (Moved Outside Flex) -->
                <div class="admission-section-title">অভিভাবক তথ্য</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <div class="admission-form-field">
                        <label class="admission-form-label">পিতার নাম</label>
                        <div class="${isBlank ? 'admission-form-value-blank' : 'admission-form-value'}">${getValue(data.father)}</div>
                    </div>
                    <div class="admission-form-field">
                        <label class="admission-form-label">মাতার নাম</label>
                        <div class="${isBlank ? 'admission-form-value-blank' : 'admission-form-value'}">${getValue(data.mother)}</div>
                    </div>
                </div>

                <!-- Custom Fields -->
                ${Object.keys(FIELD_LIBRARY).map(cat => {
                // Filter out redundant photo fields from Custom Section since main photo is at top
                // Also filter out Father/Mother names if they are in "Guardian Information" since they are manually rendered
                const isRedundant = (f) => {
                    const isPhoto = ['ছবি', 'Photo', 'Student Photo', 'Image', 'শিক্ষার্থীর ছবি'].includes(f) || (f.includes('Photo') && f.length < 15);
                    const isGuardianName = ['পিতার নাম', 'মাতার নাম', 'Father\'s Name', 'Mother\'s Name'].includes(f);
                    return isPhoto || (cat === "অভিভাবক তথ্য" && isGuardianName);
                };

                const catFields = (FIELD_LIBRARY[cat] || []).filter(f => activeFormFields.includes(f) && !isRedundant(f));

                if (catFields.length === 0) return '';

                // Refined Attachment Logic
                const attachmentFields = catFields.filter(f => {
                    const isKeyword = ['নথিপত্র', 'Copy', 'Certificate', 'Document', 'File', 'Scan'].some(key => f.includes(key));
                    const isBirthReg = f.includes('জন্ম নিবন্ধন') || f.includes('Birth Registration');
                    const isNumber = f.includes('নম্বর') || f.includes('Number') || f.includes('No');
                    return (isKeyword || isBirthReg) && !isNumber;
                });

                const textFields = catFields.filter(f => !attachmentFields.includes(f));
                const hasAttachments = attachmentFields.length > 0;

                // Configuration for Option-based fields
                const OPTION_CONFIG = [
                    { keys: ['লিঙ্গ', 'Gender', 'Sex'], options: ['পুরুষ (Male)', 'মহিলা (Female)', 'অন্যান্য (Other)'] },
                    { keys: ['ধর্ম', 'Religion'], options: ['ইসলাম', 'হিন্দু', 'বৌদ্ধ', 'খ্রিষ্টান'] },
                    { keys: ['রক্তের গ্রুপ', 'Blood Group'], options: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'Unknown'] },
                    { keys: ['সম্পর্ক', 'Relation'], options: ['পিতা (Father)', 'মাতা (Mother)', 'অভিভাবক (Guardian)', 'অন্যান্য (Other)'] },
                    { keys: ['জিপিএ', 'GPA', 'Result', 'Grade'], options: ['A+', 'A', 'A-', 'B', 'C', 'D'] }
                ];

                const renderField = (f) => {
                    // 1. Mobile Number (11 Boxes)
                    if (f.includes('Mobile') || f.includes('মোবাইল') || f.includes('Phone')) {
                        const val = getValue(data.custom[f]);
                        const boxes = Array(11).fill('').map((_, i) => val[i] || '').map(c =>
                            `<div style="width: 20px; height: 24px; border: 1px solid #000; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold;">${c}</div>`
                        ).join('');

                        return `
                         <div style="margin-bottom: 14px;">
                            <label class="admission-form-label" style="margin-bottom: 6px;">${f}</label>
                            <div style="display: flex; gap: 4px;">${boxes}</div>
                         </div>`;
                    }

                    // 2. Birth Registration Number (17 Boxes)
                    if (f.includes('জন্ম নিবন্ধন') && (f.includes('নম্বর') || f.includes('Number') || f.includes('No'))) {
                        const val = getValue(data.custom[f]);
                        const boxes = Array(17).fill('').map((_, i) => val[i] || '').map(c =>
                            `<div style="width: 20px; height: 24px; border: 1px solid #000; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold;">${c}</div>`
                        ).join('');

                        return `
                         <div style="margin-bottom: 14px; grid-column: span 2;">
                            <label class="admission-form-label" style="margin-bottom: 6px;">${f}</label>
                            <div style="display: flex; gap: 4px;">${boxes}</div>
                         </div>`;
                    }

                    // 3. Option Fields (Checkboxes)
                    const optionConfig = OPTION_CONFIG.find(cfg => cfg.keys.some(k => f.includes(k)));
                    if (optionConfig) {
                        const savedVal = getValue(data.custom[f]);
                        return `
                        <div style="margin-bottom: 14px;">
                            <label class="admission-form-label">${f}</label>
                            <div style="display: flex; flex-wrap: wrap; gap: 15px; padding-top: 4px;">
                                ${optionConfig.options.map(opt => {
                            const isChecked = !isBlank && (savedVal === opt || (savedVal && opt.includes(savedVal)));
                            return `
                                    <div style="display: flex; align-items: center; gap: 6px;">
                                        <div style="width: 14px; height: 14px; border: 1px solid #000; border-radius: 2px; display: flex; align-items: center; justify-content: center;">
                                            ${isChecked ? '<div style="width: 8px; height: 8px; background: #000;"></div>' : ''}
                                        </div>
                                        <span style="font-size: 12px; font-weight: 600;">${opt}</span>
                                    </div>`;
                        }).join('')}
                            </div>
                        </div>`;
                    }

                    // 4. Default Text Line (Full Width check)
                    const isFullWidthIdentity = f.includes('নাম') || f.includes('Name') || f.includes('Address') || f.includes('ঠিকানা') || f.includes('Notes') || f.includes('মন্তব্য') || f.includes('Occupation') || f.includes('পেশা');
                    const style = isFullWidthIdentity ? 'grid-column: span 2;' : '';

                    return `
                    <div class="admission-form-field" style="${style}">
                        <label class="admission-form-label">${f}</label>
                        <div class="${isBlank ? 'admission-form-value-blank' : 'admission-form-value'}">${getValue(data.custom[f])}</div>
                    </div>`;
                };

                const renderAttachment = (f) => (() => {
                    const hasAttachment = !isBlank && data.custom[f] && data.custom[f].length > 20;
                    if (hasAttachment) {
                        return `<div style="border: 1px solid #10b981; height: 100px; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #ecfdf5; font-size: 11px; color: #059669; margin-bottom: 12px;">
                            <div style="font-size: 28px; margin-bottom: 8px;">✓</div>
                            <div style="font-weight: 600;">সংযুক্ত করা হয়েছে</div>
                        </div>`;
                    } else {
                        return `<div style="border: 1px dashed #9ca3af; height: 100px; width: 100%; display: flex; align-items: center; justify-content: center; background: #f9fafb; font-size: 11px; color: #9ca3af; margin-bottom: 12px; text-align: center; padding: 10px;">${f} সংযুক্ত করুন</div>`;
                    }
                })();

                if (hasAttachments) {
                    return `
                    <div class="admission-section-title">${cat}</div>
                    <div style="display: flex; gap: 20px;">
                        <div style="flex: 1;">
                             <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                                ${textFields.map(f => renderField(f)).join('')}
                             </div>
                        </div>
                        <div style="width: 130px; flex-shrink: 0; display: flex; flex-direction: column; gap: 10px;">
                            ${attachmentFields.map(f => renderAttachment(f)).join('')}
                        </div>
                    </div>`;
                } else {
                    return `
                    <div class="admission-section-title">${cat}</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                         <!-- Use full width for option fields or numbers to avoid cramping, grid for text -->
                        ${textFields.map(f => renderField(f)).join('')}
                    </div>`;
                }
            }).join('')}

                <!-- Signature Section -->
                <div style="display: flex; justify-content: space-between; margin-top: 60px; padding-top: 20px;">
                    <div style="text-align: center;">
                        <div style="border-top: 1px solid #374151; width: 140px; margin: 0 auto;"></div>
                        <div style="font-size: 11px; margin-top: 4px; font-weight: 600;">শিক্ষার্থীর স্বাক্ষর</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="border-top: 1px solid #374151; width: 140px; margin: 0 auto;"></div>
                        <div style="font-size: 11px; margin-top: 4px; font-weight: 600;">অভিভাবকের স্বাক্ষর</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="border-top: 1px solid #374151; width: 140px; margin: 0 auto;"></div>
                        <div style="font-size: 11px; margin-top: 4px; font-weight: 600;">কর্তৃপক্ষের স্বাক্ষর</div>
                    </div>
                </div>
            </div>`;
            previewContainer.innerHTML = html;
        }

        function togglePrintMode() {
            const toggle = document.getElementById('print-blank-toggle');
            const label = document.getElementById('print-mode-label');
            const headerToggle = document.getElementById('print-header-toggle');

            if (!toggle || !label || !currentAdmissionData) return;
            const isBlank = toggle.checked;
            const hideHeaders = headerToggle ? headerToggle.checked : false;

            label.textContent = isBlank ? 'Blank Form' : 'Filled Data';
            renderAdmissionForm(currentAdmissionData, isBlank, hideHeaders);
        }

        function printAdmissionForm() {
            const content = document.getElementById('admission-form-preview').innerHTML;
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`<html><head><title>Print Form</title><link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet"></head><body>${content}
            <script>
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                setTimeout(() => { 
                    window.print(); 
                    if (!isMobile) window.close(); 
                }, 800);
                window.addEventListener('afterprint', () => { window.close(); });
            </` + `script>
            </body></html>`);
            printWindow.document.close();
        }

        function closeAdmissionPreview() {
            const modal = document.getElementById('admission-print-modal');
            if (modal) modal.classList.add('hidden');
        }

        function handleFabClick() {
            const isExpenseMode = (currentMode === 'expenses' || (currentMode === 'dashboard' && window.dashboardContext === 'expenses'));
            if (isExpenseMode) {
                if (typeof openAddExpenseModal === 'function') openAddExpenseModal();
            } else {
                if (typeof openAddModal === 'function') openAddModal();
            }
        }

        function closeStudentModal() {
            const modal = document.getElementById('student-modal');
            if (modal) modal.classList.add('hidden');
            clearDraft();
        }


        let currentEditingExpenseId = null;

        // =========================================================
        // EXPENSE & INCOME TYPE MANAGEMENT
        // =========================================================
        const DEFAULT_EXPENSE_TYPES = ['কাচা বাজার', 'চাউল', 'বিদ্যুৎ বিল', 'পানির বিল', 'গ্যাস বিল', 'পরিবহণ', 'বেতন', 'রান্নাঘর', 'মেরামত', 'অন্যান্য'];
        const DEFAULT_INCOME_TYPES = ['লিল্লাহ বোর্ডিং', 'অনুদান', 'যাকাত', 'সদকা', 'ফিতরা', 'অন্যান্য আয়'];

        let expenseTypes = JSON.parse(localStorage.getItem(STORAGE_KEYS.expenseTypes)) || [...DEFAULT_EXPENSE_TYPES];
        let incomeTypes = JSON.parse(localStorage.getItem(STORAGE_KEYS.incomeTypes)) || [...DEFAULT_INCOME_TYPES];

        async function saveExpenseTypes() {
            localStorage.setItem(STORAGE_KEYS.expenseTypes, JSON.stringify(expenseTypes));
        }
        async function saveIncomeTypes() {
            localStorage.setItem(STORAGE_KEYS.incomeTypes, JSON.stringify(incomeTypes));
        }

        function openTypeManager(tab = 'expense') {
            renderTypeManagerModal(tab);
            const modal = document.getElementById('type-manager-modal');
            if (modal) modal.classList.remove('hidden');
            if (typeof lucide !== 'undefined') setTimeout(() => lucide.createIcons(), 10);
        }

        function closeTypeManager() {
            const modal = document.getElementById('type-manager-modal');
            if (modal) modal.classList.add('hidden');
        }

        function renderTypeManagerModal(activeTab = 'expense') {
            const content = document.getElementById('type-manager-content');
            if (!content) return;
            const types = activeTab === 'expense' ? expenseTypes : incomeTypes;
            const colorClass = activeTab === 'expense' ? 'rose' : 'emerald';
            const label = activeTab === 'expense' ? 'খরচের ধরন' : 'আয়ের ধরন';

            content.innerHTML = `
                <!-- Tabs -->
                <div class="flex gap-2 p-1 bg-gray-100 rounded-2xl mb-5">
                    <button onclick="renderTypeManagerModal('expense')"
                        class="flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'expense' ? 'bg-rose-600 text-white shadow' : 'text-gray-500 hover:bg-white'}">
                        <i data-lucide="wallet" class="w-3.5 h-3.5 inline mr-1"></i> খরচের ধরন
                    </button>
                    <button onclick="renderTypeManagerModal('income')"
                        class="flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'income' ? 'bg-emerald-600 text-white shadow' : 'text-gray-500 hover:bg-white'}">
                        <i data-lucide="trending-up" class="w-3.5 h-3.5 inline mr-1"></i> আয়ের ধরন
                    </button>
                </div>

                <!-- Type List -->
                <div class="space-y-2 max-h-64 overflow-y-auto pr-1 mb-4" id="type-list-container">
                    ${types.map((t, i) => `
                        <div class="flex items-center justify-between gap-3 bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100 group">
                            <span class="text-sm font-bold text-gray-700 flex-1">${t}</span>
                            <button onclick="deleteType('${activeTab}', ${i})"
                                class="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100">
                                <i data-lucide="trash-2" class="w-4 h-4"></i>
                            </button>
                        </div>`).join('')}
                    ${types.length === 0 ? '<p class="text-center text-sm text-gray-400 py-4">কোনো ধরন নেই</p>' : ''}
                </div>

                <!-- Add New -->
                <div class="flex gap-2">
                    <input type="text" id="new-type-input" placeholder="নতুন ধরন লিখুন..."
                        class="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-${colorClass}-500 outline-none transition-all"
                        onkeydown="if(event.key==='Enter') addNewType('${activeTab}')">
                    <button onclick="addNewType('${activeTab}')"
                        class="px-4 py-3 bg-${colorClass}-600 text-white rounded-2xl font-bold text-sm hover:bg-${colorClass}-700 transition flex items-center gap-2">
                        <i data-lucide="plus" class="w-4 h-4"></i> যোগ
                    </button>
                </div>
            `;
            if (typeof lucide !== 'undefined') setTimeout(() => lucide.createIcons(), 10);
        }

        async function addNewType(tab) {
            const input = document.getElementById('new-type-input');
            if (!input) return;
            const val = input.value.trim();
            if (!val) return showToast('ধরনের নাম লিখুন');
            if (tab === 'expense') {
                if (expenseTypes.includes(val)) return showToast('এই ধরন ইতিমধ্যে আছে');
                expenseTypes.push(val);
                await saveExpenseTypes();
            } else {
                if (incomeTypes.includes(val)) return showToast('এই ধরন ইতিমধ্যে আছে');
                incomeTypes.push(val);
                await saveIncomeTypes();
            }
            input.value = '';
            renderTypeManagerModal(tab);
            showToast('✅ নতুন ধরন যোগ হয়েছে');
        }

        async function deleteType(tab, index) {
            if (tab === 'expense') {
                expenseTypes.splice(index, 1);
                await saveExpenseTypes();
            } else {
                incomeTypes.splice(index, 1);
                await saveIncomeTypes();
            }
            renderTypeManagerModal(tab);
            showToast('ধরন মুছে ফেলা হয়েছে');
        }

        function populateExpenseTypeDropdown() {
            const select = document.getElementById('exp-type-select');
            if (!select) return;
            const current = select.value;
            select.innerHTML = `
                <option value="">-- খরচের ধরন বাছুন --</option>
                ${expenseTypes.map(t => `<option value="${t}" ${t === current ? 'selected' : ''}>${t}</option>`).join('')}
            `;
        }

        function openAddExpenseModal(id) {
            const modal = document.getElementById('expense-modal');
            if (!modal) return;

            const titleEl = document.getElementById('exp-title');
            const dateEl = document.getElementById('exp-date');
            const container = document.getElementById('expense-items-container');

            // Populate the type dropdown
            populateExpenseTypeDropdown();
            const typeSelect = document.getElementById('exp-type-select');

            if (id) {
                currentEditingExpenseId = id;
                const exp = expenses.find(e => e.id === id);
                if (exp) {
                    titleEl.value = exp.title;
                    dateEl.value = exp.date.split('T')[0];
                    if (typeSelect && exp.expenseType) typeSelect.value = exp.expenseType;
                    container.innerHTML = '';
                    exp.items.forEach(item => addExpenseItemRow(item.desc, item.amount));
                    document.querySelector('#expense-modal h3').innerText = 'ভাউচার এডিট করুন';
                }
            } else {
                currentEditingExpenseId = null;
                dateEl.valueAsDate = new Date();
                titleEl.value = '';
                if (typeSelect) typeSelect.value = '';
                container.innerHTML = '';
                addExpenseItemRow();
                document.querySelector('#expense-modal h3').innerText = 'খরচ যুক্ত করুন';
            }

            calculateExpenseTotal();
            modal.classList.remove('hidden');
            setTimeout(() => lucide.createIcons(), 10);
        }

        function addExpenseItemRow(desc = '', amount = '') {
            const container = document.getElementById('expense-items-container');
            const row = document.createElement('div');
            row.className = 'expense-item-row flex gap-3 animate-fade-in group';
            row.innerHTML = `
            <div class="flex-1">
                    <input type="text" placeholder="বিবরণ" value="${desc}" class="item-desc w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-rose-500 outline-none transition-all">
                </div>
                <div class="w-32">
                    <input type="number" placeholder="৳" value="${amount}" oninput="calculateExpenseTotal()" class="item-amount w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-black text-rose-600 focus:ring-2 focus:ring-rose-500 outline-none transition-all text-right">
                </div>
                <button onclick="removeExpenseItemRow(this)" class="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition self-center opacity-0 group-hover:opacity-100">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>`;
            container.appendChild(row);
            setTimeout(() => lucide.createIcons(), 10);
        }

        function removeExpenseItemRow(btn) {
            const container = document.getElementById('expense-items-container');
            if (container.children.length > 1) {
                btn.closest('.expense-item-row').remove();
                calculateExpenseTotal();
            } else {
                showToast('অন্তত একটি আইটেম থাকতে হবে');
            }
        }

        function calculateExpenseTotal() {
            const amounts = document.querySelectorAll('.item-amount');
            let total = 0;
            amounts.forEach(input => { total += parseFloat(input.value) || 0; });
            document.getElementById('exp-grand-total').innerText = '৳' + total.toLocaleString();
            return total;
        }

        function toggleVoucherMenu(event, id) {
            event.stopPropagation();

            // Close all other menus and reset their z-index
            document.querySelectorAll('[id^="voucher-menu-"]').forEach(m => {
                const otherCard = m.closest('#expense-list-cards > div');
                if (m.id !== `voucher-menu-${id}`) {
                    m.classList.add('hidden');
                    if (otherCard) otherCard.style.zIndex = '';
                }
            });

            const menu = document.getElementById(`voucher-menu-${id}`);
            const card = menu?.closest('#expense-list-cards > div');

            if (menu) {
                const isOpening = menu.classList.contains('hidden');
                menu.classList.toggle('hidden');
                if (card) {
                    card.style.zIndex = isOpening ? '300' : '';
                }
            }
        }

        // Close menus on outside click and reset z-index
        document.addEventListener('click', () => {
            document.querySelectorAll('[id^="voucher-menu-"]').forEach(m => {
                m.classList.add('hidden');
                const card = m.closest('#expense-list-cards > div');
                if (card) card.style.zIndex = '';
            });
        });

        async function saveExpenseVoucher() {
            const date = document.getElementById('exp-date').value;
            const title = document.getElementById('exp-title').value;
            const expenseType = (document.getElementById('exp-type-select')?.value || '').trim();
            const rowEls = document.querySelectorAll('.expense-item-row');
            const items = [];
            let total = 0;
            rowEls.forEach(row => {
                const desc = row.querySelector('.item-desc').value.trim();
                const amount = parseFloat(row.querySelector('.item-amount').value) || 0;
                if (desc && amount > 0) { items.push({ desc, amount }); total += amount; }
            });
            if (items.length === 0) { showToast('অনুগ্রহ করে সঠিক বিবরণ ও টাকা প্রদান করুন'); return; }

            if (currentEditingExpenseId) {
                const idx = expenses.findIndex(e => e.id === currentEditingExpenseId);
                if (idx !== -1) {
                    expenses[idx] = { ...expenses[idx], date: date || new Date().toISOString(), title: title || 'সাধারণ খরচ', expenseType, items: items, total: total };
                    showToast('ভাউচার সফলভাবে আপডেট হয়েছে!');
                }
            } else {
                const voucher = { id: 'EXP-' + Date.now(), date: date || new Date().toISOString(), title: title || 'সাধারণ খরচ', expenseType, items: items, total: total, collector: 'Admin' };
                expenses.push(voucher);
                showToast('ভাউচার সফলভাবে সংরক্ষিত হয়েছে!');
            }

            await ShadowStorage.save(STORAGE_KEYS.expenses, expenses);
            closeModal('expense-modal');

            // Force Update UI
            renderExpenses();
            if (typeof renderDashboard === 'function') {
                renderDashboard();
                if (window.dashboardContext === 'expenses' && typeof renderExpensesDashboard === 'function') {
                    renderExpensesDashboard();
                }
            }

            const msg = currentEditingExpenseId ? 'ভাউচার সফলভাবে আপডেট হয়েছে!' : 'ভাউচার সফলভাবে সংরক্ষিত হয়েছে!';
            showToast(msg);
        }

        function renderExpenses() {
            const container = document.getElementById('expense-list-cards');
            if (!container) return;
            container.innerHTML = '';

            const searchVal = (document.getElementById('student-search')?.value || '').toLowerCase().trim();

            let total = 0, monthTotal = 0, todayTotal = 0;
            const todayStr = new Date().toISOString().split('T')[0];
            const monthStr = todayStr.substring(0, 7);

            const filtered = (expenses || []).filter(exp => {
                try {
                    const title = (exp.title || '').toLowerCase();
                    const id = (exp.id || '').toLowerCase();
                    const itemsText = (exp.items || []).map(i => i.desc || '').join(' ').toLowerCase();
                    return !searchVal || title.includes(searchVal) || id.includes(searchVal) || itemsText.includes(searchVal);
                } catch (err) {
                    console.error('Error filtering expense card:', exp, err);
                    return false;
                }
            });

            filtered.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(exp => {
                const isSelected = selectedExpenseIds.some(sid => sid == exp.id);
                total += exp.total;
                if (exp.date.startsWith(todayStr)) todayTotal += exp.total;
                if (exp.date.startsWith(monthStr)) monthTotal += exp.total;

                const card = document.createElement('div');
                card.className = `bg-gray-50/50 rounded-2xl border ${isSelected ? 'border-rose-500 bg-rose-50/30' : 'border-gray-100'} p-4 transition-all hover:shadow-md group relative cursor-pointer`;
                card.id = `expense-card-${exp.id}`;
                card.onclick = () => {
                    if (expenseSelectionMode) {
                        toggleExpenseSelection(exp.id);
                    } else {
                        openExpenseDetails(exp.id);
                    }
                };

                // Long press support
                let pressTimer;
                const startPress = () => {
                    pressTimer = window.setTimeout(() => {
                        if (!expenseSelectionMode) toggleExpenseSelectionMode(exp.id);
                    }, 600);
                };
                const cancelPress = () => clearTimeout(pressTimer);

                card.onmousedown = startPress;
                card.onmouseup = cancelPress;
                card.onmouseleave = cancelPress;
                card.ontouchstart = startPress;
                card.ontouchend = cancelPress;

                const selectionHtml = expenseSelectionMode ? `
                        <div class="absolute top-3 right-3 z-20">
                            <div class="w-5 h-5 rounded-full border-2 ${isSelected ? 'bg-rose-600 border-rose-600' : 'border-gray-300'} flex items-center justify-center transition-all">
                                ${isSelected ? '<i data-lucide="check" class="w-3 h-3 text-white"></i>' : ''}
                            </div>
                        </div>
                    ` : '';

                const menuHtml = !expenseSelectionMode ? `
                                <!-- Three-dot menu -->
                                <div class="relative">
                                    <button onclick="event.stopPropagation(); toggleVoucherMenu(event, '${exp.id}')" class="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200 shadow-sm active:scale-95">
                                        <i data-lucide="more-vertical" class="w-5 h-5"></i>
                                    </button>
                                    <!-- Dropdown -->
                                    <div id="voucher-menu-${exp.id}" class="hidden absolute right-0 top-full mt-2 w-32 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 z-[100] py-1.5 overflow-hidden animate-slide-up">
                                        <button onclick="event.stopPropagation(); openAddExpenseModal('${exp.id}')" class="w-full px-4 py-2.5 text-xs font-black text-left text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors flex items-center gap-2.5">
                                            <i data-lucide="edit-3" class="w-4 h-4"></i> Edit
                                        </button>
                                        <button onclick="event.stopPropagation(); deleteExpense('${exp.id}')" class="w-full px-4 py-2.5 text-xs font-black text-left text-rose-600 hover:bg-rose-50/80 transition-colors flex items-center gap-2.5">
                                            <i data-lucide="trash-2" class="w-4 h-4"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            ` : '';

                card.innerHTML = `
            <div class="absolute top-0 left-0 w-1.5 h-full ${isSelected ? 'bg-rose-600' : 'bg-rose-500 opacity-0 group-hover:opacity-100'} transition-opacity rounded-l-2xl" ></div>
                ${selectionHtml}
        <div class="flex justify-between items-center gap-4">
            <div class="min-w-0 flex-1">
                <h4 class="font-black text-gray-800 text-sm truncate leading-tight">${exp.title}</h4>
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mt-0.5">${new Date(exp.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <div class="flex items-center gap-3 shrink-0">
                <div class="text-xl font-black text-rose-600 tracking-tighter">৳${exp.total.toLocaleString()}</div>
                ${menuHtml}
            </div>
        </div>
        `;
                container.appendChild(card);
            });

            // Update Stats (Always reflecting global stats, but rendering cards respects filter)
            // If the user wants stats to filter too, we can use the 'filtered' list for totals.
            // Let's keep global for now unless they specify.
            document.getElementById('exp-stat-total').innerText = '৳' + total.toLocaleString();
            document.getElementById('exp-stat-month').innerText = '৳' + monthTotal.toLocaleString();
            document.getElementById('exp-stat-today').innerText = '৳' + todayTotal.toLocaleString();
            setTimeout(() => lucide.createIcons(), 10);
        }

        function toggleExpenseSelectionMode(initialId = null) {
            expenseSelectionMode = !expenseSelectionMode;
            selectedExpenseIds = initialId ? [String(initialId)] : [];

            const selectionBar = document.getElementById('expense-selection-bar');
            const entryBtn = document.getElementById('exp-select-entry-btn');

            if (expenseSelectionMode) {
                if (selectionBar) selectionBar.classList.remove('hidden');
                if (entryBtn) entryBtn.classList.add('bg-rose-100', 'ring-2', 'ring-rose-500/20');
            } else {
                if (selectionBar) selectionBar.classList.add('hidden');
                if (entryBtn) entryBtn.classList.remove('bg-rose-100', 'ring-2', 'ring-rose-500/20');
            }

            updateExpenseSelectionUI();
            renderExpenses();
        }

        // =========================================================
        // INCOME MANAGEMENT (NEW)
        // =========================================================
        let currentEditingIncomeId = null;
        let incomeSelectionMode = false;
        let selectedIncomeIds = [];

        function populateIncomeTypeDropdown() {
            const select = document.getElementById('inc-type-select');
            if (!select) return;
            const current = select.value;
            select.innerHTML = `
                <option value="">-- আয়ের ধরন বাছুন --</option>
                ${incomeTypes.map(t => `<option value="${t}" ${t === current ? 'selected' : ''}>${t}</option>`).join('')}
            `;
        }

        function openAddIncomeModal(id) {
            const modal = document.getElementById('income-modal');
            if (!modal) return;

            const titleEl = document.getElementById('inc-title');
            const dateEl = document.getElementById('inc-date');
            const container = document.getElementById('income-items-container');

            populateIncomeTypeDropdown();
            const typeSelect = document.getElementById('inc-type-select');

            if (id) {
                currentEditingIncomeId = id;
                const inc = incomes.find(e => e.id === id);
                if (inc) {
                    titleEl.value = inc.title;
                    dateEl.value = inc.date.split('T')[0];
                    if (typeSelect && inc.incomeType) typeSelect.value = inc.incomeType;
                    container.innerHTML = '';
                    inc.items.forEach(item => addIncomeItemRow(item.desc, item.amount));
                    document.querySelector('#income-modal h3').innerText = 'ভাউচার এডিট করুন';
                }
            } else {
                currentEditingIncomeId = null;
                dateEl.valueAsDate = new Date();
                titleEl.value = '';
                if (typeSelect) typeSelect.value = '';
                container.innerHTML = '';
                addIncomeItemRow();
                document.querySelector('#income-modal h3').innerText = 'আয় যুক্ত করুন';
            }

            calculateIncomeTotal();
            modal.classList.remove('hidden');
            setTimeout(() => lucide.createIcons(), 10);
        }

        function addIncomeItemRow(desc = '', amount = '') {
            const container = document.getElementById('income-items-container');
            const row = document.createElement('div');
            row.className = 'income-item-row flex gap-3 animate-fade-in group';
            row.innerHTML = `
            <div class="flex-1">
                    <input type="text" placeholder="বিবরণ" value="${desc}" class="inc-item-desc w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none transition-all">
                </div>
                <div class="w-32">
                    <input type="number" placeholder="৳" value="${amount}" oninput="calculateIncomeTotal()" class="inc-item-amount w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-black text-emerald-600 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-right">
                </div>
                <button onclick="removeIncomeItemRow(this)" class="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition self-center opacity-0 group-hover:opacity-100">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>`;
            container.appendChild(row);
            setTimeout(() => lucide.createIcons(), 10);
        }

        function removeIncomeItemRow(btn) {
            const container = document.getElementById('income-items-container');
            if (container.children.length > 1) {
                btn.closest('.income-item-row').remove();
                calculateIncomeTotal();
            } else {
                showToast('অন্তত একটি আইটেম থাকতে হবে');
            }
        }

        function calculateIncomeTotal() {
            const amounts = document.querySelectorAll('.inc-item-amount');
            let total = 0;
            amounts.forEach(input => { total += parseFloat(input.value) || 0; });
            document.getElementById('inc-grand-total').innerText = '৳' + total.toLocaleString();
            return total;
        }

        function toggleIncomeMenu(event, id) {
            event.stopPropagation();
            document.querySelectorAll('[id^="income-menu-"]').forEach(m => {
                const otherCard = m.closest('#income-list-cards > div');
                if (m.id !== `income-menu-${id}`) {
                    m.classList.add('hidden');
                    if (otherCard) otherCard.style.zIndex = '';
                }
            });

            const menu = document.getElementById(`income-menu-${id}`);
            const card = menu?.closest('#income-list-cards > div');

            if (menu) {
                const isOpening = menu.classList.contains('hidden');
                menu.classList.toggle('hidden');
                if (card) {
                    card.style.zIndex = isOpening ? '300' : '';
                }
            }
        }

        document.addEventListener('click', () => {
            document.querySelectorAll('[id^="income-menu-"]').forEach(m => {
                m.classList.add('hidden');
                const card = m.closest('#income-list-cards > div');
                if (card) card.style.zIndex = '';
            });
        });

        async function saveIncomeVoucher() {
            const date = document.getElementById('inc-date').value;
            const title = document.getElementById('inc-title').value;
            const incomeType = (document.getElementById('inc-type-select')?.value || '').trim();
            const rowEls = document.querySelectorAll('.income-item-row');
            const items = [];
            let total = 0;
            rowEls.forEach(row => {
                const desc = row.querySelector('.inc-item-desc').value.trim();
                const amount = parseFloat(row.querySelector('.inc-item-amount').value) || 0;
                if (desc && amount > 0) { items.push({ desc, amount }); total += amount; }
            });
            if (items.length === 0) { showToast('অনুগ্রহ করে সঠিক বিবরণ ও টাকা প্রদান করুন'); return; }

            if (currentEditingIncomeId) {
                const idx = incomes.findIndex(e => e.id === currentEditingIncomeId);
                if (idx !== -1) {
                    incomes[idx] = { ...incomes[idx], date: date || new Date().toISOString(), title: title || 'সাধারণ আয়', incomeType, items: items, total: total };
                    showToast('ভাউচার সফলভাবে আপডেট হয়েছে!');
                }
            } else {
                const voucher = { id: 'INC-' + Date.now(), date: date || new Date().toISOString(), title: title || 'সাধারণ আয়', incomeType, items: items, total: total, collector: 'Admin' };
                incomes.push(voucher);
                showToast('ভাউচার সফলভাবে সংরক্ষিত হয়েছে!');
            }

            await ShadowStorage.save(STORAGE_KEYS.incomes, incomes);
            closeModal('income-modal');

            renderIncomes();
            if (typeof renderDashboard === 'function') {
                renderDashboard();
            }

            const msg = currentEditingIncomeId ? 'ভাউচার সফলভাবে আপডেট হয়েছে!' : 'ভাউচার সফলভাবে সংরক্ষিত হয়েছে!';
            showToast(msg);
        }

        function renderIncomes() {
            const container = document.getElementById('income-list-cards');
            if (!container) return;
            container.innerHTML = '';

            const searchVal = (document.getElementById('student-search')?.value || '').toLowerCase().trim();

            let total = 0, monthTotal = 0, todayTotal = 0;
            const todayStr = new Date().toISOString().split('T')[0];
            const monthStr = todayStr.substring(0, 7);

            const filtered = (incomes || []).filter(inc => {
                try {
                    const title = (inc.title || '').toLowerCase();
                    const id = (inc.id || '').toLowerCase();
                    const itemsText = (inc.items || []).map(i => i.desc || '').join(' ').toLowerCase();
                    return !searchVal || title.includes(searchVal) || id.includes(searchVal) || itemsText.includes(searchVal);
                } catch (err) {
                    console.error('Error filtering income card:', inc, err);
                    return false;
                }
            });

            filtered.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(inc => {
                const isSelected = selectedIncomeIds.some(sid => sid == inc.id);
                total += inc.total;
                if (inc.date.startsWith(todayStr)) todayTotal += inc.total;
                if (inc.date.startsWith(monthStr)) monthTotal += inc.total;

                const card = document.createElement('div');
                card.className = `bg-gray-50/50 rounded-2xl border ${isSelected ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-100'} p-4 transition-all hover:shadow-md group relative cursor-pointer`;
                card.id = `income-card-${inc.id}`;
                card.onclick = () => {
                    if (incomeSelectionMode) {
                        toggleIncomeSelection(inc.id);
                    } else {
                        // TODO: Add openIncomeDetails(inc.id) if view is implemented later. Currently uses edit mode to view.
                        openAddIncomeModal(inc.id);
                    }
                };

                let pressTimer;
                const startPress = () => {
                    pressTimer = window.setTimeout(() => {
                        if (!incomeSelectionMode) toggleIncomeSelectionMode(inc.id);
                    }, 600);
                };
                const cancelPress = () => clearTimeout(pressTimer);

                card.onmousedown = startPress;
                card.onmouseup = cancelPress;
                card.onmouseleave = cancelPress;
                card.ontouchstart = startPress;
                card.ontouchend = cancelPress;

                const selectionHtml = incomeSelectionMode ? `
                        <div class="absolute top-3 right-3 z-20">
                            <div class="w-5 h-5 rounded-full border-2 ${isSelected ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300'} flex items-center justify-center transition-all">
                                ${isSelected ? '<i data-lucide="check" class="w-3 h-3 text-white"></i>' : ''}
                            </div>
                        </div>
                    ` : '';

                const menuHtml = !incomeSelectionMode ? `
                                <!-- Three-dot menu -->
                                <div class="relative">
                                    <button onclick="event.stopPropagation(); toggleIncomeMenu(event, '${inc.id}')" class="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-200 shadow-sm active:scale-95">
                                        <i data-lucide="more-vertical" class="w-5 h-5"></i>
                                    </button>
                                    <!-- Dropdown -->
                                    <div id="income-menu-${inc.id}" class="hidden absolute right-0 top-full mt-2 w-32 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 z-[100] py-1.5 overflow-hidden animate-slide-up">
                                        <button onclick="event.stopPropagation(); openAddIncomeModal('${inc.id}')" class="w-full px-4 py-2.5 text-xs font-black text-left text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors flex items-center gap-2.5">
                                            <i data-lucide="edit-3" class="w-4 h-4"></i> Edit
                                        </button>
                                        <button onclick="event.stopPropagation(); deleteIncome('${inc.id}')" class="w-full px-4 py-2.5 text-xs font-black text-left text-red-600 hover:bg-red-50/80 transition-colors flex items-center gap-2.5">
                                            <i data-lucide="trash-2" class="w-4 h-4"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            ` : '';

                card.innerHTML = `
            <div class="absolute top-0 left-0 w-1.5 h-full ${isSelected ? 'bg-emerald-600' : 'bg-emerald-500 opacity-0 group-hover:opacity-100'} transition-opacity rounded-l-2xl" ></div>
                ${selectionHtml}
        <div class="flex justify-between items-center gap-4">
            <div class="min-w-0 flex-1">
                <h4 class="font-black text-gray-800 text-sm truncate leading-tight">${inc.title}</h4>
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mt-0.5">${new Date(inc.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            <div class="flex items-center gap-3 shrink-0">
                <div class="text-xl font-black text-emerald-600 tracking-tighter">৳${inc.total.toLocaleString()}</div>
                ${menuHtml}
            </div>
        </div>
        `;
                container.appendChild(card);
            });

            document.getElementById('inc-stat-total').innerText = '৳' + total.toLocaleString();
            document.getElementById('inc-stat-month').innerText = '৳' + monthTotal.toLocaleString();
            document.getElementById('inc-stat-today').innerText = '৳' + todayTotal.toLocaleString();
            setTimeout(() => lucide.createIcons(), 10);
        }

        function toggleExpenseSelectionMode(id) {
            const sid = String(id);
            const index = selectedExpenseIds.map(String).indexOf(sid);
            if (index === -1) {
                selectedExpenseIds.push(sid);
            } else {
                selectedExpenseIds.splice(index, 1);
            }

            if (selectedExpenseIds.length === 0 && expenseSelectionMode) {
                toggleExpenseSelectionMode();
            } else {
                updateExpenseSelectionUI();
                renderExpenses();
            }
        }

        function updateExpenseSelectionUI() {
            const countEl = document.getElementById('exp-selection-count');
            if (countEl) {
                countEl.innerText = `${selectedExpenseIds.length} নির্বাচিত`;
            }
        }

        async function batchDeleteExpenses() {
            alert('batchDeleteExpenses triggered - Selection: ' + selectedExpenseIds.length);
            const count = selectedExpenseIds.length;
            if (count === 0) { showToast('কোনো ভাউচার নির্বাচিত নেই'); return; }

            if (await customConfirm(`আপনি কি নিশ্চিতভাবে এই ${count}টি ভাউচার মুছতে চান ? `)) {
                expenses = expenses.filter(exp => !selectedExpenseIds.some(sid => sid == exp.id));
                await ShadowStorage.save(STORAGE_KEYS.expenses, expenses);
                showToast(`${count}টি ভাউচার মুছে ফেলা হয়েছে`);
                toggleExpenseSelectionMode();
                if (typeof renderDashboard === 'function') renderDashboard();
            }
        }

        async function mergeExpenses() {
            alert('mergeExpenses triggered - Selection: ' + selectedExpenseIds.length);
            const count = selectedExpenseIds.length;
            if (count < 2) {
                showToast('মার্জ করতে কমপক্ষে ২টি ভাউচার নির্বাচন করুন');
                return;
            }

            if (await customConfirm(`আপনি কি নিশ্চিতভাবে এই ${count}টি ভাউচার একত্রিত(Merge) করতে চান ?\nএটি আগের ভাউচারগুলো মুছে একটি নতুন ভাউচার তৈরি করবে।`)) {
                const selectedOnes = expenses.filter(exp => selectedExpenseIds.some(sid => sid == exp.id));
                selectedOnes.sort((a, b) => new Date(b.date) - new Date(a.date));

                const mergedItems = [];
                let mergedTotal = 0;

                selectedOnes.forEach(exp => {
                    (exp.items || []).forEach(item => {
                        const amt = parseFloat(item.amount) || 0;
                        mergedItems.push({ desc: item.desc, amount: amt });
                        mergedTotal += amt;
                    });
                });

                const newVoucher = {
                    id: 'EXP-MERGED-' + Date.now(),
                    date: selectedOnes[0].date,
                    title: `একত্রিত ভাউচার(${count}টি)`,
                    items: mergedItems,
                    total: mergedTotal,
                    collector: selectedOnes[0].collector || 'Admin'
                };

                expenses = expenses.filter(exp => !selectedExpenseIds.includes(exp.id));
                expenses.push(newVoucher);

                await ShadowStorage.save(STORAGE_KEYS.expenses, expenses);
                showToast('ভাউচারগুলো সফলভাবে একত্রিত হয়েছে!');
                toggleExpenseSelectionMode();
                if (typeof renderDashboard === 'function') renderDashboard();
            }
        }

        function copyExpenseSummary() {
            // alert('copyExpenseSummary triggered');
            const selectedOnes = expenses.filter(exp => selectedExpenseIds.some(sid => sid == exp.id));
            if (selectedOnes.length === 0) { showToast('কোনো ভাউচার নির্বাচিত নেই'); return; }

            let text = "📋 *ব্যয় রিপোর্ট (Voucher Summary)*\n\n";
            selectedOnes.forEach((exp, idx) => {
                text += `${idx + 1}. * ${exp.title}* (${new Date(exp.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' })}) \n`;
                (exp.items || []).forEach(item => {
                    text += `   - ${item.desc}: ৳${item.amount.toLocaleString()} \n`;
                });
                text += `   * মোট: ৳${exp.total.toLocaleString()}*\n\n`;
            });

            const grandTotal = selectedOnes.reduce((acc, curr) => acc + curr.total, 0);
            text += `━━━━━━━━━━━━━━━━━\n`;
            text += `💰 * সর্বমোট: ৳${grandTotal.toLocaleString()}* `;

            const copyToClipboard = (str) => {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    return navigator.clipboard.writeText(str);
                } else {
                    // Fallback
                    return new Promise((resolve, reject) => {
                        try {
                            const textArea = document.createElement("textarea");
                            textArea.value = str;
                            textArea.style.position = "fixed";
                            textArea.style.left = "-9999px";
                            textArea.style.top = "0";
                            document.body.appendChild(textArea);
                            textArea.focus();
                            textArea.select();
                            const successful = document.execCommand('copy');
                            document.body.removeChild(textArea);
                            if (successful) resolve();
                            else reject(new Error('execCommand failed'));
                        } catch (err) {
                            reject(err);
                        }
                    });
                }
            };

            copyToClipboard(text).then(() => {
                showToast('রিপোর্ট ক্লিপবোর্ডে কপি করা হয়েছে!');
            }).catch(err => {
                console.error('Copy failed', err);
                showToast('কপি ব্যর্থ হয়েছে!');
            });
        }

        function batchShareExpenses(platform) {
            const selectedOnes = expenses.filter(exp => selectedExpenseIds.some(sid => sid == exp.id));
            if (selectedOnes.length === 0) return;

            let text = "📋 *ব্যয় রিপোর্ট*\n\n";
            selectedOnes.forEach((exp) => {
                text += `🔹 * ${exp.title}*: ৳${exp.total.toLocaleString()} \n`;
            });
            const grandTotal = selectedOnes.reduce((acc, curr) => acc + curr.total, 0);
            text += `━━━━━━━━━━━━\n💰 * সর্বমোট: ৳${grandTotal.toLocaleString()}* `;

            const encodedText = encodeURIComponent(text);
            if (platform === 'whatsapp') {
                window.open(`https://wa.me/?text=${encodedText}`);
            } else if (platform === 'sms') {
                window.open(`sms:?body=${encodedText}`);
            }
        }

        function batchPrintExpenses() {
            const selectedOnes = expenses.filter(exp => selectedExpenseIds.some(sid => sid == exp.id));
            if (selectedOnes.length === 0) return;

            const printWindow = window.open('', '_blank');
            if (!printWindow) {
                showToast('প্রিন্ট উইন্ডো ব্লক করা হয়েছে! পপআপ পারমিশন দিন।');
                return;
            }
            const grandTotal = selectedOnes.reduce((acc, curr) => acc + curr.total, 0);

            printWindow.document.write(`<html><head><title>Batch Expense Print</title>
                <style>
                    body { font-family: 'SolaimanLipi', 'Inter', sans-serif; padding: 20px; line-height: 1.6; }
                    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                    th { background-color: #f8f9fa; }
                    .total-row { font-weight: 900; background: #fdf2f2; }
                    .voucher-title { font-weight: bold; background: #fef2f2; padding: 5px 10px; border-left: 4px solid #e11d48; margin-top: 15px; }
                </style></head>
                <body>
                    <div class="header">
                        <div style="font-size: 24px; font-weight: 900;">${instituteInfo.name}</div>
                        <div style="font-size: 14px;">Batch Expense Report | Date: ${new Date().toLocaleDateString()}</div>
                    </div>
                    ${selectedOnes.map(exp => `
                        <div class="voucher-title">${exp.title} (${new Date(exp.date).toLocaleDateString()})</div>
                        <table>
                            <thead><tr><th>Description</th><th style="text-align: right;">Amount</th></tr></thead>
                            <tbody>
                                ${(exp.items || []).map(item => `<tr><td>${item.desc}</td><td style="text-align: right;">৳${item.amount.toLocaleString()}</td></tr>`).join('')}
                                <tr class="total-row"><td style="text-align: right;">Voucher Total:</td><td style="text-align: right;">৳${exp.total.toLocaleString()}</td></tr>
                            </tbody>
                        </table>
                    `).join('')}
                    <div style="margin-top: 30px; padding: 20px; border: 2px dashed #e11d48; text-align: right; border-radius: 15px;">
                        <span style="font-size: 20px; font-weight: 900; color: #e11d48;">Grand Total: ৳${grandTotal.toLocaleString()}</span>
                    </div>
                    <script>
                        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                        setTimeout(() => { 
                            window.print(); 
                            if (!isMobile) window.close(); 
                        }, 800);
                        window.addEventListener('afterprint', () => { window.close(); });
                    </` + `script>
                </body></html>`);
            printWindow.document.close();
        }

        // Single Action Helpers
        let currentViewedExpenseId = null;

        function copySingleExpense() {
            if (!currentViewedExpenseId) return;
            const exp = expenses.find(e => e.id == currentViewedExpenseId);
            if (!exp) return;

            let text = `📋 *ব্যয় ভাউচার*\n`;
            text += `*${exp.title}*\n`;
            text += `তারিখ: ${new Date(exp.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}\n`;
            text += `------------------\n`;
            (exp.items || []).forEach(item => {
                text += `${item.desc}: ৳${item.amount.toLocaleString()}\n`;
            });
            text += `------------------\n`;
            text += `💰 *মোট: ৳${exp.total.toLocaleString()}*`;

            const copyToClipboard = async (str) => {
                const execCommandFallback = (text) => {
                    return new Promise((resolve, reject) => {
                        try {
                            const textArea = document.createElement("textarea");
                            textArea.value = text;
                            textArea.style.position = "fixed";
                            textArea.style.left = "0";
                            textArea.style.top = "0";
                            textArea.style.opacity = "0";
                            textArea.style.pointerEvents = "none";
                            textArea.setAttribute("readonly", "");
                            document.body.appendChild(textArea);

                            textArea.focus();
                            textArea.select();

                            const successful = document.execCommand('copy');
                            document.body.removeChild(textArea);

                            if (successful) resolve();
                            else reject(new Error('Fallback: execCommand failed'));
                        } catch (err) {
                            reject(err);
                        }
                    });
                };

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    try {
                        await navigator.clipboard.writeText(str);
                        return;
                    } catch (err) {
                        console.warn('Clipboard API failed, trying fallback...', err);
                    }
                }

                return execCommandFallback(str);
            };

            copyToClipboard(text).then(() => showToast('ভাউচার কপি করা হয়েছে!'))
                .catch(() => showToast('কপি ব্যর্থ হয়েছে!'));
        }

        function shareSingleExpense() {
            if (!currentViewedExpenseId) return;
            const modal = document.getElementById('share-select-modal');
            if (modal) {
                modal.classList.remove('hidden');
                setTimeout(() => lucide.createIcons(), 10);
            }
        }

        function shareAction(platform) {
            if (!currentViewedExpenseId) return;
            const exp = expenses.find(e => e.id == currentViewedExpenseId);
            if (!exp) return;

            let text = `📋 *ব্যয় ভাউচার (Expense Voucher)*\n\n`;
            text += `*${exp.title}*\n`;
            text += `📅 তারিখ: ${new Date(exp.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}\n`;
            text += `🆔 আইডি: ${exp.id}\n`;
            text += `------------------\n`;
            (exp.items || []).forEach(item => {
                text += `• ${item.desc}: ৳${item.amount.toLocaleString()}\n`;
            });
            text += `------------------\n`;
            text += `💰 *সর্বমোট: ৳${exp.total.toLocaleString()}*`;
            const encoded = encodeURIComponent(text);

            if (platform === 'whatsapp') {
                window.open(`https://wa.me/?text=${encoded}`, '_blank');
            } else if (platform === 'sms') {
                window.open(`sms:?body=${encoded}`, '_blank');
            }

            closeModal('share-select-modal');
        }

        function openExpenseDetails(id) {
            console.log('Opening details for ID:', id);
            currentViewedExpenseId = id; // Store for modal actions

            // Use == for type-flexible comparison (string vs number)
            const exp = (expenses || []).find(e => e.id == id);

            if (!exp) {
                console.error('Expense not found for ID:', id);
                showToast('দুঃখিত, ভাউচার পাওয়া যায়নি!');
                return;
            }

            console.log('Found expense:', exp);

            const modal = document.getElementById('expense-details-modal');
            if (!modal) {
                console.error('Modal element not found!');
                return;
            }

            // Populate data
            document.getElementById('det-exp-title').innerText = exp.title || 'Untitled';
            document.getElementById('det-exp-date').innerText = exp.date ? new Date(exp.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }) : 'অজানা তারিখ';
            document.getElementById('det-exp-id').innerText = exp.id || 'N/A';

            const listContainer = document.getElementById('det-exp-items');
            if (listContainer) {
                listContainer.innerHTML = (exp.items || []).map((item, idx) => `
                    <div class="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 transition-colors rounded-lg">
                        <div class="flex items-center gap-3">
                            <span class="w-6 h-6 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center text-[10px] font-black">${idx + 1}</span>
                            <span class="text-sm font-bold text-gray-700">${item.desc}</span>
                        </div>
                        <span class="text-sm font-black text-gray-900 tracking-tight">৳${(item.amount || 0).toLocaleString()}</span>
                    </div>
                `).join('');
            }

            document.getElementById('det-exp-total').innerText = '৳' + (exp.total || 0).toLocaleString();

            // Set print button action
            const printBtn = modal.querySelector('button[onclick*="printExpenseVoucher"]');
            if (printBtn) {
                printBtn.setAttribute('onclick', `printExpenseVoucher('${exp.id}')`);
            }

            // Refresh icons
            if (typeof lucide !== 'undefined') {
                setTimeout(() => lucide.createIcons(), 10);
            }

            // Open modal
            openModal('expense-details-modal');
        }

        async function deleteExpense(id) {
            if (await customConfirm('আপনি কি নিশ্চিতভাবে এই ভাউচারটি মুছতে চান?')) {
                expenses = expenses.filter(e => e.id !== id);
                await ShadowStorage.save(STORAGE_KEYS.expenses, expenses);
                renderExpenses();
                if (typeof renderDashboard === 'function') renderDashboard();
                showToast('ভাউচার মুছে ফেলা হয়েছে');
            }
        }


        function getVoucherCSS() {
            return `
                <style>
                    /* Screen Preview Styles */
                    @media screen {
                        html { background: #f0f0f0; display: flex; justify-content: center; }
                        body { 
                            font-family: 'SolaimanLipi', sans-serif; 
                            width: 210mm; 
                            background: white; 
                            margin: 20px auto; 
                            padding: 40px;
                            zoom: 0.75; 
                            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                        }
                        .page-break {
                            border-bottom: 2px dashed #ccc;
                            margin: 40px 0;
                            padding-bottom: 20px;
                            position: relative;
                        }
                        .page-break::after {
                            content: '✂ Cut / Page Break';
                            position: absolute;
                            right: 0;
                            bottom: -10px;
                            font-size: 10px;
                            color: #999;
                            background: white;
                            padding-left: 5px;
                        }
                    }
                    /* Print Styles */
                    @media print { 
                        body { width: auto; zoom: 1; padding: 0; margin: 0; box-shadow: none; } 
                        html { background: white; display: block; }
                        .page-break { 
                            border: none; 
                            margin: 0; 
                            padding: 0; 
                            height: 0; 
                            page-break-after: always; /* Legacy */
                            break-after: page; /* Modern */
                            display: block;
                        }
                        .page-break::after { content: none; }
                        .voucher-container { page-break-inside: avoid; break-inside: avoid; }
                    }

                    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                    .title { font-size: 18px; font-weight: bold; text-transform: uppercase; margin-top: 10px; }
                    .voucher-info { display: flex; justify-content: space-between; margin-bottom: 30px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                    th { background: #f9f9f9; font-weight: bold; }
                    .footer { margin-top: 80px; display: flex; justify-content: space-between; }
                    .sig { border-top: 1px solid #333; width: 200px; text-align: center; padding-top: 5px; }
                    .total-row { font-weight: bold; font-size: 18px; }
                </style>`;
        }

        function getVoucherContent(exp) {
            let voucherType = "Expense Voucher";
            if (exp.id.startsWith('INC')) voucherType = "Income Voucher";
            if (exp.id.startsWith('REP')) voucherType = "Financial Report";

            return `
                <div class="voucher-container">
                    <div class="header">
                        <div style="font-size: 28px; font-weight: 900;">${instituteInfo.name}</div>
                        <div style="font-size: 14px;">${instituteInfo.address}</div>
                        <div class="title">${voucherType}</div>
                    </div>
                    <div class="voucher-info">
                        <div><strong>ID:</strong> ${exp.id}<br><strong>Title:</strong> ${exp.title}</div>
                        <div style="text-align: right;"><strong>Date:</strong> ${new Date(exp.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    </div>
                    <table><thead><tr><th>Description</th><th style="text-align: right;">Amount</th></tr></thead>
                    <tbody>${exp.items.map(item => `<tr><td>${item.desc}</td><td style="text-align: right;">৳${item.amount.toLocaleString()}</td></tr>`).join('')}
                    <tr class="total-row"><td style="text-align: right;">Grand Total:</td><td style="text-align: right;">৳${exp.total.toLocaleString()}</td></tr></tbody>
                    </table>
                    <div class="footer"><div class="sig">Receiver's Signature</div><div class="sig">Authorized Signature</div></div>
                </div>`;
        }

        function generateVoucherHTML(exp) {
            return `<html><head><title>Voucher - ${exp.id}</title><link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">${getVoucherCSS()}</head><body>${getVoucherContent(exp)}</body></html>`;
        }

        function printFinancialReport() {
            const { start, end } = getDashboardDateRange();
            
            const filteredIncomes = (incomes || []).filter(inc => {
                const d = new Date(inc.date || 0);
                return d >= start && d <= end;
            });
            const filteredExpenses = (expenses || []).filter(exp => {
                const d = new Date(exp.date || 0);
                return d >= start && d <= end;
            });

            const totalIncome = filteredIncomes.reduce((sum, inc) => sum + inc.total, 0);
            const totalExpense = filteredExpenses.reduce((sum, exp) => sum + exp.total, 0);
            const netBalance = totalIncome - totalExpense;

            let periodStr = 'সকল সময়';
            if (start.getTime() > 0) {
                const startStr = start.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' });
                const endStr = end.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' });
                periodStr = startStr + ' - ' + endStr;
            }

            const reportExp = {
                id: 'REP-' + Date.now().toString().slice(-6),
                title: 'আয়-ব্যয় রিপোর্ট (' + periodStr + ')',
                date: new Date().toISOString(),
                total: netBalance,
                items: [
                    { desc: 'সর্বমোট আয় (Total Income)', amount: totalIncome },
                    { desc: 'সর্বমোট ব্যয় (Total Expense)', amount: -totalExpense }
                ]
            };

            const fullContent = `<html><head><title>Financial Report</title><link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">${getVoucherCSS()}</head><body>${getVoucherContent(reportExp)}</body></html>`;

            const container = document.getElementById('print-preview-content');
            if (container) {
                container.style.height = 'auto';
                container.innerHTML = `<iframe id="print-preview-frame" style="width:100%; min-height: 400px; border:none; overflow:hidden;" scrolling="no"></iframe>`;
                const frame = document.getElementById('print-preview-frame');
                const doc = frame.contentWindow.document;
                doc.open();
                doc.write(fullContent);
                doc.close();

                frame.onload = function () {
                    const height = frame.contentWindow.document.body.scrollHeight;
                    frame.style.height = (height + 50) + 'px';
                };
                setTimeout(() => {
                    if (frame.contentWindow && frame.contentWindow.document.body) {
                        const height = frame.contentWindow.document.body.scrollHeight;
                        frame.style.height = (height + 50) + 'px';
                    }
                }, 500);
            }
            openModal('print-preview-modal');
        }

        function printAllExpensesHistory() {
            if (!expenses || expenses.length === 0) {
                if (typeof showToast === 'function') showToast('প্রিন্ট করার মতো কোনো খরচ নেই');
                else alert('প্রিন্ট করার মতো কোনো খরচ নেই');
                return;
            }

            const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Build items array
            const masterItems = sortedExpenses.map(exp => {
                const dateStr = new Date(exp.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' });
                return {
                    desc: dateStr + ' - ' + exp.title,
                    amount: exp.total
                };
            });
            
            const totalAmount = sortedExpenses.reduce((sum, exp) => sum + exp.total, 0);
            
            const masterExp = {
                id: 'ALL-' + Date.now().toString().slice(-6),
                title: 'সকল খরচের ভাউচার',
                date: new Date().toISOString(),
                total: totalAmount,
                items: masterItems
            };

            const fullContent = `<html><head><title>All Expenses Voucher</title><link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">${getVoucherCSS()}</head><body>${getVoucherContent(masterExp)}</body></html>`;

            const container = document.getElementById('print-preview-content');
            if (container) {
                container.style.height = 'auto';
                container.innerHTML = `<iframe id="print-preview-frame" style="width:100%; min-height: 400px; border:none; overflow:hidden;" scrolling="no"></iframe>`;
                const frame = document.getElementById('print-preview-frame');
                const doc = frame.contentWindow.document;
                doc.open();
                doc.write(fullContent);
                doc.close();

                frame.onload = function () {
                    const height = frame.contentWindow.document.body.scrollHeight;
                    frame.style.height = (height + 50) + 'px';
                };
                setTimeout(() => {
                    if (frame.contentWindow && frame.contentWindow.document.body) {
                        const height = frame.contentWindow.document.body.scrollHeight;
                        frame.style.height = (height + 50) + 'px';
                    }
                }, 500);
            }
            openModal('print-preview-modal');
        }

        function printAllIncomesHistory() {
            if (!incomes || incomes.length === 0) {
                if (typeof showToast === 'function') showToast('প্রিন্ট করার মতো কোনো আয় নেই');
                else alert('প্রিন্ট করার মতো কোনো আয় নেই');
                return;
            }

            const sortedIncomes = [...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));
            
            const masterItems = sortedIncomes.map(inc => {
                const dateStr = new Date(inc.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' });
                return {
                    desc: dateStr + ' - ' + inc.title,
                    amount: inc.total
                };
            });
            
            const totalAmount = sortedIncomes.reduce((sum, inc) => sum + inc.total, 0);
            
            const masterInc = {
                id: 'INC-ALL-' + Date.now().toString().slice(-6),
                title: 'সকল আয়ের ভাউচার',
                date: new Date().toISOString(),
                total: totalAmount,
                items: masterItems
            };

            const fullContent = `<html><head><title>All Incomes Voucher</title><link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">${getVoucherCSS()}</head><body>${getVoucherContent(masterInc)}</body></html>`;

            const container = document.getElementById('print-preview-content');
            if (container) {
                container.style.height = 'auto';
                container.innerHTML = `<iframe id="print-preview-frame" style="width:100%; min-height: 400px; border:none; overflow:hidden;" scrolling="no"></iframe>`;
                const frame = document.getElementById('print-preview-frame');
                const doc = frame.contentWindow.document;
                doc.open();
                doc.write(fullContent);
                doc.close();

                frame.onload = function () {
                    const height = frame.contentWindow.document.body.scrollHeight;
                    frame.style.height = (height + 50) + 'px';
                };
                setTimeout(() => {
                    if (frame.contentWindow && frame.contentWindow.document.body) {
                        const height = frame.contentWindow.document.body.scrollHeight;
                        frame.style.height = (height + 50) + 'px';
                    }
                }, 500);
            }
            openModal('print-preview-modal');
        }

        function batchPrintExpenses() {
            const selectedOnes = expenses.filter(exp => selectedExpenseIds.some(sid => sid == exp.id));
            if (selectedOnes.length === 0) {
                showToast('কোনো ভাউচার নির্বাচিত নেই');
                return;
            }

            let fullContent = `<html><head><title>Batch Print</title><link href="https://fonts.maateen.me/solaiman-lipi/font.css" rel="stylesheet">${getVoucherCSS()}</head><body>`;

            selectedOnes.forEach((exp, index) => {
                fullContent += getVoucherContent(exp);
                // Add page break for all except the very last one
                if (index < selectedOnes.length - 1) {
                    fullContent += `<div class="page-break"></div>`;
                }
            });

            fullContent += `</body></html>`;

            const container = document.getElementById('print-preview-content');
            if (container) {
                // Reset container height to allow auto-growth
                container.style.height = 'auto';
                container.innerHTML = `<iframe id="print-preview-frame" style="width:100%; min-height: 400px; border:none; overflow:hidden;" scrolling="no"></iframe>`;
                const frame = document.getElementById('print-preview-frame');
                const doc = frame.contentWindow.document;
                doc.open();
                doc.write(fullContent);
                doc.close();

                // Auto-resize iframe to fit content
                frame.onload = function () {
                    const height = frame.contentWindow.document.body.scrollHeight;
                    frame.style.height = (height + 50) + 'px';
                };
                // Fallback resize
                setTimeout(() => {
                    if (frame.contentWindow && frame.contentWindow.document.body) {
                        const height = frame.contentWindow.document.body.scrollHeight;
                        frame.style.height = (height + 50) + 'px';
                    }
                }, 500);
            }

            openModal('print-preview-modal');
        }
        function printExpenseVoucher(id) {
            const targetId = id || currentViewedExpenseId;
            const exp = expenses.find(e => e.id == targetId);
            if (!exp) return;

            const htmlContent = generateVoucherHTML(exp);

            // Inject into preview modal (iframe logic could also be used, but simplified here for visual check)
            // We use an iframe in the modal to ensure styles don't bleed and it looks exactly like print
            const container = document.getElementById('print-preview-content');
            if (container) {
                container.style.height = 'auto'; // Reset explicit height
                container.innerHTML = `<iframe id="print-preview-frame" style="width:100%; min-height: 400px; border:none; overflow:hidden;" scrolling="no"></iframe>`;
                const frame = document.getElementById('print-preview-frame');
                const doc = frame.contentWindow.document;
                doc.open();
                doc.write(htmlContent);
                doc.close();

                // Auto-resize logic
                frame.onload = function () {
                    frame.style.height = (frame.contentWindow.document.body.scrollHeight + 50) + 'px';
                };
                setTimeout(() => {
                    if (frame.contentWindow && frame.contentWindow.document.body) {
                        frame.style.height = (frame.contentWindow.document.body.scrollHeight + 50) + 'px';
                    }
                }, 300);
            }

            openModal('print-preview-modal');
        }

        function confirmPrint() {
            const frame = document.getElementById('print-preview-frame');
            if (frame) {
                frame.contentWindow.print();
                // Optional: close modal after print init
                // closeModal('print-preview-modal'); 
            }
        }



        function handleClassChange() { const cls = document.getElementById('inp-class').value; }

        function hideFixedField(fieldId) {
            const container = document.getElementById(`field-container-${fieldId}`);
            if (container) { container.classList.add('hidden'); const input = container.querySelector('input, textarea'); if (input) input.value = ''; }
        }

        function previewFile(input, previewId) {
            const file = input.files[0], preview = document.getElementById(previewId);
            if (file && preview) {
                const reader = new FileReader();
                reader.onload = function (e) { preview.src = e.target.result; preview.classList.remove('hidden'); const icon = preview.nextElementSibling; if (icon) icon.classList.add('hidden'); }
                reader.readAsDataURL(file);
            }
        }

        // --- RESTORED PRINT & REPORT FUNCTIONS (FROM V2.1) ---

        function convertNumberToBanglaWords(amount) {
            const numbers = ['শূন্য', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়'];
            const words = ['', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়', 'দশ', 'এগারো', 'বারো', 'তেরো', 'চৌদ্দ', 'পনেরো', 'ষোল', 'সতেরো', 'আঠারো', 'উনিশ', 'বিশ', 'একুশ', 'বাইশ', 'তেইশ', 'চব্বিশ', 'পঁচিশ', 'ছাব্বিশ', 'সাতাশ', 'আঠাশ', 'ঊনত্রিশ', 'ত্রিশ', 'একত্রিশ', 'বত্রিশ', 'তেত্রিশ', 'চৌত্রিশ', 'পঁয়ত্রিশ', 'ছত্রিশ', 'সাইত্রিশ', 'আটত্রিশ', 'ঊনচল্লিশ', 'চল্লিশ', 'একচল্লিশ', 'বিয়াল্লিশ', 'তেতাল্লিশ', 'চুয়াল্লিশ', 'পঁয়তাল্লিশ', 'ছেচল্লিশ', 'সাতচল্লিশ', 'আটচল্লিশ', 'ঊনপঞ্চাশ', 'পঞ্চাশ', 'একান্ন', 'বায়ান্ন', 'তিপ্পান্ন', 'চুচান্ন', 'পঞ্চান্ন', 'ছাপ্পান্ন', 'সাতান্ন', 'আটান্ন', 'ঊনষাট', 'ষাট', 'একষট্টি', 'বাষট্টি', 'তেষট্টি', 'চৌষট্টি', 'পঁয়ষট্টি', 'ছেষট্টি', 'সাতষট্টি', 'আটষট্টি', 'ঊনসত্তর', 'সত্তর', 'একাত্তর', 'বাহাত্তর', 'তিয়াত্তর', 'চুয়াত্তর', 'পঁচাত্তর', 'ছিয়াত্তর', 'সাতাত্তর', 'আটাত্তর', 'ঊনআশি', 'আশি', 'একাশি', 'বিরাশি', 'তিরাশি', 'চুরাশি', 'পঁচাশি', 'ছিয়াশি', 'সাতাশি', 'আটাশি', 'ঊননব্বই', 'নব্বই', 'একানব্বই', 'বিরানব্বই', 'তিরানব্বই', 'চুরানব্বই', 'পঁচানব্বই', 'ছিয়ানব্বই', 'সাতানব্বই', 'আটানব্বই', 'নিরানব্বই'];

            if (amount === 0) return 'শূন্য';
            const amountStr = amount.toString();
            const parts = amountStr.split('.');
            let integerPart = parseInt(parts[0]);
            let decimalPart = parts.length > 1 ? parseInt(parts[1].substring(0, 2)) : 0;

            function numToWords(n) {
                if (n < 100) return words[n];
                if (n < 1000) return words[Math.floor(n / 100)] + 'শ ' + (n % 100 !== 0 ? numToWords(n % 100) : '');
                if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' হাজার ' + (n % 1000 !== 0 ? numToWords(n % 1000) : '');
                if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' লক্ষ ' + (n % 100000 !== 0 ? numToWords(n % 100000) : '');
                return numToWords(Math.floor(n / 10000000)) + ' কোটি ' + (n % 10000000 !== 0 ? numToWords(n % 10000000) : '');
            }

            let result = numToWords(integerPart);
            if (decimalPart > 0) {
                result += ' দশমিক ' + numToWords(decimalPart);
            }
            return result;
        }

        function getInstituteLogo() {
            return instituteInfo.logo || '';
        }

        function generateIndivDueReportHTML(student) {
            const financials = calculateStudentFinancials(student);
            const displayId = student.id || student.uid;

            // Unified Photo Logic
            const photoSrc = getStudentPhoto(student);
            const initial = (student.name || '?').charAt(0).toUpperCase();
            const photoHtml = `
                <div style="width: 55px; height: 55px; border-radius: 8px; background: #f9fafb; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; color: #9ca3af; font-weight: 700; font-size: 22px; position: relative; overflow: hidden;">
                    <img src="${photoSrc}" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 10;" onerror="handlePhotoError(this, '${student.id}', '${(student.name || '').replace(/'/g, "\\'")}')">
                    <span style="position: relative; z-index: 0;">${initial}</span>
                </div>`;

            return `
                <div class="p-8 bg-white w-full max-w-4xl mx-auto shadow-sm" style="min-height: 297mm; box-sizing: border-box;">
                    ${getInstituteHeader('বকেয়া রিপোর্ট (Due Report)', true)}
                    
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; font-size: 13px;">
                        <div style="line-height: 1.7; flex: 1;">
                            <div><strong style="color: #000; width: 60px; display: inline-block;">মোবাইল:</strong> ${student.mobile || '--'}</div>
                        </div>
                        <div style="flex: 1.2; display: flex; gap: 15px; justify-content: flex-end; align-items: center;">
                            <div style="text-align: right; line-height: 1.5;">
                                <div style="font-weight: 800; font-size: 18px; color: #000; margin-bottom: 2px;">${student.name}</div>
                                <div style="color: #000;">আইডি: <strong>${displayId}</strong></div>
                                <div style="color: #000; font-size: 12px; margin-top: 2px;">ক্লাস: ${student.class} | রোল: ${student.roll || '--'}</div>
                            </div>
                            ${photoHtml}
                        </div>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                        <thead>
                            <tr style="background-color: #fff; border: 1px solid #000;">
                                <th style="padding: 10px; text-align: left; font-weight: 900; border: 1px solid #000; color: #000;">বিবরণ (Description)</th>
                                <th style="padding: 10px; text-align: right; width: 120px; font-weight: 900; border: 1px solid #000; color: #000;">বকেয়া (Amount)</th>
                            </tr>
                        </thead>
                        <tbody>
                             ${(() => {
                    // Filter: Only show fee types that have a net balance > 0
                    const dueItems = financials.details.filter(f => f.balance > 0);

                    if (financials.balance <= 0 || dueItems.length === 0) {
                        return '<tr><td colspan="2" style="padding: 30px; text-align: center; color: #059669; font-weight: 800; font-size: 16px; border: 1px solid #000;">✅ কোনো বকেয়া নেই (No Dues)</td></tr>';
                    }

                    return dueItems.map(item => {
                        const cashPaid = item.paid - item.waiver;
                        const grossBalance = item.total - cashPaid; // Balance before waiver

                        return `
									<tr>
										<td style="padding: 10px; border: 1px solid #000; color: #000;">
											<div style="font-weight: 700; color: #000; margin-bottom: 2px;">${item.name}</div>
											<div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">
												${item.unpaidItems ? item.unpaidItems.filter(d => (d.amount - (d.waiver || 0)) > 0).map(d => {
                            const subWaiver = d.waiver || 0;
                            const subBalance = Math.max(0, (d.amount || 0) - subWaiver);
                            const subAmountHtml = (subWaiver > 0)
                                ? `<span style="text-decoration: line-through; opacity: 0.6; margin-right: 4px;">৳${d.amount.toLocaleString()}</span>৳${subBalance.toLocaleString()}`
                                : `৳${d.amount ? d.amount.toLocaleString() : ''}`;
                            return `<span style="display: inline-block; background-color: #f3f4f6; border: 1px solid #e5e7eb; color: #4b5563; padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 700;">${d.label}${d.amount ? (': ' + subAmountHtml) : ''}</span>`;
                        }).join('') : ''}
												${item.partialItems ? item.partialItems.filter(d => d.remaining > 0).map(d => {
                            const amountHtml = (d.waiver && d.waiver > 0)
                                ? `<span style="text-decoration: line-through; opacity: 0.5; margin-right: 4px;">৳${d.totalRate.toLocaleString()}</span>৳${d.remaining.toLocaleString()}`
                                : `৳${d.remaining.toLocaleString()}`;
                            const paidInfo = d.paid > 0 ? `জমা: ৳${d.paid.toLocaleString()}, ` : '';
                            return `<span style="display: inline-block; background-color: #fef2f2; border: 1px solid #fee2e2; color: #991b1b; padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 700;">${d.label}: ${paidInfo}বকেয়া: ${amountHtml}</span>`;
                        }).join('') : ''}
											</div>
										</td>
										<td style="padding: 10px; border: 1px solid #000; text-align: right; font-weight: 700; color: #dc2626; vertical-align: top;">
											${item.waiver > 0 ? `<div style="text-decoration: line-through; opacity: 0.5; font-size: 11px; margin-bottom: 2px;">৳${grossBalance.toLocaleString()}</div>` : ''}
											৳${item.balance.toLocaleString()}
										</td>
									</tr>`}).join('') + `
                        </tbody>
                        <tfoot>
                            <tr style="background: #fff;">
                                <td style="padding: 10px; text-align: right; font-weight: 900; border: 1px solid #000; color: #000;">মোট বকেয়া (Total Due)</td>
                                <td style="padding: 10px; text-align: right; font-weight: 900; font-size: 16px; border: 1px solid #000; color: #dc2626;">৳${financials.balance.toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>
                    
                    <div style="font-size: 12px; font-weight: 700; color: #000; margin-bottom: 40px; font-style: italic;">কথায়: ${convertNumberToBanglaWords(financials.balance)} টাকা মাত্র।</div>
                    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                        <div style="text-align: center; width: 150px;"><div style="height: 40px;"></div><div style="border-top: 1.5px solid #111; padding-top: 5px; font-size: 12px; font-weight: 700;">হিসাবরক্ষকের স্বাক্ষর</div></div>
                        <div style="text-align: center; width: 150px;"><div style="height: 40px;"></div><div style="border-top: 1.5px solid #111; padding-top: 5px; font-size: 12px; font-weight: 700;">কর্তৃপক্ষের স্বাক্ষর</div></div>
                    </div>
                                `;
                })()}
                </div>
            `;
        }

        function generateDueReportText(student) {
            const financials = calculateStudentFinancials(student);
            const displayId = student.id || student.uid;
            const instituteName = instituteInfo.name || 'Institute';
            const date = new Date().toLocaleDateString('bn-BD');

            let text = `বকেয়া রিপোর্ট (Due Report)\n`;
            text += `${instituteName}\n`;
            text += `================\n`;
            text += `আইডি: ${displayId}\n`;
            text += `শিক্ষার্থী: ${student.name}\n`;
            text += `ক্লাস: ${student.class}\n`;
            if (student.roll && student.roll !== 'N/A' && student.roll !== '--') {
                text += `রোল: ${student.roll}\n`;
            }
            text += `তারিখ: ${date}\n`;
            text += `মোট বকেয়া: ৳${financials.balance.toLocaleString()}\n`;
            text += `_________________\n`;

            if (financials.balance <= 0) {
                text += ` কোনো বকেয়া নেই (No Dues)\n`;
            } else {
                text += `বিবরণ (Details):\n`;
                financials.details.filter(f => f.balance > 0).forEach(item => {
                    text += `   • ${item.name}: ৳${item.balance.toLocaleString()}\n`;
                });
            }

            text += `\nঅনুগ্রহ করে বকেয়া পরিশোধ করুন।\nধন্যবাদ।`;
            return text;
        }

        function printStudentFeeReport(uid) {
            const student = students.find(s => s.uid === uid);
            if (!student) return;

            // Generate visuals
            document.getElementById('receipt-print-content').innerHTML = generateIndivDueReportHTML(student);

            // Generate SMS text
            const smsText = generateDueReportText(student);
            const smsArea = document.getElementById('receipt-sms-text');
            if (smsArea) smsArea.value = smsText;

            // Store mobile for sharing
            window.lastModalMobile = student.mobile || '';

            document.getElementById('receipt-preview-modal').classList.remove('hidden');
            switchReceiptTab('visual');

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }


        function generatePaymentText(t) {
            const date = new Date(t.date).toLocaleDateString('bn-BD');
            const instituteName = instituteInfo.name || 'Class Connect Academy';

            // Stylish Template
            let text = `* পেমেন্ট রসিদ *\n`;
            text += ` ${instituteName} \n`;
            text += `--------------------\n`;

            // Get correct Student ID (User facing ID)
            const studentObj = students.find(s => s.uid === t.uid);
            const displayId = studentObj && studentObj.id ? studentObj.id : t.uid;

            text += ` শিক্ষার্থী: ${t.studentName} \n`;
            text += ` আইডি: ${displayId} \n`;
            text += ` তারিখ: ${date} \n`;
            text += `--------------------\n`;
            text += ` জমা: ৳${t.finalAmount !== undefined ? t.finalAmount : t.amount} \n`;

            // Add Fee Details (Allocation)
            const details = t.finalDetails || t.allocation;
            if (details && details.length > 0) { // Check if array (allocation is array)
                // If it's the old structure (direct array)
                text += ` খাতসমূহ: \n`;
                details.forEach(item => {
                    text += `   - ${item.name}: ৳${item.amount} \n`;
                });
            } else if (details && details.allocated) { // If it's the new structure (object)
                text += ` খাতসমূহ: \n`;
                details.allocated.forEach(item => {
                    text += `   - ${item.description}: ৳${item.amount} \n`;
                });
                if (details.wallet > 0) {
                    text += `   - ওয়ালেট: ৳${details.wallet} \n`;
                }
            }

            if (t.remainingDue !== undefined && t.remainingDue > 0) {
                text += ` বকেয়া: ৳${t.remainingDue} \n`;
            }

            text += ` TrxID: ${t.id} \n`;
            text += `--------------------\n`;
            text += ` পেমেন্ট সফল হয়েছে। ধন্যবাদ!`;
            return text;
        }

        function renderSidePanelSuccess(t) {
            const container = document.getElementById('desktop-fee-panel-container');
            if (!container) return;

            // Use t.finalAmount if set, else t.amount
            const displayAmount = t.finalAmount !== undefined ? t.finalAmount : t.amount;
            const receiptText = generatePaymentText(t);

            container.innerHTML = `
                        <div class="h-full flex flex-col relative w-full animated fade-in-up" >
                    <div class="flex-1 flex flex-col items-center p-6 space-y-4 overflow-y-auto">
                        <div class="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-200 shrink-0">
                            <i data-lucide="check" class="w-8 h-8"></i>
                        </div>
                        
                        <div class="text-center">
                            <h2 class="text-xl font-bold text-gray-800">পেমেন্ট সফল হয়েছে!</h2>
                            <p class="text-3xl font-bold text-gray-800 my-2">৳${displayAmount}</p>
                            <span class="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                TrxID: ${t.id}
                            </span>
                        </div>

                        <!-- Editable Receipt Text Area -->
                        <div class="w-full bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div class="flex justify-between items-center mb-2">
                                <label class="text-xs font-bold text-gray-500 uppercase">রশিদ টেক্সট (এডিট করা যাবে)</label>
                                <button onclick="copyTextFromElement('desktop-receipt-text')" class="text-indigo-600 hover:text-indigo-800 text-xs font-bold flex items-center gap-1">
                                    <i data-lucide="copy" class="w-3 h-3"></i> কপি
                                </button>
                            </div>
                            <textarea id="desktop-receipt-text" class="w-full h-32 text-xs font-mono p-2 border rounded bg-white focus:ring-1 focus:ring-indigo-500 outline-none text-gray-700 resize-none">${receiptText}</textarea>
                        </div>
                    </div>

                    <div class="p-4 border-t bg-white shrink-0 space-y-3">
                            <button onclick="printMoneyReceipt()" class="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition shadow-lg flex items-center justify-center gap-2">
                            <i data-lucide="printer" class="w-4 h-4"></i> রশিদ প্রিন্ট করুন
                        </button>
                        
                            <button onclick="openStudentFeeDetails('${t.uid}')" class="w-full py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition">
                            বন্ধ করুন
                        </button>
                    </div>
                </div>
                        `;
            lucide.createIcons();
        }


        // --- Receipt Modal Helper Functions ---
        function switchReceiptTab(tabName) {
            // Hide all tabs
            const tabs = ['visual', 'text', 'details'];
            tabs.forEach(t => {
                const tabEl = document.getElementById(`receipt-tab-${t}`);
                const btnEl = document.getElementById(`btn-receipt-${t}`);
                if (tabEl) tabEl.classList.add('hidden');
                if (btnEl) {
                    btnEl.classList.remove('border-indigo-600', 'text-indigo-600', 'bg-indigo-50/50');
                    btnEl.classList.add('border-transparent', 'text-gray-500');
                }
            });

            // Show selected tab
            const selectedTab = document.getElementById(`receipt-tab-${tabName}`);
            if (selectedTab) selectedTab.classList.remove('hidden');

            // Activate button
            const selectedBtn = document.getElementById(`btn-receipt-${tabName}`);
            if (selectedBtn) {
                selectedBtn.classList.remove('border-transparent', 'text-gray-500');
                selectedBtn.classList.add('border-indigo-600', 'text-indigo-600', 'bg-indigo-50/50');
            }
        }

        function shareMoneyReceipt() {
            sendDirectSMS();
        }

        function shareMoneyReceiptWhatsApp() {
            sendDirectWhatsApp();
        }

        function downloadReceiptAsImage() {
            const element = document.getElementById('receipt-print-content');
            if (typeof html2canvas !== 'undefined' && element) {
                html2canvas(element).then(canvas => {
                    const link = document.createElement('a');
                    link.download = `Receipt_${new Date().getTime()}.png`;
                    link.href = canvas.toDataURL();
                    link.click();
                }).catch(err => {
                    console.error(err);
                    if (typeof showToast === 'function') showToast('ছবি জেনারেট করতে সমস্যা হয়েছে');
                });
            } else {
                if (typeof showToast === 'function') showToast('ছবি ডাউনলোড সম্ভব হচ্ছে না (html2canvas missing)');
                else alert('ছবি ডাউনলোড সম্ভব হচ্ছে না');
            }
        }

        (async function init() {
            // 1. Restore from ShadowStorage (IndexedDB) if LocalStorage is empty
            const wasRestored = await ShadowStorage.restore();
            if (wasRestored) {
                students = JSON.parse(localStorage.getItem(STORAGE_KEYS.students)) || [];
                classes = JSON.parse(localStorage.getItem(STORAGE_KEYS.classes)) || [];
                if (classes.length === 0) {
                    classes = ['হেফজ হাফেজ', 'হাফেজ', 'নাজেরা', 'মক্তব'];
                    localStorage.setItem(STORAGE_KEYS.classes, JSON.stringify(classes));
                }
                activeFormFields = JSON.parse(localStorage.getItem(STORAGE_KEYS.customFields)) || [];
                customFields = activeFormFields;
                hiddenFixedFields = JSON.parse(localStorage.getItem(STORAGE_KEYS.hiddenFixedFields)) || [];
                feeTypes = JSON.parse(localStorage.getItem(STORAGE_KEYS.feeTypes)) || [];
                feePayments = JSON.parse(localStorage.getItem(STORAGE_KEYS.feePayments)) || [];
                try {
                    expenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.expenses)) || [];
                    incomes = JSON.parse(localStorage.getItem(STORAGE_KEYS.incomes)) || [];
                    expenseTypes = JSON.parse(localStorage.getItem(STORAGE_KEYS.expenseTypes)) || [];
                    incomeTypes = JSON.parse(localStorage.getItem(STORAGE_KEYS.incomeTypes)) || [];
                } catch (e) {
                    console.error('Error re-initializing financial data:', e);
                    expenses = [];
                    incomes = [];
                }
                instituteInfo = JSON.parse(localStorage.getItem(STORAGE_KEYS.instituteInfo)) || instituteInfo;
                const savedSort = localStorage.getItem(STORAGE_KEYS.sortConfig);
                if (savedSort) window.studentSortConfig = JSON.parse(savedSort);
            }

            // 2. Perform any necessary migrations
            await ShadowStorage.migrate();

            // 3. Sync classes with student data (preserving manual order)
            await syncClasses();

            // 4. Core UI Renders
            if (typeof renderClassFilters === 'function') renderClassFilters();
            if (typeof renderStudents === 'function') renderStudents();
            if (typeof updateMobileNavActiveState === 'function') updateMobileNavActiveState('nav-students');

            // 5. Initialize listeners and minor UI components
            initDraftListeners();
            if (typeof setupSearch === 'function') setupSearch();
            if (typeof updateClassSuggestions === 'function') updateClassSuggestions();
            if (typeof closeSidebar === 'function') closeSidebar();

            const searchInput = document.getElementById('search-input');
            if (searchInput && typeof renderStudents === 'function') searchInput.addEventListener('input', renderStudents);

            const countEl = document.querySelector('header p');
            if (countEl && typeof students !== 'undefined') countEl.textContent = `মোট ${students.length} জন শিক্ষার্থী`;

            if (typeof lucide !== 'undefined') lucide.createIcons();
            if (typeof cleanupTrash === 'function') cleanupTrash();
            if (typeof renderReportCustomFields === 'function') renderReportCustomFields();

            // Global Key Events
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const overlays = [
                        { id: 'payment-confirmation-modal', close: closePaymentModal },
                        { id: 'adv-filter-menu', close: toggleAdvancedFilterMenu },
                        { id: 'custom-confirm-modal', close: () => resolveConfirm(false) },
                        { id: 'custom-prompt-modal', close: () => resolvePrompt(null) },
                        { id: 'photo-organizer-modal', close: () => closeModal('photo-organizer-modal') },
                        { id: 'add-fee-type-modal', close: () => closeModal('add-fee-type-modal') },
                        { id: 'fees-modal', close: () => closeModal('fees-modal') },
                        { id: 'bulk-fee-modal', close: closeBulkFeeModal },
                        { id: 'report-modal', close: () => closeModal('report-modal') },
                        { id: 'student-modal', close: closeStudentModal },
                        { id: 'import-preview-modal', close: () => closeModal('import-preview-modal') },
                        { id: 'import-modal', close: () => closeModal('import-modal') },
                        { id: 'class-modal', close: () => closeModal('class-modal') },
                        { id: 'field-selector-modal', close: () => closeModal('field-selector-modal') },
                        { id: 'fee-details-drawer', close: closeFeeModal },
                        { id: 'student-details-drawer', close: closeStudentDetailPanel },
                        { id: 'sidebar', close: toggleSidebar, check: (el) => el.classList.contains('sidebar-open') }
                    ];
                    for (const overlay of overlays) {
                        const el = document.getElementById(overlay.id);
                        if (el && !el.classList.contains('hidden') && (!overlay.check || overlay.check(el))) { overlay.close(); break; }
                    }
                }
            });

            // --- OVERRIDE IMPORT DATA FUNCTION FOR ROBUSTNESS ---
        })();

// ===== Block 6: Quick Actions & Class Order =====
        function openStudentQuickActions(uid) {
            const s = students.find(st => st.uid === uid);
            if (!s) return;

            // Calculate due amount
            let totalDue = 0;
            try {
                if (typeof calculateStudentFinancials === 'function') {
                    const fin = calculateStudentFinancials(s);
                    totalDue = fin.balance || 0;
                }
            } catch (err) {
                console.warn('Error calculating financials for quick actions:', err);
            }

            // Populate Modal
            document.getElementById('sqa-name').innerText = s.name;
            document.getElementById('sqa-id').innerText = s.id || '-';
            document.getElementById('sqa-roll').innerText = s.roll || '-';
            document.getElementById('sqa-due').innerText = '৳ ' + totalDue.toLocaleString();

            const photoEl = document.getElementById('sqa-photo');
            if (photoEl) photoEl.innerHTML = getStudentPhotoHTML(s, 'w-28 h-28 object-cover');

            // Setup buttons
            document.getElementById('sqa-btn-fees').onclick = () => {
                closeModal('student-quick-action-modal');
                if (typeof openFeesModal === 'function') {
                    openFeesModal();
                    // Give DOM a tiny moment to render the fees page before opening drawer
                    setTimeout(() => {
                        if (typeof openStudentFeeDetails === 'function') openStudentFeeDetails(uid);
                    }, 50);
                }
            };

            document.getElementById('sqa-btn-history').onclick = () => {
                closeModal('student-quick-action-modal');
                if (typeof openFeesModal === 'function') {
                    openFeesModal();
                    setTimeout(() => {
                        if (typeof openStudentFeeDetails === 'function') {
                            openStudentFeeDetails(uid);
                            // Give the drawer an extra moment to render before switching to the history tab
                            setTimeout(() => {
                                if (typeof switchFeeModalTab === 'function') switchFeeModalTab('history');
                            }, 300);
                        }
                    }, 100);
                }
            };

            document.getElementById('sqa-btn-edit').onclick = () => {
                closeModal('student-quick-action-modal');
                if (typeof editStudent === 'function') editStudent(uid);
            };

            // Standard action for Call Logs
            document.getElementById('sqa-btn-call-logs').onclick = () => {
                closeModal('student-quick-action-modal');
                window.location.href = 'tel:' + getFormattedNumber(s.mobile, 'tel');
            };

            // Dynamic logic for Status Toggle Button
            const sStatus = s.status || 'active';
            const statusBtn = document.getElementById('sqa-btn-status');
            const statusIcon = document.getElementById('sqa-icon-status');
            const statusText = document.getElementById('sqa-text-status');

            if (sStatus === 'active') {
                statusText.innerText = "ইনঅ্যাক্টিভ করুন";
                statusBtn.className = "p-5 bg-[#FDF2F8] border border-[#FCE7F3] hover:border-pink-300 rounded-[24px] flex flex-col items-center gap-3 transition-all active:scale-95 group shadow-sm";
                statusIcon.className = "w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center shadow-md shadow-pink-200 group-hover:scale-110 transition-transform";
                statusIcon.innerHTML = '<i data-lucide="power" class="w-5 h-5"></i>';
            } else {
                statusText.innerText = "অ্যাক্টিভ করুন";
                statusBtn.className = "p-5 bg-[#F0FDF4] border border-[#DCFCE7] hover:border-green-300 rounded-[24px] flex flex-col items-center gap-3 transition-all active:scale-95 group shadow-sm";
                statusIcon.className = "w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shadow-md shadow-green-200 group-hover:scale-110 transition-transform";
                statusIcon.innerHTML = '<i data-lucide="power" class="w-5 h-5"></i>';
            }

            statusBtn.onclick = () => {
                closeModal('student-quick-action-modal');
                toggleStudentStatus(uid);
            };

            // Status history button
            document.getElementById('sqa-btn-status-history').onclick = () => {
                closeModal('student-quick-action-modal');
                showStudentStatusHistory(uid);
            };

            openModal('student-quick-action-modal');
            setTimeout(() => { if (window.lucide) window.lucide.createIcons(); }, 50);
        }

        // --- Student Status Management ---
        function toggleStudentStatus(uid) {
            const s = students.find(st => st.uid === uid);
            if (!s) return;

            const isCurrentlyActive = (s.status !== 'inactive');
            const newStatus = isCurrentlyActive ? 'inactive' : 'active';

            // Generate reason
            let reason = '';
            if (newStatus === 'inactive') {
                reason = prompt('শিক্ষার্থীকে ইনঅ্যাক্টিভ করার কারণ (ঐচ্ছিক):') || 'উল্লেখ নেই';
            } else {
                reason = 'পুনরায় অ্যাক্টিভ করা হয়েছে';
            }

            s.status = newStatus;

            if (!s.statusHistory) {
                s.statusHistory = [];
            }
            s.statusHistory.unshift({
                status: newStatus,
                date: new Date().toISOString(),
                reason: reason
            });

            saveStudents();
            filterStudents();
            if (typeof updateDashboardStats === 'function') updateDashboardStats();
            showToast(`${s.name} এর স্ট্যাটাস আপডেট করে '${newStatus}' করা হয়েছে।`);
        }

        function showStudentStatusHistory(uid) {
            const s = students.find(st => st.uid === uid);
            if (!s) return;

            const listEl = document.getElementById('status-history-list');
            listEl.innerHTML = '';

            const history = s.statusHistory || [];

            if (history.length === 0) {
                listEl.innerHTML = `
                    <div class="flex flex-col items-center justify-center py-10 opacity-50">
                        <i data-lucide="history" class="w-12 h-12 mb-3 text-gray-400"></i>
                        <p class="text-[13px] font-bold text-center">কোনো রেকর্ড পাওয়া যায়নি</p>
                        <p class="text-[11px] text-center mt-1">এই শিক্ষার্থীর স্ট্যাটাস এখনও পরিবর্তন করা হয়নি।</p>
                    </div>
                `;
            } else {
                history.forEach((record, index) => {
                    const dateObj = new Date(record.date);
                    const formattedDate = dateObj.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric' });
                    const formattedTime = dateObj.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });

                    const isInactive = record.status === 'inactive';
                    const iconColor = isInactive ? 'text-pink-500' : 'text-emerald-500';
                    const bgClass = isInactive ? 'bg-pink-50' : 'bg-emerald-50';
                    const statusText = isInactive ? 'ইনঅ্যাক্টিভ' : 'অ্যাক্টিভ';

                    listEl.innerHTML += `
                        <div class="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 ${index === 0 ? 'ring-1 ring-indigo-100' : ''}">
                            <div class="w-10 h-10 rounded-full ${bgClass} flex items-center justify-center shrink-0">
                                <i data-lucide="power" class="w-5 h-5 ${iconColor}"></i>
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="flex justify-between items-start mb-1">
                                    <h4 class="font-bold text-gray-900 text-sm">${statusText}</h4>
                                    <span class="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">${formattedDate}</span>
                                </div>
                                <p class="text-[12px] text-gray-500 line-clamp-2">${record.reason}</p>
                                <p class="text-[10px] text-gray-400 mt-1">${formattedTime}</p>
                            </div>
                        </div>
                    `;
                });
            }

            openModal('status-history-modal');
            if (window.lucide) window.lucide.createIcons();
        }

        // --- Class Reordering ---
        let draggedItem = null;

        function openEditClassesModal() {
            const listEl = document.getElementById('class-edit-list');
            if (!listEl) return;

            renderClassEditList();
            openModal('edit-classes-modal');
            if (window.lucide) window.lucide.createIcons();
        }

        function renderClassEditList() {
            const listEl = document.getElementById('class-edit-list');
            listEl.innerHTML = '';

            const updatePositions = () => {
                const items = listEl.querySelectorAll('[data-index]');
                items.forEach((item, idx) => {
                    const posLabel = item.querySelector('p');
                    if (posLabel) posLabel.innerText = `Position: ${idx + 1}`;
                });
            };

            classes.forEach((cls, index) => {
                const card = document.createElement('div');
                card.className = "flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-gray-200 shadow-sm cursor-move transition-all active:scale-[0.98] active:shadow-inner";
                card.dataset.index = index;

                card.innerHTML = `
                    <div class="drag-handle shrink-0 p-1 text-gray-300">
                        <i data-lucide="grip-vertical" class="w-4 h-4"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-sm text-gray-800 truncate">${cls}</h4>
                        <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-0.5">Position: ${index + 1}</p>
                    </div>
                `;
                listEl.appendChild(card);
            });

            // Initialize SortableJS
            if (typeof Sortable !== 'undefined') {
                new Sortable(listEl, {
                    animation: 150,
                    ghostClass: 'bg-indigo-50',
                    chosenClass: 'border-indigo-400',
                    handle: '.drag-handle', // Restrict dragging to the handle
                    onEnd: updatePositions // Update position labels when drag ends
                });
            } else {
                console.error("SortableJS not loaded");
            }

            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        async function saveClassOrder() {
            const listEl = document.getElementById('class-edit-list');
            const newOrder = [];
            const items = listEl.querySelectorAll('[data-index]');

            items.forEach(item => {
                const originalIndex = parseInt(item.dataset.index);
                newOrder.push(classes[originalIndex]);
            });

            classes = newOrder;
            if (typeof saveClasses === 'function') await saveClasses();
            if (typeof renderClassFilters === 'function') renderClassFilters();
            if (typeof renderStudents === 'function') renderStudents();

            closeModal('edit-classes-modal');
            showToast('ক্লাসের নতুন সিরিয়াল সেভ করা হয়েছে।');
        }
