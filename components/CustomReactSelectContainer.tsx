import { ReactElement } from "react";
import { components as components } from "react-select";
import { getImgStratsDota } from "../share";
import { ItemList } from "../share/reactSelectData";
import MyImage from "./MyImage";
export const CustomValueContainer = (props: any) => {
  const length = props.getValue().length;
  const children = props.children;
  let [values, input] = children as any;
  let finalValue: ReactElement | null = null;
  let countAnothers = 0;
  if (Array.isArray(values)) {
    const val = (i: number): ReactElement => values[i].props.children;
    const { length } = values;
    switch (length) {
      case 1:
        finalValue = val(0);
        break;
      default:
        finalValue = val(0);
        countAnothers = length - 1;
        break;
    }
  }
  return (
    <components.ValueContainer {...props}>
      <div className="flex items-center">
        {finalValue}
        {countAnothers > 0 && (
          <span className="ml-2 text-xs">+{countAnothers}</span>
        )}
      </div>
    </components.ValueContainer>
  );
};

export const FormatOptionLabel = ({
  value,
  label,
  customAbbreviation,
  img = true,
  size = "35px",
}: ItemList) => (
  <div className="flex items-center text-sm ">
    <div className="w-[40px]">
      {customAbbreviation && (
        <MyImage
          src={img ? getImgStratsDota(customAbbreviation) : customAbbreviation}
          width={size}
          height={size}
          alt=""
        />
      )}
    </div>
    <div className="one-line-max">{label}</div>
  </div>
);
