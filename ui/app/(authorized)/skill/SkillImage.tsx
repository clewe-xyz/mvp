import blockchain from "@/images/skills/blockchain.png";
import dao from "@/images/skills/daos.png";
import finance from "@/images/skills/finance.png";
import tokens from "@/images/skills/tokens.png";
import Image from "next/image";

type Props = {
  className?: string;
  tag: string;
  height?: number;
  width?: number;
};

export function SkillImage({ tag, className, height, width }: Props) {
  switch (tag) {
    case "finance-fundamentals":
      return (
        <Image
          className={className}
          src={finance}
          height={height}
          width={width}
          alt="Finance skill"
        />
      );
    case "blockchain":
      return (
        <Image
          className={className}
          src={blockchain}
          height={height}
          width={width}
          alt="Blockchain skill"
        />
      );
    case "dao":
      return (
        <Image
          className={className}
          src={dao}
          height={height}
          width={width}
          alt="DAOs skill"
        />
      );
    case "crypto-wallets":
      return (
        <Image
          className={className}
          src={tokens}
          height={height}
          width={width}
          alt="Tokenomics skill"
        />
      );
    default:
      break;
  }
  return null;
}
