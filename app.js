/* ================================================================
   K.C.O GLOBAL ONLINE MARKETPLACE — PREMIUM HOMEPAGE ENGINE
   ================================================================ */

// ---- DATA: Countries (full global list, alphabetically sorted) ----
const COUNTRIES = [
  {code:"AF",name:"Afghanistan"},{code:"AL",name:"Albania"},{code:"DZ",name:"Algeria"},
  {code:"AS",name:"American Samoa"},{code:"AD",name:"Andorra"},{code:"AO",name:"Angola"},
  {code:"AI",name:"Anguilla"},{code:"AG",name:"Antigua and Barbuda"},{code:"AR",name:"Argentina"},
  {code:"AM",name:"Armenia"},{code:"AW",name:"Aruba"},{code:"AU",name:"Australia"},
  {code:"AT",name:"Austria"},{code:"AZ",name:"Azerbaijan"},{code:"BS",name:"Bahamas"},
  {code:"BH",name:"Bahrain"},{code:"BD",name:"Bangladesh"},{code:"BB",name:"Barbados"},
  {code:"BY",name:"Belarus"},{code:"BE",name:"Belgium"},{code:"BZ",name:"Belize"},
  {code:"BJ",name:"Benin"},{code:"BM",name:"Bermuda"},{code:"BT",name:"Bhutan"},
  {code:"BO",name:"Bolivia"},{code:"BQ",name:"Bonaire, Sint Eustatius and Saba"},
  {code:"BA",name:"Bosnia and Herzegovina"},{code:"BW",name:"Botswana"},
  {code:"BV",name:"Bouvet Island"},{code:"BR",name:"Brazil"},
  {code:"IO",name:"British Indian Ocean Territory"},{code:"VG",name:"British Virgin Islands"},
  {code:"BN",name:"Brunei"},{code:"BG",name:"Bulgaria"},{code:"BF",name:"Burkina Faso"},
  {code:"BI",name:"Burundi"},{code:"KH",name:"Cambodia"},{code:"CM",name:"Cameroon"},
  {code:"CA",name:"Canada"},{code:"CV",name:"Cape Verde"},{code:"KY",name:"Cayman Islands"},
  {code:"CF",name:"Central African Republic"},{code:"TD",name:"Chad"},
  {code:"CL",name:"Chile"},{code:"CN",name:"China"},{code:"CX",name:"Christmas Island"},
  {code:"CC",name:"Cocos (Keeling) Islands"},{code:"CO",name:"Colombia"},
  {code:"KM",name:"Comoros"},{code:"CG",name:"Republic of the Congo"},
  {code:"CD",name:"Democratic Republic of the Congo"},{code:"CK",name:"Cook Islands"},
  {code:"CR",name:"Costa Rica"},{code:"CI",name:"Ivory Coast"},{code:"HR",name:"Croatia"},
  {code:"CU",name:"Cuba"},{code:"CW",name:"Curaçao"},{code:"CY",name:"Cyprus"},
  {code:"CZ",name:"Czech Republic"},{code:"DK",name:"Denmark"},{code:"DJ",name:"Djibouti"},
  {code:"DM",name:"Dominica"},{code:"DO",name:"Dominican Republic"},{code:"EC",name:"Ecuador"},
  {code:"EG",name:"Egypt"},{code:"SV",name:"El Salvador"},{code:"GQ",name:"Equatorial Guinea"},
  {code:"ER",name:"Eritrea"},{code:"EE",name:"Estonia"},{code:"ET",name:"Ethiopia"},
  {code:"FK",name:"Falkland Islands"},{code:"FO",name:"Faroe Islands"},{code:"FJ",name:"Fiji"},
  {code:"FI",name:"Finland"},{code:"FR",name:"France"},{code:"GF",name:"French Guiana"},
  {code:"PF",name:"French Polynesia"},{code:"TF",name:"French Southern Territories"},
  {code:"GA",name:"Gabon"},{code:"GM",name:"Gambia"},{code:"GE",name:"Georgia"},
  {code:"DE",name:"Germany"},{code:"GH",name:"Ghana"},{code:"GI",name:"Gibraltar"},
  {code:"GR",name:"Greece"},{code:"GL",name:"Greenland"},{code:"GD",name:"Grenada"},
  {code:"GP",name:"Guadeloupe"},{code:"GU",name:"Guam"},{code:"GT",name:"Guatemala"},
  {code:"GG",name:"Guernsey"},{code:"GN",name:"Guinea"},{code:"GW",name:"Guinea-Bissau"},
  {code:"GY",name:"Guyana"},{code:"HT",name:"Haiti"},
  {code:"HM",name:"Heard Island and McDonald Islands"},{code:"HN",name:"Honduras"},
  {code:"HK",name:"Hong Kong"},{code:"HU",name:"Hungary"},{code:"IS",name:"Iceland"},
  {code:"IN",name:"India"},{code:"ID",name:"Indonesia"},{code:"IR",name:"Iran"},
  {code:"IQ",name:"Iraq"},{code:"IE",name:"Ireland"},{code:"IM",name:"Isle of Man"},
  {code:"IL",name:"Israel"},{code:"IT",name:"Italy"},{code:"JM",name:"Jamaica"},
  {code:"JP",name:"Japan"},{code:"JE",name:"Jersey"},{code:"JO",name:"Jordan"},
  {code:"KZ",name:"Kazakhstan"},{code:"KE",name:"Kenya"},{code:"KI",name:"Kiribati"},
  {code:"KP",name:"North Korea"},{code:"KR",name:"South Korea"},{code:"KW",name:"Kuwait"},
  {code:"KG",name:"Kyrgyzstan"},{code:"LA",name:"Laos"},{code:"LV",name:"Latvia"},
  {code:"LB",name:"Lebanon"},{code:"LS",name:"Lesotho"},{code:"LR",name:"Liberia"},
  {code:"LY",name:"Libya"},{code:"LI",name:"Liechtenstein"},{code:"LT",name:"Lithuania"},
  {code:"LU",name:"Luxembourg"},{code:"MO",name:"Macao"},{code:"MK",name:"North Macedonia"},
  {code:"MG",name:"Madagascar"},{code:"MW",name:"Malawi"},{code:"MY",name:"Malaysia"},
  {code:"MV",name:"Maldives"},{code:"ML",name:"Mali"},{code:"MT",name:"Malta"},
  {code:"MH",name:"Marshall Islands"},{code:"MQ",name:"Martinique"},{code:"MR",name:"Mauritania"},
  {code:"MU",name:"Mauritius"},{code:"YT",name:"Mayotte"},{code:"MX",name:"Mexico"},
  {code:"FM",name:"Micronesia"},{code:"MD",name:"Moldova"},{code:"MC",name:"Monaco"},
  {code:"MN",name:"Mongolia"},{code:"ME",name:"Montenegro"},{code:"MS",name:"Montserrat"},
  {code:"MA",name:"Morocco"},{code:"MZ",name:"Mozambique"},{code:"MM",name:"Myanmar"},
  {code:"NA",name:"Namibia"},{code:"NR",name:"Nauru"},{code:"NP",name:"Nepal"},
  {code:"NL",name:"Netherlands"},{code:"NC",name:"New Caledonia"},{code:"NZ",name:"New Zealand"},
  {code:"NI",name:"Nicaragua"},{code:"NE",name:"Niger"},{code:"NG",name:"Nigeria"},
  {code:"NU",name:"Niue"},{code:"NF",name:"Norfolk Island"},{code:"MP",name:"Northern Mariana Islands"},
  {code:"NO",name:"Norway"},{code:"OM",name:"Oman"},{code:"PK",name:"Pakistan"},
  {code:"PW",name:"Palau"},{code:"PS",name:"Palestine"},{code:"PA",name:"Panama"},
  {code:"PG",name:"Papua New Guinea"},{code:"PY",name:"Paraguay"},{code:"PE",name:"Peru"},
  {code:"PH",name:"Philippines"},{code:"PN",name:"Pitcairn Islands"},{code:"PL",name:"Poland"},
  {code:"PT",name:"Portugal"},{code:"PR",name:"Puerto Rico"},{code:"QA",name:"Qatar"},
  {code:"RE",name:"Réunion"},{code:"RO",name:"Romania"},{code:"RU",name:"Russia"},
  {code:"RW",name:"Rwanda"},{code:"BL",name:"Saint Barthélemy"},
  {code:"SH",name:"Saint Helena"},{code:"KN",name:"Saint Kitts and Nevis"},
  {code:"LC",name:"Saint Lucia"},{code:"MF",name:"Saint Martin (French)"},
  {code:"PM",name:"Saint Pierre and Miquelon"},
  {code:"VC",name:"Saint Vincent and the Grenadines"},{code:"WS",name:"Samoa"},
  {code:"SM",name:"San Marino"},{code:"ST",name:"São Tomé and Príncipe"},
  {code:"SA",name:"Saudi Arabia"},{code:"SN",name:"Senegal"},{code:"RS",name:"Serbia"},
  {code:"SC",name:"Seychelles"},{code:"SL",name:"Sierra Leone"},{code:"SG",name:"Singapore"},
  {code:"SX",name:"Sint Maarten"},{code:"SK",name:"Slovakia"},{code:"SI",name:"Slovenia"},
  {code:"SB",name:"Solomon Islands"},{code:"SO",name:"Somalia"},{code:"ZA",name:"South Africa"},
  {code:"GS",name:"South Georgia and the South Sandwich Islands"},
  {code:"SS",name:"South Sudan"},{code:"ES",name:"Spain"},{code:"LK",name:"Sri Lanka"},
  {code:"SD",name:"Sudan"},{code:"SR",name:"Suriname"},{code:"SJ",name:"Svalbard and Jan Mayen"},
  {code:"SZ",name:"Eswatini"},{code:"SE",name:"Sweden"},{code:"CH",name:"Switzerland"},
  {code:"SY",name:"Syria"},{code:"TW",name:"Taiwan"},{code:"TJ",name:"Tajikistan"},
  {code:"TZ",name:"Tanzania"},{code:"TH",name:"Thailand"},{code:"TL",name:"Timor-Leste"},
  {code:"TG",name:"Togo"},{code:"TK",name:"Tokelau"},{code:"TO",name:"Tonga"},
  {code:"TT",name:"Trinidad and Tobago"},{code:"TN",name:"Tunisia"},{code:"TR",name:"Turkey"},
  {code:"TM",name:"Turkmenistan"},{code:"TC",name:"Turks and Caicos Islands"},
  {code:"TV",name:"Tuvalu"},{code:"UG",name:"Uganda"},{code:"UA",name:"Ukraine"},
  {code:"AE",name:"United Arab Emirates"},{code:"GB",name:"United Kingdom"},
  {code:"US",name:"United States"},{code:"UM",name:"United States Minor Outlying Islands"},
  {code:"UY",name:"Uruguay"},{code:"UZ",name:"Uzbekistan"},{code:"VU",name:"Vanuatu"},
  {code:"VA",name:"Vatican City"},{code:"VE",name:"Venezuela"},{code:"VN",name:"Vietnam"},
  {code:"VI",name:"United States Virgin Islands"},{code:"WF",name:"Wallis and Futuna"},
  {code:"EH",name:"Western Sahara"},{code:"YE",name:"Yemen"},{code:"ZM",name:"Zambia"},
  {code:"ZW",name:"Zimbabwe"},{code:"AX",name:"Åland Islands"},{code:"AQ",name:"Antarctica"},
];

const LANGUAGES = [
  {code:"aa",name:"Afar"},{code:"ab",name:"Abkhazian"},{code:"af",name:"Afrikaans"},
  {code:"ak",name:"Akan"},{code:"am",name:"Amharic"},{code:"ar",name:"العربية"},
  {code:"as",name:"Assamese"},{code:"az",name:"Azərbaycan"},{code:"ba",name:"Bashkir"},
  {code:"be",name:"Беларуская"},{code:"bg",name:"Български"},{code:"bm",name:"Bambara"},
  {code:"bn",name:"বাংলা"},{code:"bo",name:"བོད་སྐད"},{code:"br",name:"Breton"},
  {code:"bs",name:"Bosanski"},{code:"ca",name:"Català"},{code:"ce",name:"Chechen"},
  {code:"cs",name:"Čeština"},{code:"cy",name:"Cymraeg"},{code:"da",name:"Dansk"},
  {code:"de",name:"Deutsch"},{code:"dv",name:"Dhivehi"},{code:"dz",name:"Dzongkha"},
  {code:"ee",name:"Ewe"},{code:"el",name:"Ελληνικά"},{code:"en",name:"English"},
  {code:"eo",name:"Esperanto"},{code:"es",name:"Español"},{code:"et",name:"Eesti"},
  {code:"eu",name:"Euskara"},{code:"fa",name:"فارسی"},{code:"ff",name:"Fulah"},
  {code:"fi",name:"Suomi"},{code:"fo",name:"Føroyskt"},{code:"fr",name:"Français"},
  {code:"fy",name:"Frysk"},{code:"ga",name:"Gaeilge"},{code:"gd",name:"Gàidhlig"},
  {code:"gl",name:"Galego"},{code:"gn",name:"Guarani"},{code:"gu",name:"ગુજરાતી"},
  {code:"gv",name:"Gaelg"},{code:"ha",name:"Hausa"},{code:"he",name:"עברית"},
  {code:"hi",name:"हिन्दी"},{code:"hr",name:"Hrvatski"},{code:"hu",name:"Magyar"},
  {code:"hy",name:"Հայերեն"},{code:"ia",name:"Interlingua"},{code:"id",name:"Bahasa Indonesia"},
  {code:"ig",name:"Igbo"},{code:"is",name:"Íslenska"},{code:"it",name:"Italiano"},
  {code:"iu",name:"Inuktitut"},{code:"ja",name:"日本語"},{code:"jv",name:"Basa Jawa"},
  {code:"ka",name:"ქართული"},{code:"kk",name:"Қазақ"},{code:"kl",name:"Kalaallisut"},
  {code:"km",name:"ខ្មែរ"},{code:"kn",name:"ಕನ್ನಡ"},{code:"ko",name:"한국어"},
  {code:"ks",name:"कश्मीरी"},{code:"ku",name:"Kurdî"},{code:"kw",name:"Kernewek"},
  {code:"ky",name:"Кыргызча"},{code:"la",name:"Latina"},{code:"lb",name:"Lëtzebuergesch"},
  {code:"lg",name:"Luganda"},{code:"ln",name:"Lingala"},{code:"lo",name:"ລາວ"},
  {code:"lt",name:"Lietuvių"},{code:"lv",name:"Latviešu"},{code:"mg",name:"Malagasy"},
  {code:"mi",name:"Māori"},{code:"mk",name:"Македонски"},{code:"ml",name:"മലയാളം"},
  {code:"mn",name:"Монгол"},{code:"mr",name:"मराठी"},{code:"ms",name:"Bahasa Melayu"},
  {code:"mt",name:"Malti"},{code:"my",name:"ဗမာ"},{code:"ne",name:"नेपाली"},
  {code:"nl",name:"Nederlands"},{code:"nn",name:"Nynorsk"},{code:"no",name:"Norsk"},
  {code:"nr",name:"isiNdebele"},{code:"ny",name:"Chichewa"},{code:"oc",name:"Occitan"},
  {code:"om",name:"Oromoo"},{code:"or",name:"ଓଡ଼ିଆ"},{code:"os",name:"Ирон"},
  {code:"pa",name:"ਪੰਜਾਬੀ"},{code:"pl",name:"Polski"},{code:"ps",name:"پښتو"},
  {code:"pt",name:"Português"},{code:"qu",name:"Runa Simi"},{code:"rm",name:"Rumantsch"},
  {code:"rn",name:"Kirundi"},{code:"ro",name:"Română"},{code:"ru",name:"Русский"},
  {code:"rw",name:"Kinyarwanda"},{code:"sa",name:"संस्कृत"},{code:"sc",name:"Sardu"},
  {code:"sd",name:"سنڌي"},{code:"se",name:"Sámegiella"},{code:"sg",name:"Sängö"},
  {code:"si",name:"සිංහල"},{code:"sk",name:"Slovenčina"},{code:"sl",name:"Slovenščina"},
  {code:"sn",name:"chiShona"},{code:"so",name:"Soomaali"},{code:"sq",name:"Shqip"},
  {code:"sr",name:"Српски"},{code:"ss",name:"SiSwati"},{code:"st",name:"Sesotho"},
  {code:"su",name:"Basa Sunda"},{code:"sv",name:"Svenska"},{code:"sw",name:"Kiswahili"},
  {code:"ta",name:"தமிழ்"},{code:"te",name:"తెలుగు"},{code:"tg",name:"Тоҷикӣ"},
  {code:"th",name:"ไทย"},{code:"ti",name:"ትግርኛ"},{code:"tk",name:"Türkmen"},
  {code:"tl",name:"Filipino"},{code:"tn",name:"Setswana"},{code:"to",name:"Lea Faka-Tonga"},
  {code:"tr",name:"Türkçe"},{code:"ts",name:"Xitsonga"},{code:"tt",name:"Татар"},
  {code:"ty",name:"Reo Tahiti"},{code:"ug",name:"ئۇيغۇرچە"},{code:"uk",name:"Українська"},
  {code:"ur",name:"اردو"},{code:"uz",name:"Oʻzbek"},{code:"ve",name:"Tshivenḓa"},
  {code:"vi",name:"Tiếng Việt"},{code:"wa",name:"Walon"},{code:"wo",name:"Wolof"},
  {code:"xh",name:"isiXhosa"},{code:"yi",name:"ייִדיש"},{code:"yo",name:"Yorùbá"},
  {code:"zh",name:"中文"},{code:"zu",name:"isiZulu"},
];

// ---- DATA: Categories ----
const CATEGORIES = [
  {name:"All",icon:"layout-grid",color:"orange"},
  {name:"Women",icon:"shopping-bag",color:"pink"},{name:"Men",icon:"shirt",color:"blue"},{name:"Kids",icon:"baby",color:"amber"},
  {name:"Home",icon:"home",color:"emerald"},{name:"Sports",icon:"dumbbell",color:"lime"},{name:"Jewellery",icon:"gem",color:"cyan"},
  {name:"Electronics",icon:"circuit-board",color:"sky"},{name:"Cars",icon:"car",color:"red"},{name:"Motorcycles",icon:"motorcycle",color:"orange"},
  {name:"Phones",icon:"smartphone",color:"violet"},{name:"Computers",icon:"laptop",color:"indigo"},{name:"Furniture",icon:"armchair",color:"teal"},
  {name:"Beauty",icon:"sparkles",color:"rose"},{name:"Fashion",icon:"scissors",color:"fuchsia"},{name:"Real Estate",icon:"building-2",color:"slate"},
  {name:"Bicycles",icon:"bike",color:"green"},{name:"Trucks",icon:"truck",color:"yellow"},{name:"Land",icon:"map-pin",color:"lime"},
  {name:"Kitchen",icon:"cooking-pot",color:"orange"},{name:"Food",icon:"shopping-basket",color:"emerald"},{name:"Pets",icon:"paw-print",color:"brown"},
  {name:"Books",icon:"book-open",color:"blue"},{name:"Toys",icon:"gamepad-2",color:"purple"},{name:"Services",icon:"wrench",color:"gray"},
];

// Tailwind color class maps for category accents (text + bg + border + glow)
const CAT_COLORS = {
  orange:{text:"text-orange-400",bg:"from-orange-500/20",to:"to-orange-500/5",border:"border-orange-500/50",glow:"0 0 18px rgba(249,115,22,0.2)",hoverBorder:"hover:border-orange-500/40"},
  pink:{text:"text-pink-400",bg:"from-pink-500/20",to:"to-pink-500/5",border:"border-pink-500/50",glow:"0 0 18px rgba(236,72,153,0.2)",hoverBorder:"hover:border-pink-500/40"},
  blue:{text:"text-blue-400",bg:"from-blue-500/20",to:"to-blue-500/5",border:"border-blue-500/50",glow:"0 0 18px rgba(59,130,246,0.2)",hoverBorder:"hover:border-blue-500/40"},
  amber:{text:"text-amber-400",bg:"from-amber-500/20",to:"to-amber-500/5",border:"border-amber-500/50",glow:"0 0 18px rgba(245,158,11,0.2)",hoverBorder:"hover:border-amber-500/40"},
  emerald:{text:"text-emerald-400",bg:"from-emerald-500/20",to:"to-emerald-500/5",border:"border-emerald-500/50",glow:"0 0 18px rgba(16,185,129,0.2)",hoverBorder:"hover:border-emerald-500/40"},
  lime:{text:"text-lime-400",bg:"from-lime-500/20",to:"to-lime-500/5",border:"border-lime-500/50",glow:"0 0 18px rgba(132,204,22,0.2)",hoverBorder:"hover:border-lime-500/40"},
  cyan:{text:"text-cyan-400",bg:"from-cyan-500/20",to:"to-cyan-500/5",border:"border-cyan-500/50",glow:"0 0 18px rgba(34,211,238,0.2)",hoverBorder:"hover:border-cyan-500/40"},
  sky:{text:"text-sky-400",bg:"from-sky-500/20",to:"to-sky-500/5",border:"border-sky-500/50",glow:"0 0 18px rgba(14,165,233,0.2)",hoverBorder:"hover:border-sky-500/40"},
  red:{text:"text-red-400",bg:"from-red-500/20",to:"to-red-500/5",border:"border-red-500/50",glow:"0 0 18px rgba(239,68,68,0.2)",hoverBorder:"hover:border-red-500/40"},
  violet:{text:"text-violet-400",bg:"from-violet-500/20",to:"to-violet-500/5",border:"border-violet-500/50",glow:"0 0 18px rgba(139,92,246,0.2)",hoverBorder:"hover:border-violet-500/40"},
  indigo:{text:"text-indigo-400",bg:"from-indigo-500/20",to:"to-indigo-500/5",border:"border-indigo-500/50",glow:"0 0 18px rgba(99,102,241,0.2)",hoverBorder:"hover:border-indigo-500/40"},
  teal:{text:"text-teal-400",bg:"from-teal-500/20",to:"to-teal-500/5",border:"border-teal-500/50",glow:"0 0 18px rgba(20,184,166,0.2)",hoverBorder:"hover:border-teal-500/40"},
  rose:{text:"text-rose-400",bg:"from-rose-500/20",to:"to-rose-500/5",border:"border-rose-500/50",glow:"0 0 18px rgba(244,63,94,0.2)",hoverBorder:"hover:border-rose-500/40"},
  fuchsia:{text:"text-fuchsia-400",bg:"from-fuchsia-500/20",to:"to-fuchsia-500/5",border:"border-fuchsia-500/50",glow:"0 0 18px rgba(217,70,239,0.2)",hoverBorder:"hover:border-fuchsia-500/40"},
  slate:{text:"text-slate-300",bg:"from-slate-500/20",to:"to-slate-500/5",border:"border-slate-400/50",glow:"0 0 18px rgba(148,163,184,0.2)",hoverBorder:"hover:border-slate-400/40"},
  green:{text:"text-green-400",bg:"from-green-500/20",to:"to-green-500/5",border:"border-green-500/50",glow:"0 0 18px rgba(34,197,94,0.2)",hoverBorder:"hover:border-green-500/40"},
  yellow:{text:"text-yellow-400",bg:"from-yellow-500/20",to:"to-yellow-500/5",border:"border-yellow-500/50",glow:"0 0 18px rgba(234,179,8,0.2)",hoverBorder:"hover:border-yellow-500/40"},
  brown:{text:"text-amber-600",bg:"from-amber-700/20",to:"to-amber-700/5",border:"border-amber-600/50",glow:"0 0 18px rgba(180,83,9,0.2)",hoverBorder:"hover:border-amber-600/40"},
  purple:{text:"text-purple-400",bg:"from-purple-500/20",to:"to-purple-500/5",border:"border-purple-500/50",glow:"0 0 18px rgba(168,85,247,0.2)",hoverBorder:"hover:border-purple-500/40"},
  gray:{text:"text-gray-400",bg:"from-gray-500/20",to:"to-gray-500/5",border:"border-gray-400/50",glow:"0 0 18px rgba(156,163,175,0.2)",hoverBorder:"hover:border-gray-400/40"},
};

// ---- DATA: Search Suggestions ----
const SEARCH_SUGGESTIONS = [
  "Luxury Hypercars","Sports Cars","SUVs","Motorhomes","Trucks","Delivery Trucks",
  "Luxury Houses","Family Houses","Beach Houses","Smart Homes","Villas","Mansions",
  "Apartments","Luxury Apartments","Commercial Buildings","Hotels","Resorts",
  "Men's Fashion","Women's Fashion","Baby Clothes","Baby Products","Shoes",
  "Luxury Watches","Gold Jewelry","Diamond Jewelry","Luxury Handbags",
  "Beauty Products","Perfumes","Cosmetics","iPhone","Samsung Galaxy","Google Pixel",
  "Gaming Laptops","Desktop Computers","Smart TVs","Electronics","Furniture",
  "Home Appliances","Gaming Accessories","Sports Equipment","Food Markets",
  "Fresh Vegetables","Supermarkets","Restaurants","Travel","Tourism",
  "Agriculture","Construction Equipment","Health Products","Fitness Equipment",
  "Toys","Books","Pet Supplies","DHL Shipping","FedEx Delivery","UPS Worldwide",
  "Aramex Logistics","Cargo Ships","Delivery Aircraft","Warehouses","Distribution Centers",
];

// ---- DATA: Holiday Engine ----
const HOLIDAYS = {
  US:[{date:"01-01",name:"New Year's Day"},{date:"07-04",name:"Independence Day"},{date:"11-11",name:"Veterans Day"},{date:"11-28",name:"Thanksgiving Day"},{date:"12-25",name:"Christmas Day"}],
  GB:[{date:"01-01",name:"New Year's Day"},{date:"12-26",name:"Boxing Day"},{date:"11-05",name:"Guy Fawkes Night"},{date:"12-25",name:"Christmas Day"}],
  JP:[{date:"01-01",name:"New Year (Shogatsu)"},{date:"04-29",name:"Golden Week Begins"},{date:"05-03",name:"Constitution Day"},{date:"05-04",name:"Greenery Day"},{date:"05-05",name:"Children's Day"},{date:"11-03",name:"Culture Day"},{date:"12-23",name:"Emperor's Birthday"}],
  DE:[{date:"01-01",name:"Neujahr"},{date:"10-03",name:"Tag der Deutschen Einheit"},{date:"12-25",name:"Erster Weihnachtstag"},{date:"12-26",name:"Zweiter Weihnachtstag"}],
  FR:[{date:"01-01",name:"Jour de l'An"},{date:"07-14",name:"Fête Nationale"},{date:"11-11",name:"Armistice Day"},{date:"12-25",name:"Noël"}],
  CN:[{date:"01-01",name:"New Year's Day"},{date:"02-10",name:"Spring Festival"},{date:"10-01",name:"National Day"},{date:"12-25",name:"Christmas"}],
  IN:[{date:"01-01",name:"New Year's Day"},{date:"01-26",name:"Republic Day"},{date:"08-15",name:"Independence Day"},{date:"10-02",name:"Gandhi Jayanti"},{date:"11-01",name:"Diwali"}],
  BR:[{date:"01-01",name:"Ano Novo"},{date:"09-07",name:"Independência"},{date:"12-25",name:"Natal"}],
  AE:[{date:"01-01",name:"New Year's Day"},{date:"12-02",name:"National Day"},{date:"12-03",name:"National Day Holiday"}],
  CA:[{date:"01-01",name:"New Year's Day"},{date:"07-01",name:"Canada Day"},{date:"11-11",name:"Remembrance Day"},{date:"12-25",name:"Christmas Day"},{date:"12-26",name:"Boxing Day"}],
  AU:[{date:"01-01",name:"New Year's Day"},{date:"01-26",name:"Australia Day"},{date:"12-25",name:"Christmas Day"},{date:"12-26",name:"Boxing Day"}],
  NG:[{date:"01-01",name:"New Year's Day"},{date:"10-01",name:"Independence Day"},{date:"12-25",name:"Christmas Day"}],
  ZA:[{date:"01-01",name:"New Year's Day"},{date:"04-27",name:"Freedom Day"},{date:"12-16",name:"Day of Reconciliation"},{date:"12-25",name:"Christmas Day"}],
  MX:[{date:"01-01",name:"Año Nuevo"},{date:"09-16",name:"Día de la Independencia"},{date:"11-02",name:"Día de los Muertos"},{date:"12-25",name:"Navidad"}],
  IT:[{date:"01-01",name:"Capodanno"},{date:"06-02",name:"Festa della Repubblica"},{date:"12-25",name:"Natale"}],
  ES:[{date:"01-01",name:"Año Nuevo"},{date:"10-12",name:"Fiesta Nacional"},{date:"12-25",name:"Navidad"}],
  SA:[{date:"02-22",name:"Founding Day"},{date:"09-23",name:"Saudi National Day"}],
  KR:[{date:"01-01",name:"New Year's Day"},{date:"03-01",name:"Samiljeol"},{date:"08-15",name:"Gwangbokjeol"},{date:"10-03",name:"Gaecheonjeol"}],
  EG:[{date:"01-01",name:"New Year's Day"},{date:"07-23",name:"Revolution Day"},{date:"10-06",name:"Armed Forces Day"}],
  RU:[{date:"01-01",name:"New Year's Day"},{date:"06-12",name:"Day of Russia"},{date:"11-04",name:"Unity Day"}],
};

// ---- DATA: Ad Copy Dictionary ----
const AD_COPY = {
  en:{shopNow:"Shop Collection",explore:"Explore Category",learnMore:"Learn More",worldwide:"Worldwide Shipping",worldwideSub:"200+ countries served",delivery:"Fast Delivery",deliverySub:"Express options available",secure:"Secure Shopping",secureSub:"SSL encrypted checkout",support:"24/7 Customer Support",supportSub:"Always here for you"},
  es:{shopNow:"Comprar Colección",explore:"Explorar Categoría",learnMore:"Más Información",worldwide:"Envío Mundial",worldwideSub:"200+ países atendidos",delivery:"Entrega Rápida",deliverySub:"Opciones exprés disponibles",secure:"Compra Segura",secureSub:"Pago cifrado SSL",support:"Soporte 24/7",supportSub:"Siempre aquí para ti"},
  fr:{shopNow:"Acheter Collection",explore:"Explorer Catégorie",learnMore:"En Savoir Plus",worldwide:"Livraison Mondiale",worldwideSub:"200+ pays desservis",delivery:"Livraison Rapide",deliverySub:"Options express disponibles",secure:"Achat Sécurisé",secureSub:"Paiement chiffré SSL",support:"Support 24/7",supportSub:"Toujours là pour vous"},
  de:{shopNow:"Kollektion Kaufen",explore:"Kategorie Entdecken",learnMore:"Mehr Erfahren",worldwide:"Weltweiter Versand",worldwideSub:"200+ Länder bedient",delivery:"Schnelle Lieferung",deliverySub:"Express-Optionen verfügbar",secure:"Sicheres Einkaufen",secureSub:"SSL-verschlüsselte Kasse",support:"24/7 Kundenservice",supportSub:"Immer für Sie da"},
  ja:{shopNow:"コレクションを見る",explore:"カテゴリーを探る",learnMore:"詳細を見る",worldwide:"世界中の配送",worldwideSub:"200カ国以上に対応",delivery:"高速配送",deliverySub:"エクスプレスオプション",secure:"安全なショッピング",secureSub:"SSL暗号化決済",support:"24時間サポート",supportSub:"いつもそばに"},
  ar:{shopNow:"تسوق المجموعة",explore:"استكشف الفئة",learnMore:"اعرف المزيد",worldwide:"شحن عالمي",worldwideSub:"أكثر من 200 دولة",delivery:"توصيل سريع",deliverySub:"خيارات سريعة",secure:"تسوق آمن",secureSub:"دفع مشفر SSL",support:"دعم 24/7",supportSub:"نحن هنا دائماً"},
  zh:{shopNow:"选购系列",explore:"探索类别",learnMore:"了解更多",worldwide:"全球配送",worldwideSub:"服务200+国家",delivery:"快速配送",deliverySub:"提供加急选项",secure:"安全购物",secureSub:"SSL加密结算",support:"24/7客服",supportSub:"随时为您服务"},
  pt:{shopNow:"Comprar Coleção",explore:"Explorar Categoria",learnMore:"Saber Mais",worldwide:"Envio Mundial",worldwideSub:"200+ países atendidos",delivery:"Entrega Rápida",deliverySub:"Opções express disponíveis",secure:"Compra Segura",secureSub:"Pagamento criptografado SSL",support:"Suporte 24/7",supportSub:"Sempre aqui para você"},
  ru:{shopNow:"Купить Коллекцию",explore:"Исследовать Категорию",learnMore:"Узнать Больше",worldwide:"Доставка по всему миру",worldwideSub:"200+ стран",delivery:"Быстрая доставка",deliverySub:"Экспресс-опции",secure:"Безопасные покупки",secureSub:"SSL-шифрование",support:"Поддержка 24/7",supportSub:"Всегда для вас"},
  hi:{shopNow:"संग्रह खरीदें",explore:"श्रेणी देखें",learnMore:"और जानें",worldwide:"विश्वव्यापी शिपिंग",worldwideSub:"200+ देशों में सेवा",delivery:"तेज डिलीवरी",deliverySub:"एक्सप्रेस विकल्प",secure:"सुरक्षित खरीद",secureSub:"SSL एन्क्रिप्टेड चेकआउट",support:"24/7 सहायता",supportSub:"हमेशा आपके लिए"},
};

// ---- DATA: Carousel Video Slides ----
// All categories in a single hero carousel — real Pexels stock videos
// Brand: K.C.O Global Online Marketplace
const V = "https://videos.pexels.com/video-files/";
const BRAND = "K.C.O Global Online Marketplace";
const CAROUSEL_SLIDES = [
  // === TRANSPORTATION & LOGISTICS ===
  {video:V+"6618332/6618332-sd_640_360_24fps.mp4",badge:"Global Logistics",titles:{en:BRAND+" \u2013 Global Logistics & Shipping"},descs:{en:"DHL, FedEx, UPS & Aramex \u2014 delivering across 200+ countries with cargo ships, aircraft, and distribution hubs."}},
  {video:V+"3058057/3058057-sd_640_360_30fps.mp4",badge:"Maritime Cargo",titles:{en:BRAND+" \u2013 Cargo Ships & Ports"},descs:{en:"Massive container ships and busy port terminals keep global trade moving day and night."}},
  {video:V+"4324104/4324104-sd_640_360_24fps.mp4",badge:"Delivery Fleet",titles:{en:BRAND+" \u2013 Delivery Trucks & Last-Mile"},descs:{en:"From warehouse to doorstep \u2014 fleet management, courier services, and last-mile delivery worldwide."}},
  {video:V+"3289608/3289608-sd_640_360_24fps.mp4",badge:"Smart Warehousing",titles:{en:BRAND+" \u2013 Warehouses & Distribution"},descs:{en:"Smart warehousing, freight forwarding, customs clearance, and cold chain logistics for global commerce."}},
  {video:V+"31559829/13450487_640_360_60fps.mp4",badge:"Freight & Cargo",titles:{en:BRAND+" \u2013 Air Cargo & Sea Freight"},descs:{en:"Express air cargo, sea freight, rail freight, and shipping containers moving goods across continents."}},
  // === REAL ESTATE \u2014 INDIVIDUAL CATEGORIES ===
  {video:V+"30216905/12955636_640_360_60fps.mp4",badge:"Luxury Houses",titles:{en:BRAND+" \u2013 Luxury Houses"},descs:{en:"Discover stunning luxury houses with premium architecture, private pools, and breathtaking views worldwide."}},
  {video:V+"18531289/18531289-sd_640_360_30fps.mp4",badge:"Family Houses",titles:{en:BRAND+" \u2013 Family Houses"},descs:{en:"Spacious family houses designed for comfort \u2014 multiple bedrooms, modern kitchens, and safe neighborhoods."}},
  {video:V+"17692984/17692984-sd_640_360_30fps.mp4",badge:"Beach Houses",titles:{en:BRAND+" \u2013 Beach Houses"},descs:{en:"Wake up to ocean views in beautiful beach houses along the world's most stunning coastlines."}},
  {video:V+"16998369/16998369-sd_640_360_30fps.mp4",badge:"Waterfront Homes",titles:{en:BRAND+" \u2013 Waterfront Homes"},descs:{en:"Premium waterfront properties with private docks, lake access, and panoramic water views."}},
  {video:V+"11329982/11329982-sd_640_360_30fps.mp4",badge:"Luxury Villas",titles:{en:BRAND+" \u2013 Luxury Villas"},descs:{en:"Exclusive luxury villas featuring private pools, gardens, and world-class amenities in prime destinations."}},
  {video:V+"27690869/12206171_640_360_30fps.mp4",badge:"Mansions",titles:{en:BRAND+" \u2013 Mansions"},descs:{en:"Grand mansions and estates with expansive grounds, luxury interiors, and unparalleled prestige."}},
  {video:V+"14408658/14408658-sd_640_360_30fps.mp4",badge:"Smart Homes",titles:{en:BRAND+" \u2013 Smart Homes"},descs:{en:"AI-powered smart homes with automated lighting, security, climate control, and connected living technology."}},
  {video:V+"30216901/12955687_640_360_60fps.mp4",badge:"Apartments",titles:{en:BRAND+" \u2013 Apartments"},descs:{en:"Modern apartments in prime city locations with contemporary design and premium amenities."}},
  {video:V+"30203752/12951125_640_360_60fps.mp4",badge:"Luxury Apartments",titles:{en:BRAND+" \u2013 Luxury Apartments"},descs:{en:"High-end luxury apartments with concierge services, rooftop terraces, and spectacular city views."}},
  {video:V+"12525959/12525959-sd_640_360_30fps.mp4",badge:"Penthouses",titles:{en:BRAND+" \u2013 Penthouses"},descs:{en:"Exclusive penthouses occupying the top floors of luxury towers with private elevators and panoramic vistas."}},
  {video:V+"8435818/8435818-sd_640_360_30fps.mp4",badge:"Duplexes",titles:{en:BRAND+" \u2013 Duplexes"},descs:{en:"Spacious duplexes offering two levels of elegant living with modern layouts and private entrances."}},
  {video:V+"9700254/9700254-sd_640_360_30fps.mp4",badge:"Townhouses",titles:{en:BRAND+" \u2013 Townhouses"},descs:{en:"Charming townhouses in vibrant communities with shared amenities and urban convenience."}},
  {video:V+"30216893/12955642_640_360_60fps.mp4",badge:"Farm Houses",titles:{en:BRAND+" \u2013 Farm Houses"},descs:{en:"Rustic farm houses with acreage, barns, and pastoral settings for country living and agriculture."}},
  {video:V+"17692989/17692989-sd_640_360_30fps.mp4",badge:"Vacation Homes",titles:{en:BRAND+" \u2013 Vacation Homes"},descs:{en:"Vacation homes in scenic destinations \u2014 perfect getaways for families and travelers worldwide."}},
  {video:V+"28448027/12385946_640_360_30fps.mp4",badge:"Resorts",titles:{en:BRAND+" \u2013 Resorts"},descs:{en:"World-class resorts with spas, golf courses, fine dining, and unforgettable vacation experiences."}},
  {video:V+"5853322/5853322-sd_640_360_25fps.mp4",badge:"Hotels",titles:{en:BRAND+" \u2013 Hotels"},descs:{en:"Luxury hotels and boutique accommodations in prime destinations across every continent."}},
  {video:V+"6474633/6474633-sd_960_506_25fps.mp4",badge:"Commercial Buildings",titles:{en:BRAND+" \u2013 Commercial Buildings"},descs:{en:"Commercial buildings and retail spaces for businesses seeking prime locations and modern facilities."}},
  {video:V+"16236366/16236366-sd_640_360_30fps.mp4",badge:"Office Buildings",titles:{en:BRAND+" \u2013 Office Buildings"},descs:{en:"Office buildings and corporate spaces with flexible layouts and premium business amenities."}},
  {video:V+"5378935/5378935-sd_960_506_25fps.mp4",badge:"Shopping Malls",titles:{en:BRAND+" \u2013 Shopping Malls"},descs:{en:"Shopping malls and retail centers offering world-class shopping and entertainment experiences."}},
  {video:V+"31618415/13474994_640_360_24fps.mp4",badge:"Land for Sale",titles:{en:BRAND+" \u2013 Land for Sale"},descs:{en:"Prime land for sale \u2014 residential, commercial, and agricultural plots in growing markets worldwide."}},
  {video:V+"7607084/7607084-sd_640_360_25fps.mp4",badge:"Luxury Estates",titles:{en:BRAND+" \u2013 Luxury Estates"},descs:{en:"Exclusive luxury estates with vast grounds, private gates, and uncompromising elegance and privacy."}},
  // === AUTOMOTIVE \u2014 INDIVIDUAL CATEGORIES ===
  {video:V+"4849157/4849157-sd_640_360_24fps.mp4",badge:"Luxury Cars",titles:{en:BRAND+" \u2013 Luxury Cars"},descs:{en:"Premium luxury cars from Bentley, Rolls-Royce, Mercedes, BMW, and the world's finest automakers."}},
  {video:V+"5309353/5309353-sd_640_360_25fps.mp4",badge:"Sports Cars",titles:{en:BRAND+" \u2013 Sports Cars"},descs:{en:"High-performance sports cars engineered for speed, precision, and adrenaline on every road."}},
  {video:V+"4281368/4281368-sd_640_360_24fps.mp4",badge:"Supercars",titles:{en:BRAND+" \u2013 Supercars"},descs:{en:"Exclusive supercars from Ferrari, Lamborghini, McLaren, and Pagani \u2014 the pinnacle of automotive engineering."}},
  {video:V+"8630309/8630309-sd_640_360_25fps.mp4",badge:"Hypercars",titles:{en:BRAND+" \u2013 Hypercars"},descs:{en:"Rare hypercars pushing the boundaries of speed, technology, and design \u2014 limited edition masterpieces."}},
  {video:V+"3998657/3998657-sd_640_360_24fps.mp4",badge:"Electric Vehicles",titles:{en:BRAND+" \u2013 Electric Vehicles"},descs:{en:"Electric vehicles from Tesla, Rivian, Lucid, and leading brands \u2014 zero emissions, maximum performance."}},
  {video:V+"4565728/4565728-sd_640_360_25fps.mp4",badge:"Hybrid Vehicles",titles:{en:BRAND+" \u2013 Hybrid Vehicles"},descs:{en:"Hybrid vehicles combining fuel efficiency with performance \u2014 the smart choice for modern drivers."}},
  {video:V+"6158064/6158064-sd_640_360_30fps.mp4",badge:"SUVs",titles:{en:BRAND+" \u2013 SUVs"},descs:{en:"Luxury SUVs and family SUVs with advanced safety, spacious interiors, and all-terrain capability."}},
  {video:V+"5309420/5309420-sd_640_360_25fps.mp4",badge:"Pickup Trucks",titles:{en:BRAND+" \u2013 Pickup Trucks"},descs:{en:"Powerful pickup trucks from Ford, Chevrolet, Toyota, and Ram \u2014 built for work and adventure."}},
  {video:V+"4203572/4203572-sd_640_360_24fps.mp4",badge:"Sedans",titles:{en:BRAND+" \u2013 Sedans"},descs:{en:"Elegant sedans offering comfort, style, and refined performance for executive driving."}},
  {video:V+"6331328/6331328-sd_960_506_24fps.mp4",badge:"Hatchbacks",titles:{en:BRAND+" \u2013 Hatchbacks"},descs:{en:"Compact hatchbacks perfect for city driving \u2014 efficient, practical, and stylish everyday vehicles."}},
  {video:V+"13643111/13643111-sd_640_360_24fps.mp4",badge:"Coupes",titles:{en:BRAND+" \u2013 Coupes"},descs:{en:"Sleek coupes with sporty two-door designs \u2014 performance meets elegance on every journey."}},
  {video:V+"5834300/5834300-sd_640_360_24fps.mp4",badge:"Convertibles",titles:{en:BRAND+" \u2013 Convertibles"},descs:{en:"Open-top convertibles for the ultimate driving experience \u2014 feel the wind and the freedom."}},
  {video:V+"4281280/4281280-sd_640_360_24fps.mp4",badge:"Vans",titles:{en:BRAND+" \u2013 Vans"},descs:{en:"Passenger vans and cargo vans for families and businesses \u2014 spacious, reliable, and versatile."}},
  {video:V+"3845373/3845373-sd_640_360_24fps.mp4",badge:"Minivans",titles:{en:BRAND+" \u2013 Minivans"},descs:{en:"Family minivans with flexible seating, entertainment systems, and advanced safety for every journey."}},
  {video:V+"3817901/3817901-sd_640_360_30fps.mp4",badge:"Commercial Trucks",titles:{en:BRAND+" \u2013 Commercial Trucks"},descs:{en:"Commercial trucks for logistics and construction \u2014 heavy-duty performance for professional use."}},
  {video:V+"12374292/12374292-sd_640_360_24fps.mp4",badge:"Heavy-Duty Trucks",titles:{en:BRAND+" \u2013 Heavy-Duty Trucks"},descs:{en:"Heavy-duty trucks built for the toughest jobs \u2014 maximum payload, durability, and power."}},
  {video:V+"35210967/14916434_640_360_60fps.mp4",badge:"Luxury Motorhomes",titles:{en:BRAND+" \u2013 Luxury Motorhomes"},descs:{en:"Luxury motorhomes with premium interiors, full kitchens, and residential comfort on the road."}},
  {video:V+"18370456/18370456-sd_640_360_30fps.mp4",badge:"Class A Motorhomes",titles:{en:BRAND+" \u2013 Class A Motorhomes"},descs:{en:"Class A motorhomes \u2014 the ultimate in RV luxury with expansive living space and top-tier amenities."}},
  {video:V+"32731604/13954515_360_640_30fps.mp4",badge:"Class B Camper Vans",titles:{en:BRAND+" \u2013 Class B Camper Vans"},descs:{en:"Class B camper vans \u2014 compact, agile, and fully equipped for spontaneous adventures anywhere."}},
  {video:V+"17899033/17899033-sd_640_360_24fps.mp4",badge:"Class C Motorhomes",titles:{en:BRAND+" \u2013 Class C Motorhomes"},descs:{en:"Class C motorhomes offering the perfect balance of size, comfort, and drivability for families."}},
  {video:V+"33870727/14373922_360_640_30fps.mp4",badge:"Luxury Camper Vans",titles:{en:BRAND+" \u2013 Luxury Camper Vans"},descs:{en:"Luxury camper vans with premium finishes, smart technology, and off-grid capability for modern nomads."}},
  {video:V+"34479230/14610570_360_640_24fps.mp4",badge:"Travel Trailers",titles:{en:BRAND+" \u2013 Travel Trailers"},descs:{en:"Travel trailers for every budget \u2014 lightweight, towable, and ready for your next road trip adventure."}},
  {video:V+"7018509/7018509-sd_506_960_25fps.mp4",badge:"Fifth-Wheel RVs",titles:{en:BRAND+" \u2013 Fifth-Wheel RVs"},descs:{en:"Fifth-wheel RVs with spacious interiors and residential features \u2014 the ultimate towing experience."}},
  {video:V+"3530201/3530201-sd_640_360_30fps.mp4",badge:"Off-Road Campers",titles:{en:BRAND+" \u2013 Off-Road Campers"},descs:{en:"Off-road campers built for rugged terrain \u2014 durable, self-contained, and ready for the wilderness."}},
  {video:V+"18437773/18437773-sd_640_360_25fps.mp4",badge:"Family Motorhomes",titles:{en:BRAND+" \u2013 Family Motorhomes"},descs:{en:"Family motorhomes with bunk beds, entertainment centers, and space for the whole family."}},
  {video:V+"20260712/20260712-sd_640_360_30fps.mp4",badge:"Adventure RVs",titles:{en:BRAND+" \u2013 Adventure RVs"},descs:{en:"Adventure RVs designed for explorers \u2014 off-grid capable, rugged, and built for the journey."}},
  {video:V+"8996079/8996079-sd_640_360_30fps.mp4",badge:"Caravan Trailers",titles:{en:BRAND+" \u2013 Caravan Trailers"},descs:{en:"Caravan trailers offering comfortable mobile living \u2014 compact, efficient, and easy to tow."}},
  {video:V+"11745876/11745876-sd_640_360_30fps.mp4",badge:"Mobile Homes",titles:{en:BRAND+" \u2013 Mobile Homes"},descs:{en:"Mobile homes and manufactured housing providing affordable, comfortable living in communities nationwide."}},
  // === MOTORCYCLES & BICYCLES ===
  {video:V+"12165308/12165308-sd_640_360_30fps.mp4",badge:"Motorcycles",titles:{en:BRAND+" \u2013 Motorcycles, Scooters & Bicycles"},descs:{en:"Motorcycles, scooters, bicycles, car accessories, auto parts, tires, and wheels for every rider."}},
  // === FASHION ===
  {video:V+"8849053/8849053-sd_640_360_30fps.mp4",badge:"Men's Fashion",titles:{en:BRAND+" \u2013 Men's Fashion"},descs:{en:"Designer menswear, streetwear, sportswear, shoes, sneakers, wallets, and sunglasses from top brands."}},
  {video:V+"8516555/8516555-sd_360_640_30fps.mp4",badge:"Women's Fashion",titles:{en:BRAND+" \u2013 Women's Fashion"},descs:{en:"Women's clothing, luxury fashion, handbags, shoes, and accessories for every occasion and style."}},
  {video:V+"6173172/6173172-sd_640_360_25fps.mp4",badge:"Kids Fashion",titles:{en:BRAND+" \u2013 Kids Fashion & Baby Clothing"},descs:{en:"Kids fashion, baby clothing, and children's accessories \u2014 comfortable, stylish, and affordable."}},
  {video:V+"36976011/15665404_640_360_60fps.mp4",badge:"Shoes & Sneakers",titles:{en:BRAND+" \u2013 Shoes & Sneakers"},descs:{en:"Athletic shoes, designer heels, boots, sneakers, and footwear from leading global brands."}},
  {video:V+"8346818/8346818-sd_960_506_25fps.mp4",badge:"Jewelry & Watches",titles:{en:BRAND+" \u2013 Luxury Watches & Fine Jewelry"},descs:{en:"Gold jewelry, diamond jewelry, luxury watches, and certified authentic accessories."}},
  {video:V+"8453909/8453909-sd_506_960_25fps.mp4",badge:"Perfumes",titles:{en:BRAND+" \u2013 Perfumes & Fragrances"},descs:{en:"Luxury perfumes, colognes, and fragrances from the world's most prestigious houses."}},
  // === BEAUTY ===
  {video:V+"5084552/5084552-sd_960_506_24fps.mp4",badge:"Skincare & Cosmetics",titles:{en:BRAND+" \u2013 Skincare, Cosmetics & Makeup"},descs:{en:"Skincare, cosmetics, makeup, hair care, barber supplies, and beauty equipment for professionals."}},
  {video:V+"6802240/6802240-sd_640_360_30fps.mp4",badge:"Beauty & Spa",titles:{en:BRAND+" \u2013 Nail Products & Spa Essentials"},descs:{en:"Nail products, spa products, beauty equipment, and personal care for salons and home use."}},
  // === ELECTRONICS ===
  {video:V+"19001684/19001684-sd_640_360_30fps.mp4",badge:"Smartphones",titles:{en:BRAND+" \u2013 Smartphones & Mobile Phones"},descs:{en:"iPhone, Samsung Galaxy, Google Pixel, foldable phones, and the latest smartphone innovations."}},
  {video:V+"853987/853987-sd_640_360_25fps.mp4",badge:"Tablets",titles:{en:BRAND+" \u2013 Tablets & Smart Watches"},descs:{en:"Tablets, smart watches, and wearable technology from Apple, Samsung, and leading brands."}},
  {video:V+"38493702/16347971_640_360_25fps.mp4",badge:"Gaming Laptops",titles:{en:BRAND+" \u2013 Gaming & Business Laptops"},descs:{en:"Gaming laptops, business laptops, desktop computers, and high-performance workstations."}},
  {video:V+"853935/853935-sd_640_360_25fps.mp4",badge:"Smart TVs",titles:{en:BRAND+" \u2013 Smart TVs & Projectors"},descs:{en:"Smart TVs, projectors, home theater systems, and entertainment displays in every size."}},
  {video:V+"7942902/7942902-sd_960_506_25fps.mp4",badge:"Gaming",titles:{en:BRAND+" \u2013 Gaming Consoles & VR"},descs:{en:"Gaming consoles, VR headsets, AI devices, gaming accessories, and the future of interactive entertainment."}},
  {video:V+"12985798/12985798-sd_640_360_24fps.mp4",badge:"Cameras & Drones",titles:{en:BRAND+" \u2013 Cameras, Drones & Headphones"},descs:{en:"Professional cameras, drones, headphones, Bluetooth speakers, and smart home devices."}},
  {video:V+"4318552/4318552-sd_640_360_30fps.mp4",badge:"Smart Home",titles:{en:BRAND+" \u2013 Smart Home & AI Devices"},descs:{en:"Smart home devices, AI-powered gadgets, networking equipment, and connected living solutions."}},
  // === HOME & LIVING ===
  {video:V+"4193136/4193136-sd_640_360_24fps.mp4",badge:"Furniture",titles:{en:BRAND+" \u2013 Luxury Furniture & Home Decor"},descs:{en:"Luxury furniture, home decor, lighting, curtains, bedding, mattresses, and storage solutions."}},
  {video:V+"4124932/4124932-sd_640_360_25fps.mp4",badge:"Kitchen",titles:{en:BRAND+" \u2013 Kitchen Appliances & Cookware"},descs:{en:"Kitchen appliances, cookware, dining sets, and smart kitchen products for modern living."}},
  {video:V+"6862869/6862869-sd_960_506_25fps.mp4",badge:"Home Appliances",titles:{en:BRAND+" \u2013 Home Appliances & Smart Living"},descs:{en:"Home appliances, smart home products, and everyday essentials for comfortable modern living."}},
  // === FOOD & GROCERY ===
  {video:V+"2081576/2081576-sd_640_360_30fps.mp4",badge:"Supermarkets",titles:{en:BRAND+" \u2013 Supermarkets & Food Markets"},descs:{en:"Supermarkets, food markets, fresh fruits, fresh vegetables, organic food, and everyday groceries."}},
  {video:V+"6420982/6420982-sd_506_960_30fps.mp4",badge:"Fresh Food",titles:{en:BRAND+" \u2013 Fresh Food & Beverages"},descs:{en:"Seafood, meat products, bakery, dairy, coffee, tea, beverages, and international cuisine."}},
  {video:V+"10619422/10619422-sd_360_640_30fps.mp4",badge:"Restaurants",titles:{en:BRAND+" \u2013 Restaurants & Fast Food"},descs:{en:"Restaurants, fast food, international cuisine, and dining experiences from around the world."}},
  // === HEALTH ===
  {video:V+"31059637/13273873_360_640_30fps.mp4",badge:"Health & Wellness",titles:{en:BRAND+" \u2013 Health & Wellness"},descs:{en:"Hospitals, pharmacies, medical equipment, vitamins, supplements, dental care, and vision care."}},
  {video:V+"38222402/16227493_640_360_30fps.mp4",badge:"Personal Care",titles:{en:BRAND+" \u2013 Wellness & Personal Care"},descs:{en:"Wellness products, personal care, health supplements, and medical supplies for everyday needs."}},
  // === SPORTS & FITNESS ===
  {video:V+"15436958/15436958-sd_636_360_30fps.mp4",badge:"Sports & Fitness",titles:{en:BRAND+" \u2013 Sports & Fitness"},descs:{en:"Gym equipment, home gym, sportswear, running gear, and fitness accessories for every athlete."}},
  {video:V+"1340880/1340880-sd_636_360_16fps.mp4",badge:"Team Sports",titles:{en:BRAND+" \u2013 Football, Basketball & Tennis"},descs:{en:"Football, basketball, tennis, golf, cycling, and team sports equipment for all levels."}},
  {video:V+"29852984/12819165_640_360_30fps.mp4",badge:"Outdoor",titles:{en:BRAND+" \u2013 Cycling & Outdoor Adventure"},descs:{en:"Cycling gear, camping equipment, outdoor adventure supplies, and sporting goods for explorers."}},
  // === BABY & KIDS ===
  {video:V+"3875308/3875308-sd_640_360_25fps.mp4",badge:"Baby & Kids",titles:{en:BRAND+" \u2013 Baby Clothing & Toys"},descs:{en:"Baby clothing, baby toys, baby food, strollers, car seats, and educational toys for little ones."}},
  {video:V+"4586690/4586690-sd_640_360_25fps.mp4",badge:"School Supplies",titles:{en:BRAND+" \u2013 Educational Toys & School Supplies"},descs:{en:"Educational toys, school supplies, kids' books, and learning materials for growing minds."}},
  // === PETS ===
  {video:V+"6568934/6568934-sd_960_506_25fps.mp4",badge:"Pet Supplies",titles:{en:BRAND+" \u2013 Dogs, Cats & Pet Care"},descs:{en:"Dog and cat supplies, pet food, pet toys, pet accessories, and veterinary supplies."}},
  {video:V+"6846022/6846022-sd_360_640_25fps.mp4",badge:"Pet World",titles:{en:BRAND+" \u2013 Birds, Fish & All Pets"},descs:{en:"Birds, fish, reptiles, small pets, aquariums, and everything for your animal companions."}},
  // === AGRICULTURE ===
  {video:V+"15959637/15959637-sd_640_360_30fps.mp4",badge:"Agriculture",titles:{en:BRAND+" \u2013 Agriculture"},descs:{en:"Tractors, farm equipment, irrigation systems, seeds, fertilizers, livestock, and greenhouses."}},
  // === INDUSTRIAL ===
  {video:V+"32244801/13751979_640_360_50fps.mp4",badge:"Construction",titles:{en:BRAND+" \u2013 Construction Equipment & Heavy Machinery"},descs:{en:"Heavy machinery, generators, power tools, manufacturing equipment, and safety gear for industry."}},
  {video:V+"11649490/11649490-sd_640_360_24fps.mp4",badge:"Industrial",titles:{en:BRAND+" \u2013 Industrial Equipment & Safety"},descs:{en:"Industrial equipment, manufacturing tools, safety equipment, and professional-grade machinery."}},
  // === OFFICE & BUSINESS ===
  {video:V+"36489218/15472805_360_640_50fps.mp4",badge:"Office & Business",titles:{en:BRAND+" \u2013 Office Furniture & Business Supplies"},descs:{en:"Office furniture, office supplies, printers, networking equipment, business software, and POS systems."}},
  // === ENTERTAINMENT ===
  {video:V+"7313656/7313656-sd_960_506_25fps.mp4",badge:"Entertainment",titles:{en:BRAND+" \u2013 Movies, Music & Books"},descs:{en:"Movies, music, books, musical instruments, video games, and streaming services for entertainment."}},
  {video:V+"6695082/6695082-sd_640_360_30fps.mp4",badge:"Musical Instruments",titles:{en:BRAND+" \u2013 Musical Instruments & Streaming"},descs:{en:"Musical instruments, audio equipment, streaming services, and creative tools for artists."}},
  // === TRAVEL ===
  {video:V+"8865814/8865814-sd_960_506_25fps.mp4",badge:"Travel & Tourism",titles:{en:BRAND+" \u2013 Travel & Tourism"},descs:{en:"Flights, hotels, resorts, cruises, car rentals, tour packages, and adventure tourism worldwide."}},
  {video:V+"4254064/4254064-sd_506_960_25fps.mp4",badge:"Adventure Travel",titles:{en:BRAND+" \u2013 Adventure Tourism & Travel Insurance"},descs:{en:"Adventure tourism, travel insurance, vacation packages, and unforgettable experiences across the globe."}},
  // === FINANCIAL SERVICES ===
  {video:V+"8174193/8174193-sd_640_360_25fps.mp4",badge:"Financial Services",titles:{en:BRAND+" \u2013 Secure Payments & Digital Wallets"},descs:{en:"Secure payments, digital wallets, international payments, currency exchange, and business banking."}},
  // === MARKETPLACE SERVICES ===
  {video:V+"8127822/8127822-sd_640_360_25fps.mp4",badge:"Verified Sellers",titles:{en:BRAND+" \u2013 Verified Sellers & Buyer Protection"},descs:{en:"Verified sellers, buyer protection, secure checkout, global shipping, and real-time order tracking."}},
  {video:V+"7668013/7668013-sd_640_360_25fps.mp4",badge:"Membership",titles:{en:BRAND+" \u2013 Gift Cards & Membership Benefits"},descs:{en:"Gift cards, membership benefits, flash sales, seasonal promotions, new arrivals, and best sellers."}},
  {video:V+"4495927/4495927-sd_640_360_25fps.mp4",badge:"Flash Sales",titles:{en:BRAND+" \u2013 Flash Sales & Featured Collections"},descs:{en:"Flash sales, seasonal promotions, featured collections, new arrivals, and best-selling products."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.07_PM_(2).jpeg",badge:"Premium Showroom",titles:{en:BRAND+" \u2013 Premium Showroom Experience"},descs:{en:"Step into our premium showroom featuring the world's finest vehicles in a luxury retail environment."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.08_PM_(1).jpeg",badge:"Luxury Collection",titles:{en:BRAND+" \u2013 Luxury Vehicle Collection"},descs:{en:"Discover an exclusive collection of luxury vehicles from the world's most prestigious manufacturers."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.08_PM.jpeg",badge:"Performance Cars",titles:{en:BRAND+" \u2013 Performance & Sports Cars"},descs:{en:"High-performance sports cars engineered for speed, precision, and adrenaline on every road."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.09_PM_(1).jpeg",badge:"Electric Vehicles",titles:{en:BRAND+" \u2013 Electric & Hybrid Vehicles"},descs:{en:"Next-generation electric and hybrid vehicles combining sustainability with cutting-edge technology."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.09_PM_(2).jpeg",badge:"SUV Showcase",titles:{en:BRAND+" \u2013 Premium SUV Showcase"},descs:{en:"Versatile premium SUVs offering power, comfort, and safety for every terrain and lifestyle."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.09_PM.jpeg",badge:"Classic Cars",titles:{en:BRAND+" \u2013 Classic & Vintage Cars"},descs:{en:"Timeless classic and vintage automobiles restored to perfection for discerning collectors."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.10_PM_(1).jpeg",badge:"Commercial Fleet",titles:{en:BRAND+" \u2013 Commercial Fleet Solutions"},descs:{en:"Reliable commercial fleet vehicles for businesses seeking performance, durability, and value."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.10_PM_(2).jpeg",badge:"Off-Road Vehicles",titles:{en:BRAND+" \u2013 Off-Road & Adventure Vehicles"},descs:{en:"Rugged off-road vehicles built to conquer any terrain with confidence and capability."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.10_PM.jpeg",badge:"City Cars",titles:{en:BRAND+" \u2013 Compact City Cars"},descs:{en:"Stylish and efficient compact city cars designed for urban living and easy parking."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.11_PM_(1).jpeg",badge:"Luxury Sedans",titles:{en:BRAND+" \u2013 Executive Luxury Sedans"},descs:{en:"Executive luxury sedans blending refined comfort, advanced technology, and sophisticated design."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.11_PM.jpeg",badge:"Convertible Cars",titles:{en:BRAND+" \u2013 Convertible & Roadster"},descs:{en:"Open-top convertibles and roadsters for those who crave freedom and the thrill of open-air driving."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.12_PM_(1).jpeg",badge:"Pickup Trucks",titles:{en:BRAND+" \u2013 Heavy-Duty Pickup Trucks"},descs:{en:"Powerful pickup trucks with best-in-class towing, payload, and off-road capability."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.12_PM.jpeg",badge:"Family Minivans",titles:{en:BRAND+" \u2013 Family Minivans & MPVs"},descs:{en:"Spacious family minivans and MPVs with premium seating, entertainment, and safety features."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.13_PM.jpeg",badge:"Auto Accessories",titles:{en:BRAND+" \u2013 Auto Parts & Accessories"},descs:{en:"Genuine auto parts and premium accessories to customize, upgrade, and maintain your vehicle."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.14_PM_(1).jpeg",badge:"Motorcycle Showcase",titles:{en:BRAND+" \u2013 Motorcycles & Two-Wheelers"},descs:{en:"Premium motorcycles and two-wheelers for every rider from street to track to trail."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.14_PM.jpeg",badge:"Marine Vehicles",titles:{en:BRAND+" \u2013 Boats & Marine Vehicles"},descs:{en:"Luxury boats, yachts, and marine vehicles for life on the water with style and performance."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.15_PM_(1).jpeg",badge:"Aviation Showcase",titles:{en:BRAND+" \u2013 Aircraft & Aviation"},descs:{en:"Private aircraft and aviation solutions for those who travel above and beyond."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.15_PM.jpeg",badge:"Concept Cars",titles:{en:BRAND+" \u2013 Concept & Future Vehicles"},descs:{en:"Visionary concept cars and future mobility solutions pushing the boundaries of design."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.16_PM.jpeg",badge:"Auto Financing",titles:{en:BRAND+" \u2013 Auto Finance & Leasing"},descs:{en:"Flexible auto financing and leasing options designed to get you behind the wheel sooner."}},
  {image:"/videos/WhatsApp_Image_2026-07-24_at_3.51.17_PM_(1).jpeg",badge:"Global Auto Trade",titles:{en:BRAND+" \u2013 Global Auto Trade & Export"},descs:{en:"Seamless global auto trade and export services connecting buyers and sellers across continents."}},
];

// ---- STATE ----
let currentSlide = 0, carouselTimer = null, currentLang = "en", currentCountry = "US";
let voiceRecognition = null, isListening = false;
let liveAdSlides = [];
let activeCarouselSlides = CAROUSEL_SLIDES;

function mergeLiveAds(){
  const seen=new Set();
  const live=(window._liveAdSlides||liveAdSlides).filter(s=>{
    const key=s.video||s.image||(s.images&&s.images[0])||s.listingId;
    if(!key||seen.has(key))return false;
    seen.add(key);return true;
  });
  activeCarouselSlides=[...live,...CAROUSEL_SLIDES];
}

// ---- INIT: Populate Selectors ----
function populateSelectors(){
  const cs=document.getElementById("country"),ls=document.getElementById("language");
  COUNTRIES.forEach(c=>{const o=document.createElement("option");o.value=c.code;o.textContent=c.name;cs.appendChild(o)});
  LANGUAGES.forEach(l=>{const o=document.createElement("option");o.value=l.code;o.textContent=l.name;ls.appendChild(o)});
}

// ---- INIT: Render Categories ----
function renderCategories(){
  const c=document.getElementById("category-list");c.innerHTML="";
  CATEGORIES.forEach((cat,idx)=>{
    const a=document.createElement("a");a.href="#";a.dataset.category=cat.name;a.dataset.color=cat.color;
    a.onclick=(e)=>{e.preventDefault();filterByCategory(cat.name,a)};
    const active=idx===0;
    const col=CAT_COLORS[cat.color]||CAT_COLORS.orange;
    const iconWrapClass=active
      ?"cat-icon-wrap p-2.5 rounded-xl border bg-gradient-to-br "+col.bg+" "+col.to+" "+col.border+" shadow-["+col.glow+"]"
      :"cat-icon-wrap p-2.5 rounded-xl border bg-gray-900/80 border-gray-800 group-hover:bg-gray-800 group-hover:"+col.hoverBorder+" group-hover:shadow-[0_4px_14px_rgba(0,0,0,0.3)]";
    a.className="cat-item flex flex-col items-center gap-1.5 transition-all duration-300 group shrink-0 "+(active?"active "+col.text:"text-gray-400 hover:"+col.text);
    a.innerHTML='<div class="'+iconWrapClass+'"><i data-lucide="'+cat.icon+'" class="w-5 h-5"></i></div><span class="text-[11px] font-semibold tracking-wide whitespace-nowrap">'+cat.name+"</span>";
    c.appendChild(a);
  });
  lucide.createIcons();
}

let _activeCategory="All";
function filterByCategory(name,el){
  _activeCategory=name;
  document.querySelectorAll("#category-list a").forEach(a=>{
    a.classList.remove("active");a.classList.add("text-gray-400");
    a.classList.remove("text-orange-400","text-pink-400","text-blue-400","text-amber-400","text-emerald-400","text-lime-400","text-cyan-400","text-sky-400","text-red-400","text-violet-400","text-indigo-400","text-teal-400","text-rose-400","text-fuchsia-400","text-slate-300","text-green-400","text-yellow-400","text-amber-600","text-purple-400","text-gray-400");
    const b=a.querySelector("div");
    b.className="cat-icon-wrap p-2.5 rounded-xl border bg-gray-900/80 border-gray-800 transition-all duration-300";
    b.style.boxShadow="";
  });
  const col=CAT_COLORS[el.dataset.color]||CAT_COLORS.orange;
  el.classList.remove("text-gray-400");el.classList.add("active",col.text);
  const b=el.querySelector("div");
  b.className="cat-icon-wrap p-2.5 rounded-xl border bg-gradient-to-br "+col.bg+" "+col.to+" "+col.border+" transition-all duration-300";
  b.style.boxShadow=col.glow;
  closeSearchResults();
  if(name==="All"){if(window._clearShowroomFilter)window._clearShowroomFilter();}
  else if(window._filterShowroomByCategory){window._filterShowroomByCategory(name);}
  showToast("Exploring: "+name);
}

// ---- SMART SEARCH ----
let _suggToken=0;
function setupSearchSuggestions(){
  const inp=document.getElementById("search-input"),dd=document.getElementById("search-suggestions");
  inp.addEventListener("input",()=>{
    const q=inp.value.trim();if(q.length<1){dd.classList.add("hidden");return}
    const myToken=++_suggToken;
    if(window._getLiveSuggestions){
      window._getLiveSuggestions(q,8).then(function(results){
        if(myToken!==_suggToken)return;
        if(!results||results.length===0){
          const m=SEARCH_SUGGESTIONS.filter(s=>s.toLowerCase().includes(q.toLowerCase())).slice(0,8);
          if(!m.length){dd.classList.add("hidden");return}
          renderSuggestionDropdown(dd,m.map(function(s){return{title:s,category:""}}));
          return;
        }
        renderSuggestionDropdown(dd,results);
      }).catch(function(){
        if(myToken!==_suggToken)return;
        const m=SEARCH_SUGGESTIONS.filter(s=>s.toLowerCase().includes(q.toLowerCase())).slice(0,8);
        if(m.length)renderSuggestionDropdown(dd,m.map(function(s){return{title:s,category:""}}));
        else dd.classList.add("hidden");
      });
    } else {
      const m=SEARCH_SUGGESTIONS.filter(s=>s.toLowerCase().includes(q.toLowerCase())).slice(0,8);
      if(!m.length){dd.classList.add("hidden");return}
      renderSuggestionDropdown(dd,m.map(function(s){return{title:s,category:""}}));
    }
  });
  inp.addEventListener("blur",()=>setTimeout(()=>dd.classList.add("hidden"),200));
  inp.addEventListener("focus",()=>{if(inp.value.trim().length>0)inp.dispatchEvent(new Event("input"))});
}
function renderSuggestionDropdown(dd,results){
  dd.innerHTML=results.map(function(r){
    const t=escapeHtmlAttr(r.title||"");
    const c=r.category?escapeHtmlAttr(r.category):"";
    const thumb=r.thumbnail?'<img src="'+escapeHtmlAttr(r.thumbnail)+'" class="w-8 h-8 rounded object-cover shrink-0" onerror="this.style.display=\'none\'">':'<div class="w-8 h-8 rounded bg-gray-800 flex items-center justify-center shrink-0"><i data-lucide="package" class="w-4 h-4 text-gray-600"></i></div>';
    const price=r.price!=null?'<span class="text-xs font-bold text-orange-400 ml-auto">'+(r.currency||"USD")+" "+Number(r.price).toLocaleString()+"</span>":"";
    return '<button onclick="selectSuggestion(\''+t.replace(/'/g,"\\'")+'\')" class="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-500 transition flex items-center gap-2.5 border-b border-gray-800/50 last:border-0">'+thumb+'<div class="flex-1 min-w-0"><p class="truncate font-medium">'+t+"</p>"+(c?'<p class="text-[10px] text-gray-500 truncate">'+c+"</p>":"")+"</div>"+price+"</button>";
  }).join("");
  lucide.createIcons();dd.classList.remove("hidden");
}
function selectSuggestion(t){document.getElementById("search-input").value=t;document.getElementById("search-suggestions").classList.add("hidden");executeSearch()}

let _searching=false;
let _searchToken=0;
function executeSearch(){
  const q=document.getElementById("search-input").value.trim();
  if(!q)return;
  if(typeof gtag!=='undefined')gtag('event','search',{search_term:q});
  document.getElementById("search-suggestions").classList.add("hidden");
  if(_searching)return;
  _searching=true;
  const myToken=++_searchToken;
  showToast("Searching: "+q);
  showSearchResultsLoading(q);
  if(window._smartSearch){
    let marketplaceRendered=false;
    window._smartSearch(q,30,function(partialResults,meta){
      if(myToken!==_searchToken)return;
      if(!marketplaceRendered&&partialResults&&partialResults.length>0){
        marketplaceRendered=true;
        renderSearchResults(q,partialResults,meta);
      } else if(marketplaceRendered&&partialResults){
        renderSearchResults(q,partialResults,meta);
      }
    }).then(function(res){
      _searching=false;
      if(myToken!==_searchToken)return;
      if(window._saveRecentSearch)window._saveRecentSearch(q);
      renderSearchResults(q,res.results||[],res);
    }).catch(function(){
      _searching=false;
      if(myToken!==_searchToken)return;
      renderSearchResults(q,[]);
    });
  } else {
    _searching=false;if(myToken===_searchToken)renderSearchResults(q,[]);
  }
}

function showSearchResultsLoading(q){
  let panel=document.getElementById("search-results-overlay");
  if(!panel){
    panel=document.createElement("div");
    panel.id="search-results-overlay";
    panel.className="fixed inset-0 z-[55] bg-black/85 backdrop-blur-sm overflow-y-auto";
    document.body.appendChild(panel);
  }
  let skeletonHtml='<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">';
  for(let i=0;i<12;i++){
    skeletonHtml+=`<div class="bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden"><div class="aspect-square bg-gray-900 animate-pulse"></div><div class="p-2.5 space-y-2"><div class="h-3 bg-gray-800 rounded animate-pulse"></div><div class="h-2 bg-gray-800 rounded w-2/3 animate-pulse"></div><div class="h-3 bg-gray-800 rounded w-1/3 animate-pulse"></div></div></div>`;
  }
  skeletonHtml+='</div>';
  panel.innerHTML=`<div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6"><div class="flex items-center justify-between mb-6"><div class="flex items-center gap-3"><i data-lucide="search" class="w-5 h-5 text-orange-400"></i><h3 class="text-lg font-bold text-white">Searching for "${escapeHtmlAttr(q)}"</h3></div><button onclick="closeSearchResults()" class="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition"><i data-lucide="x" class="w-5 h-5"></i></button></div>${skeletonHtml}</div>`;
  panel.style.display="block";
  document.body.style.overflow="hidden";
  if(window.lucide)lucide.createIcons();
}

function renderSearchResults(query,results,meta){
  let panel=document.getElementById("search-results-overlay");
  if(!panel){
    panel=document.createElement("div");
    panel.id="search-results-overlay";
    panel.className="fixed inset-0 z-[55] bg-black/85 backdrop-blur-sm overflow-y-auto";
    document.body.appendChild(panel);
  }
  const hasResults=results&&results.length>0;
  const safeQuery=escapeHtmlAttr(query);
  const isPartial=meta&&meta.supplierCount===0&&meta.marketplaceCount>0&&!meta._final;
  let html=`<div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-6">`;
  html+=`<div class="flex items-center justify-between mb-6"><div class="flex items-center gap-3"><i data-lucide="search" class="w-5 h-5 text-orange-400"></i><h3 class="text-lg font-bold text-white">`;
  if(hasResults){html+=`${results.length} result${results.length>1?"s":""} for "${safeQuery}"`}
  else{html+=`No results for "${safeQuery}"`}
  if(isPartial){html+=` <span class="text-xs text-gray-500 font-normal flex items-center gap-1"><i data-lucide="loader-2" class="w-3 h-3 animate-spin"></i> checking suppliers...</span>`}
  html+=`</h3></div><button onclick="closeSearchResults()" class="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition"><i data-lucide="x" class="w-5 h-5"></i></button></div>`;
  if(hasResults){
    html+=`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">`;
    results.forEach(function(r){
      const img=r.thumbnail||(Array.isArray(r.images)&&r.images.length>0?r.images[0]:"");
      const price=r.price!=null?(r.currency||"USD")+" "+Number(r.price).toLocaleString():"";
      const isSpecial=r.is_special_order||r.entity_type==="special_order";
      const typeBadge=isSpecial?`<span class="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-orange-500/80 text-white border border-orange-400 z-10">Special Order</span>`:(r.entity_type?`<span class="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-black/70 text-orange-400 border border-orange-500/30 z-10">${escapeHtmlAttr(r.entity_type)}</span>`:"");
      const imgHtml=img?`<img src="${escapeHtmlAttr(img)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" onerror="this.style.display='none'">`:`<div class="w-full h-full flex items-center justify-center"><i data-lucide="package" class="w-10 h-10 text-gray-700"></i></div>`;
      const deliveryInfo=isSpecial&&r.estimated_delivery_days?`<p class="text-[10px] text-gray-500 flex items-center gap-1"><i data-lucide="truck" class="w-3 h-3"></i>${r.estimated_delivery_days} days delivery</p>`:"";
      const brandText=r.brand?`<p class="text-[10px] text-gray-500 truncate">${escapeHtmlAttr(r.brand)}</p>`:"";
      const clickAction=isSpecial?`openSpecialOrderFromSearch('${escapeHtmlAttr(r.title||"").replace(/'/g,"\\'")}','${escapeHtmlAttr(r.brand||"").replace(/'/g,"\\'")}','${escapeHtmlAttr(r.category||"").replace(/'/g,"\\'")}',${r.price||0},'${escapeHtmlAttr(r.currency||"USD").replace(/'/g,"\\'")}')`:`openProductFromSearch('${escapeHtmlAttr(r.property_id||"").replace(/'/g,"\\'")}')`;
      html+=`<div class="group relative bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer" onclick="${clickAction}">${typeBadge}<div class="aspect-square bg-gray-900 overflow-hidden">${imgHtml}</div><div class="p-2.5"><p class="text-xs font-bold text-white truncate mb-1">${escapeHtmlAttr(r.title||"Untitled")}</p>${brandText}${r.category?`<p class="text-[10px] text-gray-500 truncate mb-1">${escapeHtmlAttr(r.category)}</p>`:""}${price?`<p class="text-xs font-bold text-orange-400">${price}</p>`:""}${deliveryInfo}</div></div>`;
    });
    html+=`</div>`;
  } else {
    const popularHtml=(window.SEARCH_SUGGESTIONS||SEARCH_SUGGESTIONS||[]).slice(0,6).map(function(s){
      return `<button onclick="document.getElementById('search-input').value='${s.replace(/'/g,"\\'")}';executeSearch()" class="text-[11px] bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full border border-gray-700 transition">${s}</button>`;
    }).join("");
    html+=`<div class="max-w-2xl mx-auto"><div class="glass border border-orange-500/20 rounded-2xl p-6 sm:p-8 text-center">`;
    html+=`<div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 mb-4"><i data-lucide="package-search" class="w-8 h-8 text-orange-400"></i></div>`;
    html+=`<h4 class="text-lg font-bold text-white mb-2">We couldn't find this item in our current marketplace</h4>`;
    html+=`<p class="text-sm text-gray-400 mb-5 leading-relaxed">But you can place a <span class="text-orange-400 font-bold">Special Order</span> and we will source it for you. Our team will review your request, find the best supplier, and get back to you with a quote.</p>`;
    html+=`<div class="flex flex-col sm:flex-row gap-3 justify-center">`;
    html+=`<button onclick="openSpecialOrderModal('${safeQuery.replace(/'/g,"\\'")}')" class="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold rounded-xl text-sm uppercase tracking-wide transition shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"><i data-lucide="package-plus" class="w-4 h-4"></i> Request Product</button>`;
    html+=`<button onclick="closeSearchResults()" class="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl text-sm uppercase tracking-wide transition">Browse Marketplace</button>`;
    html+=`</div>`;
    html+=`<div class="mt-6 pt-6 border-t border-gray-800"><p class="text-xs text-gray-500 mb-3">Popular searches you might like:</p><div class="flex flex-wrap gap-2 justify-center">${popularHtml}</div></div>`;
    html+=`</div></div>`;
  }
  html+=`</div>`;
  panel.innerHTML=html;
  panel.style.display="block";
  document.body.style.overflow="hidden";
  if(window.lucide)lucide.createIcons();
}

function closeSearchResults(){
  const panel=document.getElementById("search-results-overlay");
  if(panel)panel.style.display="none";
  document.body.style.overflow="";
}

function escapeHtmlAttr(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

window.closeSearchResults=closeSearchResults;
window.executeSearch=executeSearch;
window.selectSuggestion=selectSuggestion;
window.openSpecialOrderFromSearch=function(title,brand,category,price,currency){
  closeSearchResults();
  if(window._openSpecialOrderFromSearch)window._openSpecialOrderFromSearch(title,brand,category,price,currency);
  else if(window.openSpecialOrderModal)window.openSpecialOrderModal(title);
};
window.openProductFromSearch=function(propertyId){
  closeSearchResults();
  if(propertyId)window.location.href="/details.html?id="+encodeURIComponent(propertyId);
  else showToast("Product not available");
};

// ---- VOICE SEARCH ----
function toggleVoiceSearch(){
  const btn=document.getElementById("voice-search-btn"),icon=document.getElementById("voice-icon");
  if(window._toggleVoiceSearch){
    const result=window._toggleVoiceSearch(
      (transcript)=>{document.getElementById("search-input").value=transcript},
      (listening)=>{
        if(listening){btn.classList.add("voice-listening","text-orange-500");icon.setAttribute("data-lucide","mic-off");lucide.createIcons();showToast("Listening...")}
        else{btn.classList.remove("voice-listening","text-orange-500");icon.setAttribute("data-lucide","mic");lucide.createIcons();const q=document.getElementById("search-input").value.trim();if(q)executeSearch()}
      }
    );
    if(!result.supported){showToast("Voice search not supported")}
    return;
  }
  // Fallback to old implementation
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){showToast("Voice search not supported");return}
  if(isListening){voiceRecognition.stop();return}
  voiceRecognition=new SR();voiceRecognition.continuous=false;voiceRecognition.interimResults=true;
  voiceRecognition.lang="en-US";
  voiceRecognition.onstart=()=>{isListening=true;btn.classList.add("voice-listening","text-orange-500");icon.setAttribute("data-lucide","mic-off");lucide.createIcons();showToast("Listening...")};
  voiceRecognition.onresult=(e)=>{let t="";for(let i=0;i<e.results.length;i++)t+=e.results[i][0].transcript;document.getElementById("search-input").value=t};
  voiceRecognition.onerror=()=>showToast("Voice error. Try again.");
  voiceRecognition.onend=()=>{isListening=false;btn.classList.remove("voice-listening","text-orange-500");icon.setAttribute("data-lucide","mic");lucide.createIcons();const q=document.getElementById("search-input").value.trim();if(q)executeSearch()};
  voiceRecognition.start();
}

// ---- CAMERA SEARCH ----
function handleCameraSearch(e){
  const f=e.target.files[0];if(!f)return;
  if(!f.type.startsWith("image/")){showToast("Please select an image");return}
  const r=new FileReader();r.onload=(ev)=>{
    showToast("Photo received! Matching catalog...");
    document.getElementById("search-input").value="Photo: "+f.name.replace(/\.[^.]+$/,"");
    const dd=document.getElementById("search-suggestions");
    dd.innerHTML='<div class="p-4"><div class="flex items-center gap-3 mb-2"><img src="'+ev.target.result+'" class="w-16 h-16 rounded-lg object-cover border border-gray-700"><div><p class="text-sm text-gray-200 font-semibold">Image uploaded</p><p class="text-xs text-gray-500">Scanning visual catalog...</p></div></div><div class="flex gap-2 flex-wrap mt-2">'+SEARCH_SUGGESTIONS.slice(0,4).map(s=>'<span class="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-1 rounded-full border border-orange-500/20">'+s+"</span>").join("")+"</div></div>";
    dd.classList.remove("hidden");lucide.createIcons();setTimeout(()=>dd.classList.add("hidden"),4000);
  };r.readAsDataURL(f);e.target.value="";
}

// ---- HERO VIDEO CAROUSEL ----
function renderCarousel(){
  mergeLiveAds();
  const slides=activeCarouselSlides;
  const sc=document.getElementById("carousel-slides");
  sc.innerHTML="";
  slides.forEach((slide,idx)=>{
    const el=document.createElement("div");
    el.className="carousel-slide "+(idx===0?"active-slide":"hidden-slide");
    el.id="slide-"+idx;
    var mediaHtml;
    if(slide.images&&slide.images.length>0){
      var kbClass="kb-"+(((idx%5))+1);
      var imgHtml=slide.images.map(function(u,i){return '<div class="ad-slideshow-img '+kbClass+'" data-src="'+u+'" style="position:absolute;inset:0;width:100%;height:100%;background-image:url(\''+u+'\');background-size:cover;background-position:center;opacity:'+(i===0?'1':'0')+';transition:opacity 1.5s ease-in-out"></div>';}).join('');
      mediaHtml='<div class="ad-slideshow" data-interval="4000" style="position:absolute;inset:0;width:100%;height:100%;overflow:hidden">'+imgHtml+'</div>';
    }else if(slide.image){
      var kbClass2="kb-"+(((idx%5))+1);
      mediaHtml='<div class="kb-img '+kbClass2+'" style="background-image:url(\''+slide.image+'\')"></div>';
    }else{
      mediaHtml='<video class="hero-video" muted loop playsinline webkit-playsinline preload="'+(idx<5?"auto":"metadata")+'" data-src="'+slide.video+'" style="width:100%;height:100%">'+
      (idx<5?'<source src="'+slide.video+'" type="video/mp4">':"")+
      '</video>';
    }
    el.innerHTML=mediaHtml+
      '<div class="absolute inset-0 z-10 flex flex-col justify-end items-center text-center p-6 sm:p-10 pb-16">'+
      '<span class="inline-block bg-orange-500 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 fade-in-up delay-1">'+slide.badge+'</span>'+
      '<h2 id="slide-title-'+idx+'" class="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3 drop-shadow-2xl fade-in-up delay-2"></h2>'+
      '<button onclick="showToast(\'Opening '+slide.badge+'...\')" class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-lg text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-orange-500/30 hover:scale-105 fade-in-up delay-3" id="slide-cta-'+idx+'"></button>'+
      '</div>';
    sc.appendChild(el);
  });
  updateCarouselLanguage();startCarouselTimer();playActiveVideo();retriggerLiveBadge();
}

function updateCarouselLanguage(){
  const copy=AD_COPY[currentLang]||AD_COPY.en;
  activeCarouselSlides.forEach((slide,idx)=>{
    const t=document.getElementById("slide-title-"+idx);
    const c=document.getElementById("slide-cta-"+idx);
    if(t)t.textContent=slide.titles[currentLang]||slide.titles.en;
    if(c)c.textContent=copy.shopNow;
  });
  updateBadgeLanguage();
}

window.addEventListener('live-ads-updated', (e) => {
  liveAdSlides = e.detail || [];
  mergeLiveAds();
  renderCarousel();
});

function initLiveAds(){
  if(window._loadLiveAds){
    window._loadLiveAds().then(slides => { liveAdSlides=slides||[]; mergeLiveAds(); renderCarousel(); });
    window._subscribeLiveAds && window._subscribeLiveAds();
  }
}

function updateBadgeLanguage(){
  const copy=AD_COPY[currentLang]||AD_COPY.en;
  const bm={worldwide:{t:copy.worldwide,s:copy.worldwideSub},delivery:{t:copy.delivery,s:copy.deliverySub},secure:{t:copy.secure,s:copy.secureSub},support:{t:copy.support,s:copy.supportSub}};
  document.querySelectorAll("[data-badge]").forEach(el=>{const k=el.getAttribute("data-badge");if(bm[k])el.textContent=bm[k].t});
  document.querySelectorAll("[data-badge-sub]").forEach(el=>{const k=el.getAttribute("data-badge-sub");if(bm[k]){let s=bm[k].s;const c=COUNTRIES.find(c=>c.code===currentCountry);if(k==="worldwide"&&c)s="Shipping to "+c.name;el.textContent=s}});
}

function goToSlide(idx){
  const slides=document.querySelectorAll(".carousel-slide");
  slides.forEach(s=>{s.classList.remove("active-slide");s.classList.add("hidden-slide")});
  const sl=document.getElementById("slide-"+idx);
  if(sl){sl.classList.remove("hidden-slide");sl.classList.add("active-slide")}
  currentSlide=idx;resetCarouselTimer();playActiveVideo();retriggerLiveBadge();
}
function retriggerLiveBadge(){
  const b=document.getElementById('live-ad-badge');
  if(!b)return;
  b.classList.remove('live-badge-in');
  void b.offsetWidth;
  b.classList.add('live-badge-in');
}

function playActiveVideo(){
  // Pause hidden videos
  const others=document.querySelectorAll(".carousel-slide.hidden-slide video");
  others.forEach(v=>{v.pause()});
  // Stop hidden slideshows
  document.querySelectorAll(".carousel-slide.hidden-slide .ad-slideshow").forEach(function(s){if(s._timer){clearInterval(s._timer);s._timer=null}});
  // Play active video
  const active=document.querySelector(".carousel-slide.active-slide video");
  if(active){
    if(!active.querySelector("source")){
      const src=document.createElement("source");
      src.src=active.getAttribute("data-src");src.type="video/mp4";
      active.appendChild(src);active.load();
    }
    active.currentTime=0;active.play().catch(()=>{});
  }
  // Start active slideshow
  const activeSS=document.querySelector(".carousel-slide.active-slide .ad-slideshow");
  if(activeSS&&!activeSS._timer){
    var imgs=activeSS.querySelectorAll(".ad-slideshow-img");
    if(imgs.length>1){
      var cur=0;var interval=parseInt(activeSS.getAttribute("data-interval"))||4000;
      activeSS._timer=setInterval(function(){
        imgs[cur].style.opacity='0';cur=(cur+1)%imgs.length;imgs[cur].style.opacity='1';
      },interval);
    }
  }
  preloadNextVideo();
}

function preloadNextVideo(){
  var n=activeCarouselSlides.length;
  for(var off=1;off<=3;off++){
    var idx=(currentSlide+off)%n;
    var el=document.getElementById("slide-"+idx);
    if(!el)continue;
    var v=el.querySelector("video");
    if(v&&!v.querySelector("source")){
      var src=document.createElement("source");
      src.src=v.getAttribute("data-src");src.type="video/mp4";
      v.appendChild(src);
      v.preload=(off<=2)?"auto":"metadata";
      v.load();
    }
    var ss=el.querySelector(".ad-slideshow");
    if(ss){ss.querySelectorAll(".ad-slideshow-img[data-src]").forEach(function(d){if(!d.style.backgroundImage&&d.getAttribute("data-src"))d.style.backgroundImage="url('"+d.getAttribute("data-src")+"')"})}
  }
}

function nextSlide(){goToSlide((currentSlide+1)%activeCarouselSlides.length)}
function prevSlide(){goToSlide((currentSlide-1+activeCarouselSlides.length)%activeCarouselSlides.length)}

function startCarouselTimer(){carouselTimer=setInterval(()=>nextSlide(),10000)}
function resetCarouselTimer(){
  clearInterval(carouselTimer);
  startCarouselTimer();
}



// ---- LIVE CLOCK ----
// Renders in the detected location's timezone (from IP/GPS) so the day and time
// always match the user's real location, not the device's system clock setting.
// Falls back to the device timezone until a location is detected.
function updateClock(){
  const tz=detectedLocation&&detectedLocation.timezone&&detectedLocation.timezone!=="—"
    ?detectedLocation.timezone
    :Intl.DateTimeFormat().resolvedOptions().timeZone;
  const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const parts=new Intl.DateTimeFormat("en-US",{
    timeZone:tz,weekday:"short",day:"2-digit",month:"long",year:"numeric",
    hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false
  }).formatToParts(new Date());
  const get=t=>(parts.find(p=>p.type===t)||{}).value||"";
  const wd=get("weekday");
  const dayName=days.find(d=>d.slice(0,3)===wd.slice(0,3))||wd;
  document.getElementById("live-day").textContent=dayName;
  document.getElementById("live-date").textContent=get("day");
  document.getElementById("live-month").textContent=get("month");
  document.getElementById("live-year").textContent=get("year");
  let h=get("hour");if(h==="24")h="00";
  document.getElementById("live-time").textContent=h+":"+get("minute")+":"+get("second");
}

// ---- LIVE LOCATION DETECTION ----
let detectedLocation={country:"—",state:"",city:"—",timezone:"—",source:"none",vpn:false};
let locationDetected=false;

function setTimezoneDisplay(){
  try{
    // Only fall back to the device timezone when no location has been detected yet.
    // Never overwrite a timezone obtained from IP/GPS detection with the device clock.
    if(!locationDetected||detectedLocation.timezone==="—"){
      detectedLocation.timezone=Intl.DateTimeFormat().resolvedOptions().timeZone||"—";
    }
    const el=document.getElementById("live-timezone");
    if(el)el.textContent=detectedLocation.timezone;
  }catch(e){}
}

function applyLocationToBar(){
  const c=document.getElementById("live-country");
  const ci=document.getElementById("live-city");
  const v=document.getElementById("vpn-warning");
  if(c)c.textContent=detectedLocation.country||"—";
  if(ci){
    let label=detectedLocation.city||"—";
    if(detectedLocation.state&&detectedLocation.state!==detectedLocation.city)label=label+", "+detectedLocation.state;
    ci.textContent=label;
  }
  if(v)v.classList.toggle("hidden",!detectedLocation.vpn);
}

function detectLocationByIP(){
  // Reliable, no-key IP geolocation. Tries ipapi.co first, then ip-api.com.
  fetch("https://ipapi.co/json/").then(r=>r.json()).then(d=>{
    if(!d||(d.error||(d.country_code||d.country)===undefined))throw 0;
    detectedLocation={
      country:d.country_name||d.country||"—",
      state:d.region||d.regionName||"",
      city:d.city||"—",
      timezone:d.timezone||detectedLocation.timezone||"—",
      source:"ip",
      vpn:false
    };
    // VPN heuristic: ipapi.co sets org to hosting/VPN providers; ip-api.com sets proxy/hosting flags
    const org=(d.org||d.asn||"").toLowerCase();
    if(org.includes("vpn")||org.includes("proxy")||org.includes("hosting")||org.includes("datacenter"))detectedLocation.vpn=true;
    locationDetected=true;
    setTimezoneDisplay();
    applyLocationToBar();
    updateClock();
  }).catch(()=>{
    // Fallback: ip-api.com (http only on http pages, https on https)
    fetch("https://ip-api.com/json/?fields=status,country,regionName,city,timezone,proxy,hosting,isp").then(r=>r.json()).then(d=>{
      if(!d||d.status!=="success")throw 0;
      detectedLocation={
        country:d.country||"—",
        state:d.regionName||"",
        city:d.city||"—",
        timezone:d.timezone||detectedLocation.timezone||"—",
        source:"ip",
        vpn:!!(d.proxy||d.hosting)
      };
      locationDetected=true;
      setTimezoneDisplay();
      applyLocationToBar();
      updateClock();
    }).catch(()=>{
      // Final fallback: timezone-derived country only
      setTimezoneDisplay();
      try{
        const tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"";
        const tzCity=tz.split("/")[1]||"";
        const tzMap={"New_York":"US","Los_Angeles":"US","Chicago":"US","Denver":"US","London":"GB","Paris":"FR","Berlin":"DE","Madrid":"ES","Rome":"IT","Tokyo":"JP","Seoul":"KR","Shanghai":"CN","Beijing":"CN","Hong_Kong":"HK","Singapore":"SG","Sydney":"AU","Melbourne":"AU","Toronto":"CA","Vancouver":"CA","Mexico_City":"MX","Sao_Paulo":"BR","Buenos_Aires":"AR","Mumbai":"IN","Delhi":"IN","Dubai":"AE","Istanbul":"TR","Moscow":"RU","Cairo":"EG","Lagos":"NG","Nairobi":"KE","Johannesburg":"ZA","Stockholm":"SE","Oslo":"NO","Helsinki":"FI","Copenhagen":"DK","Amsterdam":"NL","Brussels":"BE","Vienna":"AT","Zurich":"CH","Dublin":"IE","Lisbon":"PT","Athens":"GR","Warsaw":"PL","Prague":"CZ","Budapest":"HU","Bucharest":"RO","Bangkok":"TH","Hanoi":"VN","Jakarta":"ID","Kuala_Lumpur":"MY","Manila":"PH","Taipei":"TW","Riyadh":"SA","Doha":"QA","Kuwait":"KW","Tehran":"IR","Karachi":"PK","Dhaka":"BD","Colombo":"LK"};
        const cc=tzMap[tzCity];
        if(cc){const c=COUNTRIES.find(x=>x.code===cc);detectedLocation.country=c?c.name:cc;}
        if(tzCity)detectedLocation.city=tzCity.replace(/_/g," ");
      }catch(e){}
      detectedLocation.source="tz";
      locationDetected=true;
      applyLocationToBar();
    });
  });
}

function detectLocationByGPS(){
  if(!navigator.geolocation)return false;
  navigator.geolocation.getCurrentPosition(pos=>{
    const{latitude:lat,longitude:lon}=pos.coords;
    // Reverse geocode via free OpenStreetMap Nominatim (rate-limited, no key)
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,{headers:{"Accept-Language":"en"}}).then(r=>r.json()).then(d=>{
      if(!d||!d.address)throw 0;
      const a=d.address;
      detectedLocation={
        country:a.country||detectedLocation.country||"—",
        state:a.state||a.region||a.county||"",
        city:a.city||a.town||a.village||a.hamlet||a.municipality||detectedLocation.city||"—",
        timezone:detectedLocation.timezone||"—",
        source:"gps",
        vpn:false
      };
      locationDetected=true;
      setTimezoneDisplay();
      applyLocationToBar();
      updateClock();
    }).catch(()=>{});
  },()=>{},
  {enableHighAccuracy:true,timeout:8000,maximumAge:300000});
  return true;
}

function initLiveLocation(){
  setTimezoneDisplay();
  // Always run IP detection — it provides the authoritative timezone for the clock.
  // GPS (when available) refines city/country/state in parallel but does not override the timezone.
  detectLocationByIP();
  detectLocationByGPS();
  // Auto-refresh timezone if the browser reports a change (e.g. user travels)
  try{
    if("timeZone" in Intl.DateTimeFormat().resolvedOptions()){
      let lastTz=Intl.DateTimeFormat().resolvedOptions().timeZone;
      setInterval(()=>{
        const tz=Intl.DateTimeFormat().resolvedOptions().timeZone;
        if(tz!==lastTz){lastTz=tz;if(!locationDetected)setTimezoneDisplay();}
      },15000);
    }
  }catch(e){}
}

// ---- HOLIDAY ENGINE ----
function updateHolidayInfo(){
  const holidays=HOLIDAYS[currentCountry]||[];
  const now=new Date();
  const tk=String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");
  const today=holidays.find(h=>h.date===tk);
  if(today){document.getElementById("holiday-text").textContent="Today: "+today.name;return}
  let next=null,minDiff=Infinity;
  holidays.forEach(h=>{const[mm,dd]=h.date.split("-");let hd=new Date(now.getFullYear(),parseInt(mm)-1,parseInt(dd));if(hd<now)hd.setFullYear(now.getFullYear()+1);const diff=hd-now;if(diff<minDiff){minDiff=diff;next=h}});
  const cn=COUNTRIES.find(c=>c.code===currentCountry)?.name||currentCountry;
  if(next){const days=Math.ceil(minDiff/(864e5));document.getElementById("holiday-text").textContent="Next event in "+cn+": "+next.name+" (in "+days+" days)"}
  else{document.getElementById("holiday-text").textContent="No upcoming events for "+cn}
}

// ---- REGION SETTINGS ----
function saveRegionSettings(){
  currentCountry=document.getElementById("country").value;
  currentLang=document.getElementById("language").value;
  localStorage.setItem("kco_country",currentCountry);localStorage.setItem("kco_language",currentLang);
  updateBadgeLanguage();
}
function loadRegionSettings(){
  const sc=localStorage.getItem("kco_country"),sl=localStorage.getItem("kco_language");
  if(sc){document.getElementById("country").value=sc;currentCountry=sc}else{currentCountry=document.getElementById("country").value||"US"}
  if(sl){document.getElementById("language").value=sl;currentLang=sl}else{currentLang=document.getElementById("language").value||"en"}
}

// ---- AUTO COUNTRY & LANGUAGE DETECTION ----
// Runs once on first visit (no saved preference). Detects from browser settings,
// shows a friendly notification, and is VPN-aware (never forces a change).
function detectRegionAuto(){
  // Only auto-detect on first visit — if user already has a preference, respect it
  if(localStorage.getItem("kco_country")||localStorage.getItem("kco_language"))return;
  let detectedCountry=null,detectedLang=null,usedFallback=false;

  // 1) Try browser locale (navigator.language) — works even behind VPN
  try{
    const navLang=(navigator.language||navigator.userLanguage||"en").toLowerCase();
    const parts=navLang.split(/[-_]/);
    const langCode=parts[0];
    const regionCode=(parts[1]||"").toUpperCase();
    // Map browser region to our country list if present
    if(regionCode&&COUNTRIES.some(c=>c.code===regionCode))detectedCountry=regionCode;
    // Map browser language to our language list
    if(LANGUAGES.some(l=>l.code===langCode))detectedLang=langCode;
    // Common language→country fallback when region absent
    if(!detectedCountry){
      const langToCountry={en:"US",es:"ES",fr:"FR",de:"DE",ja:"JP",zh:"CN",pt:"PT",ru:"RU",hi:"IN",ar:"SA",it:"IT",ko:"KR",nl:"NL",sv:"SE",pl:"PL",tr:"TR",id:"ID",th:"TH",vi:"VN",uk:"UA",cs:"CZ",da:"DK",fi:"FI",no:"NO",el:"GR",he:"IL",ms:"MY"};
      if(langToCountry[langCode])detectedCountry=langToCountry[langCode];
    }
    if(!detectedLang)detectedLang="en"; // English as universal fallback
  }catch(e){detectedLang="en";usedFallback=true}

  // 2) Try timezone as a secondary signal (Intl API)
  let tzCountry=null;
  try{
    const tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"";
    const tzCity=tz.split("/")[1]||"";
    const tzMap={"New_York":"US","Los_Angeles":"US","Chicago":"US","Denver":"US","London":"GB","Paris":"FR","Berlin":"DE","Madrid":"ES","Rome":"IT","Tokyo":"JP","Seoul":"KR","Shanghai":"CN","Beijing":"CN","Hong_Kong":"HK","Singapore":"SG","Sydney":"AU","Melbourne":"AU","Toronto":"CA","Vancouver":"CA","Mexico_City":"MX","Sao_Paulo":"BR","Buenos_Aires":"AR","Mumbai":"IN","Delhi":"IN","Dubai":"AE","Istanbul":"TR","Moscow":"RU","Cairo":"EG","Lagos":"NG","Nairobi":"KE","Johannesburg":"ZA","Stockholm":"SE","Oslo":"NO","Helsinki":"FI","Copenhagen":"DK","Amsterdam":"NL","Brussels":"BE","Vienna":"AT","Zurich":"CH","Dublin":"IE","Lisbon":"PT","Athens":"GR","Warsaw":"PL","Prague":"CZ","Budapest":"HU","Bucharest":"RO","Bangkok":"TH","Hanoi":"VN","Jakarta":"ID","Kuala_Lumpur":"MY","Manila":"PH","Taipei":"TW","Riyadh":"SA","Doha":"QA","Kuwait":"KW","Tehran":"IR","Karachi":"PK","Dhaka":"BD","Colombo":"LK"};
    if(tzMap[tzCity])tzCountry=tzMap[tzCity];
  }catch(e){}

  // VPN awareness: if timezone country differs from browser-language country, likely VPN
  const vpnMismatch=tzCountry&&detectedCountry&&tzCountry!==detectedCountry;

  // Prefer timezone country when available (more reliable than browser language region)
  const finalCountry=tzCountry||detectedCountry||"US";
  const finalLang=detectedLang||"en";

  // Apply detected values to selectors
  const countrySel=document.getElementById("country");
  const langSel=document.getElementById("language");
  if(countrySel&&COUNTRIES.some(c=>c.code===finalCountry)){countrySel.value=finalCountry;currentCountry=finalCountry}
  if(langSel&&LANGUAGES.some(l=>l.code===finalLang)){langSel.value=finalLang;currentLang=finalLang}

  // Save so we don't re-detect on every visit
  localStorage.setItem("kco_country",currentCountry);
  localStorage.setItem("kco_language",currentLang);
  localStorage.setItem("kco_auto_detected","1");

  // Show friendly notification
  const countryName=COUNTRIES.find(c=>c.code===finalCountry)?.name||finalCountry;
  const langName=LANGUAGES.find(l=>l.code===finalLang)?.name||finalLang;
  let msg;
  if(vpnMismatch){
    const tzName=COUNTRIES.find(c=>c.code===tzCountry)?.name||tzCountry;
    msg="It looks like you're browsing from a different location. Your country has been detected as "+countryName+", but you can switch to your preferred country and language at any time.";
  }else{
    msg="Your location has been detected as "+countryName+". Language: "+langName+". You can change these settings at any time.";
  }
  showRegionNotification(msg);
}

function showRegionNotification(msg){
  let n=document.getElementById("region-detect-notification");
  if(!n){
    n=document.createElement("div");
    n.id="region-detect-notification";
    n.className="fixed top-[185px] left-1/2 -translate-x-1/2 z-[55] max-w-[92vw] sm:max-w-md bg-[#1e293b] border border-orange-500/40 rounded-xl shadow-2xl px-4 py-3 flex items-start gap-3 transition-all duration-500";
    n.innerHTML='<i data-lucide="globe" class="w-5 h-5 text-orange-400 shrink-0 mt-0.5"></i>'+
      '<div class="flex-1 min-w-0"><p class="text-xs text-gray-200 leading-snug" id="region-detect-text"></p>'+
      '<button onclick="document.getElementById(\'region-detect-notification\').classList.add(\'opacity-0\',\'translate-y-[-10px]\');setTimeout(()=>document.getElementById(\'region-detect-notification\').remove(),500)" class="text-[10px] text-orange-400 hover:text-orange-300 font-semibold mt-1.5">Dismiss</button></div>'+
      '<button onclick="document.getElementById(\'region-detect-notification\').remove()" class="text-gray-500 hover:text-white shrink-0" aria-label="Close"><i data-lucide="x" class="w-4 h-4"></i></button>';
    document.body.appendChild(n);
    if(window.lucide)lucide.createIcons();
  }
  document.getElementById("region-detect-text").textContent=msg;
  n.classList.remove("opacity-0","translate-y-[-10px]");
  clearTimeout(n._t);
  n._t=setTimeout(()=>{n.classList.add("opacity-0","translate-y-[-10px]");setTimeout(()=>n.remove(),500)},8000);
}

// ---- UI HELPERS ----
function toggleNotifications(){document.getElementById("notification-panel").classList.toggle("hidden")}
function openAuthModal(){window.location.href="/auth.html"}
function closeAuthModal(){document.getElementById("auth-modal").classList.add("hidden")}
function switchAuthTab(tab){
  const lt=document.getElementById("tab-login"),rt=document.getElementById("tab-register"),uf=document.getElementById("field-username"),sb=document.getElementById("auth-submit-btn");
  if(tab==="login"){lt.classList.add("text-orange-500","border-b-2","border-orange-500");lt.classList.remove("text-gray-400");rt.classList.remove("text-orange-500","border-b-2","border-orange-500");rt.classList.add("text-gray-400");uf.classList.add("hidden");sb.textContent="Sign In"}
  else{rt.classList.add("text-orange-500","border-b-2","border-orange-500");rt.classList.remove("text-gray-400");lt.classList.remove("text-orange-500","border-b-2","border-orange-500");lt.classList.add("text-gray-400");uf.classList.remove("hidden");sb.textContent="Create Account"}
}
function handleAuthSubmit(e){e.preventDefault();closeAuthModal();showToast("Authentication processing...")}
function showToast(msg){
  const t=document.getElementById("toast");document.getElementById("toast-message").textContent=msg;
  t.classList.remove("translate-y-20","opacity-0");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.add("translate-y-20","opacity-0"),3000);
}
window.showToast=showToast;
window._showToast=showToast;

// ---- BOOTSTRAP ----
document.addEventListener("DOMContentLoaded",()=>{
  populateSelectors();loadRegionSettings();detectRegionAuto();renderCategories();setupSearchSuggestions();
  renderCarousel();updateClock();updateBadgeLanguage();
  lucide.createIcons();setInterval(updateClock,1000);
  initLiveLocation();
  initLiveAds();
});
