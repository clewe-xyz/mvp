import finance from "@/images/skills/finance.png";
import blockchain from "@/images/skills/blockchain.png";
import dao from "@/images/skills/daos.png";
import tokens from "@/images/skills/tokens.png";
import Image from "next/image";

type Props = {
  className?: string;
  tag: string;
};

export default function SkillImage({ tag, className }: Props) {
  switch (tag) {
    case "finance":
      return <Image className={className} src={finance} alt="Finance skill" />;
    case "blockchain":
      return (
        <Image className={className} src={blockchain} alt="Blockchain skill" />
      );
    case "dao":
      return <Image className={className} src={dao} alt="DAOs skill" />;
    case "tokens":
      return (
        <Image className={className} src={tokens} alt="Tokenomics skill" />
      );
    default:
      break;
  }
  return null;
}
