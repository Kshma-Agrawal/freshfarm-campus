import logoImg from '../assets/logo.png'
import logoWordmarkImg from '../assets/logo-wordmark.png'
import farmerRaniImg from '../assets/farmer-rani.jpg'
import farmerHarpalImg from '../assets/farmer-harpal.jpg'
import farmerSunriseImg from '../assets/farmer-sunrise.jpg'
import productTomatoesImg from '../assets/product-tomatoes.png'
import productSpinachImg from '../assets/product-spinach.jpg'
import productMilkImg from '../assets/product-milk.jpg'
import productCarrotImg from '../assets/product-carrot.jpg'
import productBananaImg from '../assets/product-banana.jpg'
import productKaleImg from '../assets/product-kale.jpg'
import veggiesCrateImg from '../assets/veggies-crate.png'
import orderConfirmedImg from '../assets/order-confirmed.jpg'
import userKshmaImg from '../assets/user-kshma.jpg'

export { logoImg, logoWordmarkImg, veggiesCrateImg, orderConfirmedImg, userKshmaImg }

export const FARMERS = [
  {
    id: 1, name: 'Rani Kumari', location: 'Gurgaon, Haryana', dist: '2.5 km away',
    rating: 4.5, reviews: 128, products: 18, exp: 8, orders: 340,
    specialty: 'Organic vegetables and seasonal greens',
    tags: ['Organic', 'Seasonal'], img: farmerRaniImg, verified: true,
    desc: 'Specializes in organic vegetables and seasonal greens, grown without synthetic pesticides.',
    reviewText: '"The best heirloom tomatoes I\'ve ever had! I can\'t wait to see what other produce they bring this season."',
    reviewAuthor: 'Deepak S.',
  },
  {
    id: 2, name: 'Harpal Singh', location: 'Gurgaon, Haryana', dist: '2.5 km away',
    rating: 4.5, reviews: 95, products: 24, exp: 12, orders: 540,
    specialty: 'Seasonal fruits and fresh vegetables',
    tags: ['Fresh Today', 'Premium'], img: farmerHarpalImg, verified: true,
    desc: 'Expert in seasonal fruits and exotic produce, delivering fresh from the farm every morning.',
    reviewText: '"The sweetest carrots I\'ve ever tasted! You can really tell they are fresh from the farm."',
    reviewAuthor: 'Ansh B.',
  },
  {
    id: 3, name: 'Sunrise Farms', location: 'Gurgaon, Haryana', dist: '1.2 km away',
    rating: 4.5, reviews: 128, products: 24, exp: 12, orders: 540,
    specialty: 'Organic vegetables and seasonal greens',
    tags: ['Organic', 'Seasonal', 'Premium'], img: farmerSunriseImg, verified: true,
    desc: 'Specializes in organic vegetables and seasonal greens, grown without synthetic pesticides.',
    reviewText: '"The best heirloom tomatoes I\'ve ever had! I can\'t wait to see what other produce they bring this season."',
    reviewAuthor: 'Deepak S.',
  },
  {
    id: 4, name: 'Vishwas Dairy', location: 'Gurgaon, Haryana', dist: '4.2 km away',
    rating: 4.2, reviews: 67, products: 8, exp: 5, orders: 120,
    specialty: 'Fresh dairy products delivered daily',
    tags: ['Fresh Today'], img: farmerHarpalImg, verified: false,
    desc: 'Fresh dairy products sourced daily from grass-fed cows. No additives, no preservatives.',
    reviewText: '"Freshest milk I\'ve had in years. Tastes exactly like farm milk."',
    reviewAuthor: 'Priya M.',
  },
  {
    id: 5, name: 'Deshmukh Farms', location: 'Gurgaon, Haryana', dist: '3.8 km away',
    rating: 4.0, reviews: 43, products: 15, exp: 7, orders: 210,
    specialty: 'Root vegetables grown without chemicals',
    tags: ['Seasonal'], img: farmerRaniImg, verified: false,
    desc: 'Root vegetables grown without chemicals in mineral-rich soil. Crunchy and full of flavour.',
    reviewText: '"Great quality carrots, very fresh and crisp!"',
    reviewAuthor: 'Ravi K.',
  },
]

export const PRODUCTS = [
  {
    id: 1, name: 'Organic Tomatoes', farmer: 'Sunrise Farms', farmerId: 3,
    price: 60, unit: 'kg', img: productTomatoesImg,
    category: 'Vegetables', stock: true,
    desc: 'Our organic tomatoes are harvested daily from the rich, fertile soils of the North Valley. Grown without synthetic pesticides or fertilizers, these tomatoes retain their natural sweetness and crisp texture. Perfect for salads, roasting, or cooking.',
    rating: 4.5, reviews: 128,
    reviewText: '"The sweetest carrots I\'ve ever tasted! You can really tell they are fresh from the farm."',
    reviewAuthor: 'Ansh B.',
    images: [productTomatoesImg, productSpinachImg, productCarrotImg],
  },
  {
    id: 2, name: 'Spinach (palak)', farmer: 'Harpal Singh Farm', farmerId: 2,
    price: 25, unit: 'bunch', img: productSpinachImg,
    category: 'Vegetables', stock: true,
    desc: 'Fresh spinach leaves, packed with iron and nutrients. Hand-picked every morning from organic beds. Ideal for dal, sabzi, smoothies or salads.',
    rating: 4.3, reviews: 89,
    reviewText: '"The freshest spinach I\'ve bought online. Arrived same day, perfectly crisp."',
    reviewAuthor: 'Meera T.',
    images: [productSpinachImg, productKaleImg, productTomatoesImg],
  },
  {
    id: 3, name: 'Pure Cow Milk', farmer: 'Vishwas Dairy', farmerId: 4,
    price: 50, unit: 'ltr', img: productMilkImg,
    category: 'Dairy', stock: true,
    desc: 'Pure cow milk sourced fresh every morning. No additives, no preservatives, no water. Collected from grass-fed cows and delivered cold within 4 hours.',
    rating: 4.6, reviews: 201,
    reviewText: '"Tastes exactly like the milk from my grandmother\'s village. Outstanding quality."',
    reviewAuthor: 'Rahul S.',
    images: [productMilkImg, productTomatoesImg, productCarrotImg],
  },
  {
    id: 4, name: 'Carrot (gajar)', farmer: 'Harpal Singh Farm', farmerId: 2,
    price: 30, unit: 'kg', img: productCarrotImg,
    category: 'Vegetables', stock: true,
    desc: 'Our organic carrots are harvested daily from the rich, fertile soils of the North Valley. Grown without synthetic pesticides or fertilizers, these carrots retain their natural sweetness and crisp texture. Perfect for juicing, roasting, or snacking raw.',
    rating: 4.5, reviews: 128,
    reviewText: '"The sweetest carrots I\'ve ever tasted! You can really tell they are fresh from the farm."',
    reviewAuthor: 'Ansh B.',
    images: [productCarrotImg, productTomatoesImg, productSpinachImg],
  },
  {
    id: 5, name: 'Fresh Bananas', farmer: 'Rani Kumari Farm', farmerId: 1,
    price: 35, unit: 'dozen', img: productBananaImg,
    category: 'Fruits', stock: true,
    desc: 'Alphonso-grade bananas from the farms of Gurgaon. Sweet, creamy and naturally ripened on the plant.',
    rating: 4.4, reviews: 143,
    reviewText: '"So ripe and sweet. My kids love them!"',
    reviewAuthor: 'Sunita P.',
    images: [productBananaImg, productTomatoesImg, productCarrotImg],
  },
  {
    id: 6, name: 'Fresh Kale', farmer: 'Sunrise Farms', farmerId: 3,
    price: 40, unit: 'bunch', img: productKaleImg,
    category: 'Vegetables', stock: true,
    desc: 'Nutrient-dense curly kale, freshly harvested. Rich in vitamins K, A and C. Perfect for smoothies, stir-fry or salads.',
    rating: 4.3, reviews: 67,
    reviewText: '"Best kale I\'ve had outside of a premium supermarket. Arrived super fresh."',
    reviewAuthor: 'Aditi V.',
    images: [productKaleImg, productSpinachImg, productTomatoesImg],
  },
  {
    id: 7, name: 'Fresh Cucumbers', farmer: 'Sunrise Farms', farmerId: 3,
    price: 25, unit: 'kg', img: productSpinachImg,
    category: 'Vegetables', stock: true,
    desc: 'Crisp, hydrating cucumbers picked fresh daily. Great for salads and raita.',
    rating: 4.2, reviews: 55,
    reviewText: '"Crunchy and fresh. Perfect for my daily salad."',
    reviewAuthor: 'Kavya R.',
    images: [productSpinachImg, productCarrotImg, productTomatoesImg],
  },
  {
    id: 8, name: 'Sweet Bell Peppers', farmer: 'Sunrise Farms', farmerId: 3,
    price: 50, unit: 'kg', img: productTomatoesImg,
    category: 'Vegetables', stock: true,
    desc: 'Colorful, sweet bell peppers grown organically. Rich in vitamins and antioxidants.',
    rating: 4.5, reviews: 94,
    reviewText: '"Great quality peppers, very vibrant and fresh."',
    reviewAuthor: 'Nisha G.',
    images: [productTomatoesImg, productSpinachImg, productCarrotImg],
  },
]

export const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Grains']

export const ORDERS = [
  {
    id: 'FFC-12345', date: '30 Mar, 12:31 pm', amount: 420.59, status: 'arrived',
    items: [
      { name: 'Organic Carrots', qty: '1kg', price: 40, img: productCarrotImg },
      { name: 'Fresh Kale', qty: '300g', price: 30, img: productKaleImg },
      { name: 'Organic Tomatoes', qty: '1kg', price: 50, img: productTomatoesImg },
    ],
    farmer: { name: 'Harpal Singh', location: 'Gurgaon, Haryana', rating: 4.5, img: farmerHarpalImg },
    payment: 'Cash on delivery', delivery: '123 University Hall, Campus Exit',
    estimatedArrival: 'Today, 5:30 PM',
  },
  {
    id: 'FFC-12346', date: '28 Mar, 10:12 pm', amount: 315.00, status: 'cancelled',
    items: [
      { name: 'Fresh Spinach', qty: '1 bunch', price: 25, img: productSpinachImg },
      { name: 'Pure Cow Milk', qty: '1 ltr', price: 50, img: productMilkImg },
      { name: 'Carrot (gajar)', qty: '1kg', price: 30, img: productCarrotImg },
    ],
    farmer: { name: 'Rani Kumari', location: 'Gurgaon, Haryana', rating: 4.5, img: farmerRaniImg },
    payment: 'UPI', delivery: '123 University Hall, Campus Exit', estimatedArrival: 'N/A',
  },
  {
    id: 'FFC-12347', date: '26 Mar, 9:00 am', amount: 180.00, status: 'ongoing',
    items: [
      { name: 'Fresh Bananas', qty: '1 dozen', price: 35, img: productBananaImg },
      { name: 'Organic Tomatoes', qty: '500g', price: 30, img: productTomatoesImg },
      { name: 'Fresh Kale', qty: '1 bunch', price: 40, img: productKaleImg },
    ],
    farmer: { name: 'Sunrise Farms', location: 'Gurgaon, Haryana', rating: 4.5, img: farmerSunriseImg },
    payment: 'UPI', delivery: '123 University Hall, Campus Exit', estimatedArrival: 'Today, 5:30 PM',
  },
]

export const ADDRESSES = [
  { id: 1, label: 'Home', current: true, address: '123 Campus Lane, Block B, Gurgaon, Haryana, 122018', phone: '+91 87664 92210', icon: '🏠' },
  { id: 2, label: 'Office', current: false, address: '456 Business Park, Sector 34, Gurgaon, Haryana, 122001', phone: '+91 98765 43210', icon: '🏢' },
  { id: 3, label: 'Warehouse', current: false, address: '789 Knowledge Road, Zone 5, Gurgaon, Haryana, 122002', phone: '+91 99999 88888', icon: '🏭' },
]
