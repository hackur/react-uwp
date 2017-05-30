import * as React from "react";
import * as PropTypes from "prop-types";

import Theme from "react-uwp/Theme";
import getTheme from "react-uwp/styles/getTheme";

export interface DoubleThemeRenderProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  themeStyle?: React.CSSProperties;
  useBorder?: boolean;
  useChromeColor?: boolean;
}

export default class DoubleThemeRender extends React.Component<DoubleThemeRenderProps, void> {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const { children, direction, themeStyle, useBorder, useChromeColor, ...attributes } = this.props;
    const darkTheme = getTheme("Dark", this.context.theme.accent);
    const { prepareStyles } = darkTheme;
    const lightTheme = getTheme("Light", this.context.theme.accent);
    const isColumn = direction === "column";
    const currThemeStyle: React.CSSProperties = prepareStyles({
      width: "50%",
      padding: "0 4px",
      minHeight: 240,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...themeStyle
    });

    return (
      <div
        {...attributes}
        style={prepareStyles({
          display: "flex",
          flexDirection: isColumn ? "column" : "row",
          border: useBorder ? `1px solid ${darkTheme.listAccentLow}` : void 0,
          ...attributes.style
        })}
      >
        <Theme
          theme={darkTheme}
          style={prepareStyles({
            background: useChromeColor ? darkTheme.chromeLow : darkTheme.altHigh,
            ...prepareStyles({
              width: "50%",
              padding: "0 4px",
              minHeight: 240,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...currThemeStyle
            })
          })}
        >
          {children}
        </Theme>
        <Theme
          theme={lightTheme}
          style={prepareStyles({
            background: useChromeColor ? lightTheme.chromeLow : lightTheme.altHigh,
            ...currThemeStyle
          })}
        >
          {children}
        </Theme>
      </div>
    );
  }
}