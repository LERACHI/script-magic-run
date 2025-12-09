import blazerCheckered from "@/assets/blazer-checkered.png";
import blazerBeige from "@/assets/blazer-beige.png";
import suitGrayPlaid from "@/assets/suit-gray-plaid.png";
import suitBlackThreePiece from "@/assets/suit-black-three-piece.png";
import suitBlackTwoPiece from "@/assets/suit-black-two-piece.png";
import suitGray from "@/assets/suit-gray.png";

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
  }
];