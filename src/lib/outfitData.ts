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

const placeholder = "/placeholder.svg";

export interface OutfitPreset {
  id: string;
  name: string;
  imageUrl: string;
  prompt: string;
  seasons: string[];
}

export const outfitPresets: OutfitPreset[] = [
  {
    id: "blazer-checkered",
    name: "Blazer Xadrez",
    imageUrl: blazerCheckered,
    prompt:
      "Apply to the man: wear an elegant semi-formal outfit: a dark blue checkered blazer (distinct plaid pattern with thin light-blue lines), navy shirt with open collar (no tie), light-blue slim-fit trousers, and dark brown leather loafers. Add a small rust-colored lapel flower pin. Neutral gray studio background, soft cinematic lighting, realistic textures and fabric folds, natural skin tones. Full-body, eye-level, confident pose looking slightly sideways.",
    seasons: ["outono", "inverno"],
  },
  {
    id: "blazer-beige",
    name: "Blazer Bege",
    imageUrl: blazerBeige,
    prompt:
      "Apply to the man: wear a modern semi-formal outfit: a light beige blazer (smooth cotton texture, fitted cut), a dark green shirt with small geometric pattern and visible buttons, navy slim-fit trousers, and brown leather loafers with light soles. Add a dark belt and a wristwatch with brown strap. Neutral gray studio background, soft professional lighting, realistic fabric texture, natural pose walking slightly forward, confident expression looking to the side.",
    seasons: ["primavera", "outono"],
  },
  {
    id: "suit-gray-plaid",
    name: "Terno Xadrez Cinza",
    imageUrl: suitGrayPlaid,
    prompt:
      "Apply to the man: wear a light gray plaid suit with subtle brown and blue checks, slim-fit blazer and matching trousers, paired with a plain dark navy T-shirt (no collar, neatly fitted). Add white minimalist sneakers, dark sunglasses, and a silver wristwatch. Urban daylight background, casual walking pose, natural smile, modern streetwear-meets-formal aesthetic, realistic lighting and fabric texture.",
    seasons: ["primavera", "outono"],
  },
  {
    id: "suit-black-three-piece",
    name: "Terno Preto 3 Peças",
    imageUrl: suitBlackThreePiece,
    prompt:
      "Apply to the man: wear a classic black three-piece suit: black blazer, matching waistcoat, and tailored trousers with a crisp white dress shirt and a white silk tie. Add black leather dress shoes with a polished finish. Clean studio background with soft lighting, elegant and formal look, realistic fabric texture, refined silhouette, confident posture, straight stance.",
    seasons: ["outono", "inverno"],
  },
  {
    id: "suit-black-two-piece",
    name: "Terno Preto 2 Peças",
    imageUrl: suitBlackTwoPiece,
    prompt:
      "Apply to the man: wear a classic black two-piece suit: tailored black blazer and matching trousers paired with a white dress shirt, black tie, and a white pocket square. Add polished black leather oxford shoes. Neutral studio background, elegant formal style, perfect fit, clean silhouette, soft lighting, realistic fabric texture, professional posture.",
    seasons: ["outono", "inverno"],
  },
  {
    id: "suit-gray",
    name: "Terno Cinza",
    imageUrl: suitGray,
    prompt:
      "Apply to the man: wear a light gray two-piece suit: tailored blazer and matching trousers paired with a white dress shirt and a light gray patterned tie. Add black polished leather dress shoes. Neutral light background, elegant business-formal look, perfect fit, clean lines, soft lighting, realistic wool texture, composed posture.",
    seasons: ["primavera", "outono"],
  },
  {
    id: "polo-navy",
    name: "Polo Marinho",
    imageUrl: poloNavy,
    prompt:
      "Apply to the person: wear a casual smart outfit: a navy blue polo shirt with white horizontal stripes across the chest, paired with khaki chinos and white leather sneakers. Add a brown leather belt and a silver watch. Clean studio background, relaxed confident pose, natural lighting, realistic cotton fabric texture, weekend casual elegance.",
    seasons: ["primavera", "verao"],
  },
  {
    id: "blazer-white-linen",
    name: "Blazer Branco Linho",
    imageUrl: blazerWhiteLinen,
    prompt:
      "Apply to the person: wear an elegant summer outfit: a white linen blazer with a relaxed fit, paired with a light blue dress shirt (unbuttoned at the collar), beige linen trousers, and brown leather loafers without socks. Add a woven brown leather belt. Bright airy studio background, soft natural lighting, lightweight summer elegance, realistic linen texture with natural wrinkles.",
    seasons: ["verao", "primavera"],
  },
  {
    id: "shirt-burgundy",
    name: "Camisa Bordeaux",
    imageUrl: shirtBurgundy,
    prompt:
      "Apply to the person: wear a smart casual outfit: a deep burgundy red dress shirt with a slim fit, paired with dark navy trousers and black leather oxford shoes. Add a black leather belt and a silver wristwatch. Clean studio background, professional yet stylish look, soft warm lighting, realistic cotton fabric texture, confident standing pose.",
    seasons: ["outono", "inverno"],
  },
  {
    id: "blazer-green-velvet",
    name: "Blazer Verde Veludo",
    imageUrl: blazerGreenVelvet,
    prompt:
      "Apply to the person: wear a luxurious evening outfit: a dark emerald green velvet blazer with a slim fit and satin lapels, paired with a black dress shirt (buttoned to the top), black tailored trousers, and black patent leather shoes. Add a gold pocket square. Dark elegant studio background, dramatic soft lighting, rich velvet texture, sophisticated evening elegance.",
    seasons: ["outono", "inverno"],
  },
  {
    id: "overcoat-camel",
    name: "Sobretudo Caramelo",
    imageUrl: overcoatCamel,
    prompt:
      "Apply to the person: wear a classic winter outfit: a camel brown wool overcoat (long, double-breasted), paired with a dark gray turtleneck sweater, charcoal wool trousers, and dark brown leather boots. Add brown leather gloves. Urban winter street background, elegant sophisticated style, soft natural daylight, realistic wool texture, confident walking pose.",
    seasons: ["inverno"],
  },
  {
    id: "jacket-denim",
    name: "Jaqueta Jeans",
    imageUrl: jacketDenim,
    prompt:
      "Apply to the person: wear a casual street style outfit: a light blue denim jacket with classic metal buttons, paired with a white crew-neck t-shirt, dark indigo slim jeans, and white canvas sneakers. Add a simple leather bracelet. Urban outdoor background, relaxed casual vibe, natural daylight, realistic denim texture with authentic wear patterns.",
    seasons: ["primavera", "outono"],
  },
  // New female-focused options using placeholder thumbnail
  {
    id: "female-summer-dress",
    name: "Vestido Floral (F)",
    imageUrl: placeholder,
    prompt:
      "Apply to the woman: wear a knee-length floral summer dress with light flowy fabric, pastel pink and white pattern, short sleeves, and a cinched waist. Pair with nude strappy sandals and a straw handbag. Sunny outdoor terrace background, golden hour lighting, natural relaxed pose.",
    seasons: ["primavera", "verao"],
  },
  {
    id: "female-blazer-tailored",
    name: "Blazer Alfaiataria (F)",
    imageUrl: placeholder,
    prompt:
      "Apply to the woman: wear a tailored beige blazer over a white silk blouse, high-waisted black trousers with a slight flare, and black pointed-toe heels. Add a thin gold necklace and a structured tote bag. Modern corporate lobby background, soft professional lighting, confident standing pose.",
    seasons: ["primavera", "outono"],
  },
  {
    id: "female-casual-denim",
    name: "Casual Jeans & Tee (F)",
    imageUrl: placeholder,
    prompt:
      "Apply to the woman: wear a fitted white crew-neck t-shirt tucked into high-waisted light-wash jeans, with a cropped denim jacket and white leather sneakers. Add a simple silver bracelet. Urban daylight background, relaxed walking pose, realistic denim textures.",
    seasons: ["primavera", "outono"],
  },
  {
    id: "female-black-dress",
    name: "Vestido Preto Cocktail (F)",
    imageUrl: placeholder,
    prompt:
      "Apply to the woman: wear an elegant knee-length black cocktail dress with a subtle V-neck and cap sleeves, paired with black stiletto heels and a slim metallic belt. Add small stud earrings and a clutch. Evening indoor background with soft warm spotlights, refined posture.",
    seasons: ["outono", "inverno"],
  },
  {
    id: "female-athleisure",
    name: "Athleisure (F)",
    imageUrl: placeholder,
    prompt:
      "Apply to the woman: wear a matching sage-green athleisure set (long-line sports bra and high-waisted leggings) with a lightweight zip hoodie and white running shoes. Add a smart fitness watch. Minimal studio background, bright even lighting, active stance.",
    seasons: ["primavera", "verao"],
  },
  {
    id: "female-power-suit",
    name: "Terno Feminino Grafite (F)",
    imageUrl: placeholder,
    prompt:
      "Apply to the woman: wear a graphite tailored pantsuit with a fitted blazer and tapered trousers, paired with a cream silk blouse and black loafers. Add a black leather belt and a slim laptop sleeve. Clean studio background, professional pose, realistic wool texture.",
    seasons: ["outono", "inverno"],
  },
  {
    id: "female-boho",
    name: "Boho Chic (F)",
    imageUrl: placeholder,
    prompt:
      "Apply to the woman: wear a boho outfit with a white lace blouse, flowing midi skirt in earthy tones, tan ankle boots, and layered necklaces. Add a wide-brim hat. Outdoor garden background, soft natural light, relaxed stance.",
    seasons: ["primavera", "outono"],
  },
  {
    id: "female-streetstyle",
    name: "Street Style (F)",
    imageUrl: placeholder,
    prompt:
      "Apply to the woman: wear an oversized black leather jacket over a gray crop top, high-waisted black cargo pants, and chunky white sneakers. Add a small crossbody bag. Urban street background, cool confident pose.",
    seasons: ["outono", "inverno"],
  }
];
