export const CATEGORIES = ['Books', 'Electronics', 'Transport', 'Furniture', 'Clothing', 'Accessories', 'Stationery'];
export const CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];
export const LOCATIONS = ['Main Library', 'Tech Tower', 'Hostel Block A', 'Hostel Block B', 'Hostel Block C', 'Hostel Block D', 'Student Centre', 'Sports Complex'];

// Default impact per category, used for newly created listings.
export const CATEGORY_IMPACT = {
  Books: { weightKg: 1, co2Kg: 2.5 },
  Electronics: { weightKg: 1, co2Kg: 7 },
  Transport: { weightKg: 8, co2Kg: 45 },
  Furniture: { weightKg: 7, co2Kg: 28 },
  Clothing: { weightKg: 0.8, co2Kg: 10 },
  Accessories: { weightKg: 0.6, co2Kg: 4 },
  Stationery: { weightKg: 0.5, co2Kg: 1.5 },
};

// Icon names resolved in components/ItemArt.jsx
export const ICON_CHOICES = ['BookOpen', 'Calculator', 'Lamp', 'Bike', 'Armchair', 'Shirt', 'Backpack', 'Headphones', 'Keyboard', 'Pencil', 'Fan', 'Package'];

export const DEMO_USER = { name: 'Aditi Krishnan', email: 'demo@reloop.edu', password: 'Reloop@123' };
const ME = 'Aditi Krishnan';

const L = (id, title, price, category, condition, location, seller, date, icon, weightKg, co2Kg, retail, description, extra = {}) =>
  ({ id, title, price, category, condition, location, seller, date, icon, weightKg, co2Kg, retail, description, status: 'active', ...extra });

export const LISTINGS = [
  L('l1', 'Higher Engineering Mathematics (B.S. Grewal, 44th Ed.)', 350, 'Books', 'Good', 'Main Library', 'Aarav Menon', '2026-10-05', 'BookOpen', 1.4, 3.5, 900, 'Used for two semesters. Some highlighting in the first four chapters, no torn pages. Comes with a bookmark and my solved worksheet for Unit 2.', { featured: true, rec: 9 }),
  L('l2', 'Casio fx-991EX ClassWiz Scientific Calculator', 900, 'Electronics', 'Like New', 'Tech Tower', 'Priya Nair', '2026-10-06', 'Calculator', 0.2, 2.4, 1650, 'Allowed in all internal exams. Cover included, fresh batteries, screen has no scratches. Selling because I upgraded to the graphing model.', { featured: true, rec: 10 }),
  L('l3', 'Hero Sprint 26T Cycle, 21-Speed', 4200, 'Transport', 'Good', 'Hostel Block A', 'Rohan Iyer', '2026-10-02', 'Bike', 14, 85, 9500, 'Serviced last month with new brake pads and a chain lube. Great for the campus-to-gate run. Lock and mudguards included.', { featured: true, rec: 8 }),
  L('l4', 'Rechargeable LED Study Lamp', 450, 'Electronics', 'Like New', 'Hostel Block D', 'Sneha Reddy', '2026-10-07', 'Lamp', 0.6, 2.4, 899, 'Three brightness levels, battery lasts about 8 hours. Perfect for late-night revision without waking your roommate. Charging cable included.', { rec: 7 }),
  L('l5', 'Ergonomic Mesh Study Chair', 1800, 'Furniture', 'Good', 'Hostel Block C', 'Karthik Raj', '2026-09-29', 'Armchair', 7.5, 28, 4500, 'Adjustable height and lumbar support. Wheels run smoothly. Graduating this year, so it must go before the end of the month.', { featured: true, rec: 9 }),
  L('l6', 'Foldable Study Table with Cup Holder', 600, 'Furniture', 'Good', 'Hostel Block B', 'Meera Joshi', '2026-09-27', 'Package', 4, 14, 1400, 'Folds flat to slide under the bed. Fits a 15-inch laptop and a notebook comfortably. Minor scuff on one corner.', { rec: 5 }),
  L('l7', 'Wildcraft 35L Laptop Backpack', 650, 'Accessories', 'Good', 'Sports Complex', 'Arjun Pillai', '2026-10-01', 'Backpack', 0.9, 6, 1800, 'Padded laptop sleeve, rain cover, and three compartments. Zips work perfectly. Washed and ready to use.', { rec: 6 }),
  L('l8', 'Navy Formal Blazer (Size 40)', 800, 'Clothing', 'Like New', 'Student Centre', 'Dev Malhotra', '2026-09-30', 'Shirt', 0.9, 11, 3500, 'Worn twice for placement presentations. Dry-cleaned. Ideal for interviews and project demos.', { rec: 6 }),
  L('l9', 'Bluetooth Over-Ear Headphones', 700, 'Electronics', 'Good', 'Tech Tower', 'Ishita Sharma', '2026-10-04', 'Headphones', 0.3, 8, 1999, 'Around 20 hours of battery, clear mic for calls. Ear cushions replaced recently. Includes the original aux cable.', { rec: 7 }),
  L('l10', 'Engineering Graphics Drafter & Geometry Set', 200, 'Stationery', 'Good', 'Main Library', ME, '2026-10-03', 'Pencil', 0.8, 1.8, 650, 'Mini drafter, compass, protractor and set squares in a hard case. All pieces present and accurate.', { owner: 'me', rec: 4 }),
  L('l11', 'Data Structures Textbook + Handwritten Notes', 400, 'Books', 'Like New', 'Main Library', ME, '2026-10-01', 'BookOpen', 1.2, 3, 1100, 'Cormen-style textbook with clean handwritten notes covering trees, graphs and DP. Helped me score an S grade.', { owner: 'me', rec: 8 }),
  L('l12', 'Electric Kettle, 1.5L', 350, 'Electronics', 'Good', 'Hostel Block D', 'Lakshmi Venkat', '2026-09-26', 'Package', 0.9, 4, 899, 'Boils in about three minutes, auto shut-off works. Great for Maggi nights and morning coffee.', { rec: 5 }),
  L('l13', 'Table Fan, 400 mm', 500, 'Electronics', 'Fair', 'Hostel Block A', 'Vikram Singh', '2026-09-25', 'Fan', 3.2, 12, 1700, 'Three speeds, a little noisy on speed three. Cools a hostel room well. Ideal for the summer term.', { rec: 3 }),
  L('l14', 'Grey Cotton Hoodie (Size M)', 0, 'Clothing', 'Good', 'Student Centre', 'Tanvi Kulkarni', '2026-10-06', 'Shirt', 0.8, 10, 1200, 'Donating this one. Soft, warm and no pilling. Pick it up from the Student Centre notice-board desk.', { rec: 8 }),
  L('l15', 'Arduino Uno R3 Starter Kit', 900, 'Electronics', 'Like New', 'Tech Tower', 'Siddharth Rao', '2026-10-05', 'Keyboard', 0.5, 6, 2200, 'Board, breadboard, jumper wires, LEDs, sensors and a small LCD. Used for one embedded systems project.', { rec: 7 }),
  L('l16', 'Steel Water Bottle, 1 Litre', 250, 'Accessories', 'Like New', 'Sports Complex', 'Nisha Thomas', '2026-09-28', 'Package', 0.4, 3, 650, 'Insulated, keeps water cold through a full lab day. No dents. Cleaned and sanitised.', { rec: 4 }),
  L('l17', 'Four-Tier Wooden Bookshelf', 1200, 'Furniture', 'Good', 'Hostel Block C', 'Rhea Fernandes', '2026-09-24', 'Package', 9, 34, 3200, 'Sturdy and easy to dismantle. Holds a full semester of books. Pick-up only, I can help carry it.', { rec: 6 }),
  L('l18', 'Cycle Helmet + Chain Lock Combo', 450, 'Transport', 'Like New', 'Hostel Block B', 'Manoj Kumar', '2026-10-07', 'Bike', 1.1, 5, 1300, 'ISI-marked helmet with adjustable fit and a 90 cm combination lock. Both hardly used.', { rec: 5 }),
  L('l19', 'Mechanical Keyboard (Blue Switches)', 1600, 'Electronics', 'Good', 'Tech Tower', 'Yash Patel', '2026-10-03', 'Keyboard', 0.9, 9, 3299, 'Full-size with red backlight. All keys register properly. Great for coding marathons, though your roommates may notice.', { rec: 6 }),
  L('l20', 'Notebooks, Pens & Highlighters Bundle', 150, 'Stationery', 'New', 'Main Library', ME, '2026-10-04', 'Pencil', 0.7, 1.5, 420, 'Five unused ruled notebooks, ten gel pens and a pack of highlighters. Bought too many at the start of term.', { owner: 'me', rec: 4 }),
  // Already exchanged (shown only on the dashboard)
  L('l21', 'Organic Chemistry Textbook', 380, 'Books', 'Good', 'Main Library', ME, '2026-09-10', 'BookOpen', 1.3, 3.2, 950, 'Exchanged through ReLoop.', { owner: 'me', status: 'exchanged', rec: 0 }),
  L('l22', 'Desk Organiser Set', 120, 'Stationery', 'Good', 'Hostel Block D', ME, '2026-09-04', 'Package', 0.6, 1.6, 400, 'Exchanged through ReLoop.', { owner: 'me', status: 'exchanged', rec: 0 }),
];

export const SEED_REQUESTS = [
  { id: 'r1', dir: 'in', person: 'Rohan Iyer', item: 'Engineering Graphics Drafter & Geometry Set', note: 'Can I pick it up after the 4 pm class?', status: 'pending' },
  { id: 'r2', dir: 'in', person: 'Sneha Reddy', item: 'Data Structures Textbook + Handwritten Notes', note: 'Would you swap it for my Operating Systems book?', status: 'pending' },
  { id: 'r3', dir: 'out', person: 'Priya Nair', item: 'Casio fx-991EX ClassWiz Scientific Calculator', note: 'Request sent', status: 'pending' },
];

export const SEED_NOTIFICATIONS = [
  { id: 'n1', text: 'Rohan Iyer requested your drafter set.', time: '2h ago' },
  { id: 'n2', text: 'Your listing "Data Structures Textbook" was saved by 6 students.', time: 'Yesterday' },
  { id: 'n3', text: 'You earned the Loop Starter badge.', time: '3 days ago' },
];

export const SEED_ACTIVITY = [
  'Listed "Notebooks, Pens & Highlighters Bundle"',
  'Exchanged "Organic Chemistry Textbook"',
  'Exchanged "Desk Organiser Set"',
];

export const STATS = [
  { value: '1,284', label: 'Items reused' },
  { value: '438 kg', label: 'Waste diverted' },
  { value: '₹1.8L', label: 'Student savings' },
  { value: '326', label: 'Successful exchanges' },
];

export const TESTIMONIALS = [
  { name: 'Ananya Das', role: 'B.Tech CSE, 2nd year', quote: 'I sold last year’s textbooks in two days and bought a scientific calculator for half the shop price. I wish this existed in my first semester.' },
  { name: 'Mohammed Faiz', role: 'M.Sc Chemistry, 1st year', quote: 'Moving into the hostel was cheaper because of ReLoop. A chair, a lamp and a kettle, all from students two blocks away.' },
  { name: 'Divya Menon', role: 'Sustainability Club lead', quote: 'Our club tracks the impact numbers every month. Watching the kilograms of diverted waste climb keeps people motivated.' },
];

export const FAQS = [
  ['Is ReLoop free to use?', 'Yes. Listing, saving and requesting exchanges are free for every student. There are no fees and no payments are handled on the platform.'],
  ['How do I pay for an item?', 'ReLoop does not process payments. Agree on the price or swap in your request, then settle it in person when you meet on campus.'],
  ['Can I donate things I no longer need?', 'Absolutely. Set the price to 0 when listing and the item appears as Free. Donated items count towards your impact points.'],
  ['What items should I avoid listing?', 'Please do not list anything unsafe, illegal or hygiene-sensitive such as cracked helmets, medicines, or damaged electrical appliances.'],
  ['How are impact numbers calculated?', 'Each item has an estimated weight and carbon footprint based on its category. When an item is marked as exchanged, those values are added to your totals.'],
  ['Who can join?', 'ReLoop is built for students and staff of a campus community. In this demo, you can sign up with any email address.'],
];

// [weekly, monthly, all-time]
export const STUDENTS = [
  { name: 'Aarav Menon', dept: 'CSE', items: [6, 21, 118], pts: [310, 1020, 5900] },
  { name: 'Priya Nair', dept: 'ECE', items: [5, 24, 104], pts: [280, 1180, 5200] },
  { name: 'Rohan Iyer', dept: 'Mechanical', items: [7, 17, 96], pts: [345, 870, 4800] },
  { name: 'Sneha Reddy', dept: 'IT', items: [4, 19, 88], pts: [210, 940, 4400] },
  { name: 'Karthik Raj', dept: 'Civil', items: [3, 14, 81], pts: [170, 700, 4050] },
  { name: 'Aditi Krishnan', dept: 'CSE', items: [4, 12, 64], pts: [240, 640, 3200] },
  { name: 'Meera Joshi', dept: 'Biotech', items: [2, 15, 59], pts: [120, 760, 2950] },
  { name: 'Arjun Pillai', dept: 'EEE', items: [5, 11, 52], pts: [260, 550, 2600] },
  { name: 'Ishita Sharma', dept: 'Design', items: [2, 9, 45], pts: [110, 450, 2250] },
  { name: 'Dev Malhotra', dept: 'MBA', items: [1, 8, 38], pts: [60, 400, 1900] },
];

export const BADGE_TIERS = [[5000, 'Eco Champion'], [3000, 'Loop Master'], [1500, 'Green Guardian'], [0, 'Seedling']];
export const badgeFor = (pts) => BADGE_TIERS.find(([min]) => pts >= min)[1];

export const IMPACT_MONTHS = [
  { month: 'Mar', items: 96, savings: 12 }, { month: 'Apr', items: 128, savings: 28 }, { month: 'May', items: 151, savings: 47 },
  { month: 'Jun', items: 174, savings: 70 }, { month: 'Jul', items: 203, savings: 102 }, { month: 'Aug', items: 236, savings: 141 },
  { month: 'Sep', items: 296, savings: 180 },
];
export const WASTE_BY_CATEGORY = [
  { name: 'Books', kg: 126 }, { name: 'Furniture', kg: 112 }, { name: 'Electronics', kg: 98 }, { name: 'Transport', kg: 44 },
  { name: 'Clothing', kg: 32 }, { name: 'Accessories', kg: 14 }, { name: 'Stationery', kg: 12 },
];

export const CALC_ITEMS = [
  { id: 'book', name: 'Textbook', waste: 1.2, co2: 3.5, saved: 450 },
  { id: 'calc', name: 'Calculator', waste: 0.2, co2: 2.4, saved: 750 },
  { id: 'lamp', name: 'Study lamp', waste: 0.6, co2: 2.4, saved: 450 },
  { id: 'cycle', name: 'Cycle', waste: 14, co2: 85, saved: 5300 },
  { id: 'chair', name: 'Chair', waste: 7.5, co2: 28, saved: 2700 },
  { id: 'hoodie', name: 'Hoodie', waste: 0.8, co2: 10, saved: 900 },
];
