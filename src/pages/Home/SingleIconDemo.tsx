import zanImg from "../../assets/images/zan.png";
import likeEasyicoImg from "../../assets/images/like__easyico.png";
import zanIcon from "../../assets/icons/zan.svg";
import likeEasyicoIcon from "../../assets/icons/like__easyico.svg";

export default function singleIconDemo() {
  return (
    <p>
      - Icon 单个使用：
      <img src={likeEasyicoImg} className="icon-img" />
      <img src={zanImg} className="icon-img" />
      <img src={likeEasyicoIcon} className="icon-img" />
      <img src={zanIcon} className="icon-img" />
    </p>
  );
}
