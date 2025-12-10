import blazerCheckered from "@/assets/blazer-checkered.png";
import blazerBeige from "@/assets/blazer-beige.png";
import suitGrayPlaid from "@/assets/suit-gray-plaid.png";
import suitBlackThreePiece from "@/assets/suit-black-three-piece.png";
import suitBlackTwoPiece from "@/assets/suit-black-two-piece.png";
import suitGray from "@/assets/suit-gray.png";
import poloNavy from "@/assets/polo-navy.png";
import blazerWhiteLinen from "@/assets/blazer-white-linen.png";
import shirtBurgundy from "@/assets/shirt-burgundy.png";
import blazerGreenVelvet from "@/assets/blazer-green-velvet.png";
import overcoatCamel from "@/assets/overcoat-camel.png";
import jacketDenim from "@/assets/jacket-denim.png";

export interface OutfitPreset {
  id: string;
  name: string;
  imageUrl: string;
  prompt: string;
}

export const outfitPresets: OutfitPreset[] = [
  {
    id: "blazer-checkered",
    name: "Blazer Xadrez",
    imageUrl: blazerCheckered,
    prompt: "Apply to the man: wear an elegant semi-formal outfit — a dark blue checkered blazer (distinct plaid pattern with thin light-blue lines), navy shirt with open collar (no tie), light-blue slim-fit trousers, and dark brown leather loafers. Add a small rust-colored lapel flower pin. Neutral gray studio background, soft cinematic lighting, realistic textures and fabric folds, natural skin tones. Full-body, eye-level, confident pose looking slightly sideways."
  },
  {
    id: "blazer-beige",
    name: "Blazer Bege",
    imageUrl: blazerBeige,
    prompt: "Apply to the man: wear a modern semi-formal outfit — a light beige blazer (smooth cotton texture, fitted cut), a dark green shirt with small geometric pattern and buttons visible, navy slim-fit trousers, and brown leather loafers with light soles. Add a dark belt and a wristwatch with brown strap. Neutral gray studio background, soft professional lighting, realistic fabric texture, natural pose walking slightly forward, confident expression looking to the side."
  },
  {
    id: "suit-gray-plaid",
    name: "Terno Xadrez Cinza",
    imageUrl: suitGrayPlaid,
    prompt: "Apply to the man: wear a light gray plaid suit with subtle brown and blue checks, slim-fit blazer and matching trousers, paired with a plain dark navy T-shirt (no collar, neatly fitted). Add white minimalist sneakers, dark sunglasses, and a silver wristwatch. Urban daylight background, casual walking pose, natural smile, modern streetwear-meets-formal aesthetic, realistic lighting and fabric texture."
  },
  {
    id: "suit-black-three-piece",
    name: "Terno Preto 3 Peças",
    imageUrl: suitBlackThreePiece,
    prompt: "Apply to the man: wear a classic black three-piece suit — black blazer, matching waistcoat, and tailored trousers — with a crisp white dress shirt and a white silk tie. Add black leather dress shoes with a polished finish. Clean studio background with soft lighting, elegant and formal look, realistic fabric texture, refined silhouette, confident posture, straight stance."
  },
  {
    id: "suit-black-two-piece",
    name: "Terno Preto 2 Peças",
    imageUrl: suitBlackTwoPiece,
    prompt: "Apply to the man: wear a classic black two-piece suit — tailored black blazer and matching trousers — paired with a white dress shirt, black tie, and a white pocket square. Add polished black leather oxford shoes. Neutral studio background, elegant formal style, perfect fit, clean silhouette, soft lighting, realistic fabric texture, professional posture."
  },
  {
    id: "suit-gray",
    name: "Terno Cinza",
    imageUrl: suitGray,
    prompt: "Apply to the man: wear a light gray two-piece suit — tailored blazer and matching trousers — paired with a white dress shirt and a light gray patterned tie. Add black polished leather dress shoes. Neutral light background, elegant business-formal look, perfect fit, clean lines, soft lighting, realistic wool texture, composed posture."
  },
  {
    id: "polo-navy",
    name: "Polo Marinho",
    imageUrl: poloNavy,
    prompt: "Apply to the person: wear a casual smart outfit — a navy blue polo shirt with white horizontal stripes across the chest, paired with khaki chinos and white leather sneakers. Add a brown leather belt and a silver watch. Clean studio background, relaxed confident pose, natural lighting, realistic cotton fabric texture, weekend casual elegance."
  },
  {
    id: "blazer-white-linen",
    name: "Blazer Branco Linho",
    imageUrl: blazerWhiteLinen,
    prompt: "Apply to the person: wear an elegant summer outfit — a white linen blazer with a relaxed fit, paired with a light blue dress shirt (unbuttoned at the collar), beige linen trousers, and brown leather loafers without socks. Add a woven brown leather belt. Bright airy studio background, soft natural lighting, lightweight summer elegance, realistic linen texture with natural wrinkles."
  },
  {
    id: "shirt-burgundy",
    name: "Camisa Bordô",
    imageUrl: shirtBurgundy,
    prompt: "Apply to the person: wear a smart casual outfit — a deep burgundy red dress shirt with a slim fit, paired with dark navy trousers and black leather oxford shoes. Add a black leather belt and a silver wristwatch. Clean studio background, professional yet stylish look, soft warm lighting, realistic cotton fabric texture, confident standing pose."
  },
  {
    id: "blazer-green-velvet",
    name: "Blazer Verde Veludo",
    imageUrl: blazerGreenVelvet,
    prompt: "Apply to the person: wear a luxurious evening outfit — a dark emerald green velvet blazer with a slim fit and satin lapels, paired with a black dress shirt (buttoned to the top), black tailored trousers, and black patent leather shoes. Add a gold pocket square. Dark elegant studio background, dramatic soft lighting, rich velvet texture, sophisticated evening elegance."
  },
  {
    id: "overcoat-camel",
    name: "Sobretudo Caramelo",
    imageUrl: overcoatCamel,
    prompt: "Apply to the person: wear a classic winter outfit — a camel brown wool overcoat (long, double-breasted), paired with a dark gray turtleneck sweater, charcoal wool trousers, and dark brown leather boots. Add brown leather gloves. Urban winter street background, elegant sophisticated style, soft natural daylight, realistic wool texture, confident walking pose."
  },
  {
    id: "jacket-denim",
    name: "Jaqueta Jeans",
    imageUrl: jacketDenim,
    prompt: "Apply to the person: wear a casual street style outfit — a light blue denim jacket with classic metal buttons, paired with a white crew-neck t-shirt, dark indigo slim jeans, and white canvas sneakers. Add a simple leather bracelet. Urban outdoor background, relaxed casual vibe, natural daylight, realistic denim texture with authentic wear patterns."
  }
];
