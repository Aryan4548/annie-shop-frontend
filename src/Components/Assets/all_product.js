import p1_img from "./product_1.png";
import p2_img from "./product_2.png";
import p3_img from "./product_3.png";
import p4_img from "./product_4.png";
import p5_img from "./product_5.png";
import p6_img from "./product_6.png";
import p7_img from "./product_7.png";
import p8_img from "./product_8.png";
import p9_img from "./product_9.png";
import p10_img from "./product_10.png";
import p11_img from "./product_11.png";
import p12_img from "./product_12.png";
import p13_img from "./product_13.png";
import p14_img from "./product_14.png";
import p15_img from "./product_15.png";
import p16_img from "./product_16.png";
import p17_img from "./product_17.png";
import p18_img from "./product_18.png";
import p19_img from "./product_19.png";
import p20_img from "./product_20.png";
import p21_img from "./product_21.png";
import p22_img from "./product_22.png";
import p23_img from "./product_23.png";
import p24_img from "./product_24.png";
import p25_img from "./product_25.png";
import p26_img from "./product_26.png";
import p27_img from "./product_27.png";
import p28_img from "./product_28.png";
import p29_img from "./product_29.png";
import p30_img from "./product_30.png";
import p31_img from "./product_31.png";
import p32_img from "./product_32.png";
import p33_img from "./product_33.png";
import p34_img from "./product_34.png";
import p35_img from "./product_35.png";
import p36_img from "./product_36.png";
import naruto_img from "./Naruto.png";
import ichigo_img from "./ichigo.png";

let all_product = [
  { id: 1, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", images: [p1_img], new_price: 50.0, old_price: 80.5 },
  { id: 2, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", images: [p2_img], new_price: 85.0, old_price: 120.5 },
  { id: 3, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", images: [p3_img], new_price: 60.0, old_price: 100.5 },
  { id: 4, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", images: [p4_img], new_price: 100.0, old_price: 150.0 },
  { id: 5, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", images: [p5_img], new_price: 85.0, old_price: 120.5 },
  { id: 6, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", images: [p6_img], new_price: 85.0, old_price: 120.5 },
  { id: 7, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", images: [p7_img], new_price: 85.0, old_price: 120.5 },
  { id: 8, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", images: [p8_img], new_price: 85.0, old_price: 120.5 },
  { id: 9, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", images: [p9_img], new_price: 85.0, old_price: 120.5 },
  { id: 10, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", images: [p10_img], new_price: 85.0, old_price: 120.5 },
  { id: 11, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", images: [p11_img], new_price: 85.0, old_price: 120.5 },
  { id: 12, name: "Striped Flutter Sleeve Overlap Collar Peplum Hem Blouse", category: "women", images: [p12_img], new_price: 85.0, old_price: 120.5 },
  { id: 13, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", images: [p13_img], new_price: 85.0, old_price: 120.5 },
  { id: 14, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", images: [p14_img], new_price: 85.0, old_price: 120.5 },
  { id: 15, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", images: [p15_img], new_price: 85.0, old_price: 120.5 },
  { id: 16, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", images: [p16_img], new_price: 85.0, old_price: 120.5 },
  { id: 17, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", images: [p17_img], new_price: 85.0, old_price: 120.5 },
  { id: 18, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", images: [p18_img], new_price: 85.0, old_price: 120.5 },
  { id: 19, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", images: [p19_img], new_price: 85.0, old_price: 120.5 },
  { id: 20, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", images: [p20_img], new_price: 85.0, old_price: 120.5 },
  { id: 21, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", images: [p21_img], new_price: 85.0, old_price: 120.5 },
  { id: 22, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", images: [p22_img], new_price: 85.0, old_price: 120.5 },
  { id: 23, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", images: [p23_img], new_price: 85.0, old_price: 120.5 },
  { id: 24, name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket", category: "men", images: [p24_img], new_price: 85.0, old_price: 120.5 },
  { id: 25, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", images: [p25_img], new_price: 85.0, old_price: 120.5 },
  { id: 26, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", images: [p26_img], new_price: 85.0, old_price: 120.5 },
  { id: 27, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", images: [p27_img], new_price: 85.0, old_price: 120.5 },
  { id: 28, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", images: [p28_img], new_price: 85.0, old_price: 120.5 },
  { id: 29, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", images: [p29_img], new_price: 85.0, old_price: 120.5 },
  { id: 30, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", images: [p30_img], new_price: 85.0, old_price: 120.5 },
  { id: 31, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", images: [p31_img], new_price: 85.0, old_price: 120.5 },
  { id: 32, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", images: [p32_img], new_price: 85.0, old_price: 120.5 },
  { id: 33, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", images: [p33_img], new_price: 85.0, old_price: 120.5 },
  { id: 34, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", images: [p34_img], new_price: 85.0, old_price: 120.5 },
  { id: 35, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", images: [p35_img], new_price: 85.0, old_price: 120.5 },
  { id: 36, name: "Boys Orange Colourblocked Hooded Sweatshirt", category: "kid", images: [p36_img], new_price: 85.0, old_price: 120.5 },
  { id: 37, name: "Luffy Action Figure", category: "One Piece", images: [ichigo_img], new_price: 899, old_price: 1299 },
  { id: 38, name: "Naruto Uzumaki Figure", category: "Naruto", images: [naruto_img], new_price: 799, old_price: 1199 },
  { id: 39, name: "Ichigo Kurosaki", category: "Bleach", images: [ichigo_img], new_price: 699, old_price: 999 },
];

export default all_product;
