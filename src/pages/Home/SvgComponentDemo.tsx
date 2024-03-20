import SvgIcon from "../../components/SvgIcon";
import ZanIcon from "../../assets/icons/zan_no_color.svg?react";

function SvgComponentDemo() {
  return (
    <div>
      - svg封装组件使用：
      <ZanIcon className="icon" color="red" />
      {/* 样式与组件内联样式  */}
      <SvgIcon name="zan_no_color" className="icon" color="red" />
    </div>
  );
}

export default SvgComponentDemo;
