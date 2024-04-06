// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";

// To learn more about using "swc-react" visit:
// https://opensource.adobe.com/spectrum-web-components/using-swc-react/
import { Button } from "@swc-react/button";
import { Theme } from "@swc-react/theme";
import { FieldLabel } from "@swc-react/field-label";
import { Textfield } from "@swc-react/textfield";
import { Slider } from "@swc-react/slider";
import React from "react";
import katex from "katex";
import "./App.css";

const App = ({ addOnUISdk, sandboxProxy }) => {
	async function generateImage() {
		const latexInputField = document.getElementById("latex");
		const latexExpression = latexInputField.value;
		try {
			const blob = await fetch("https://t4.ftcdn.net/jpg/00/53/45/31/360_F_53453175_hVgYVz0WmvOXPd9CNzaUcwcibiGao3CL.jpg").then((response) => response.blob());
			const { document } = addOnUISdk.app;
			document.addImage(blob);
		} catch (error) {
			console.log("Failed to add generated image");
		}
	};

    function previewKatex () {
        var element = document.getElementById("mathpreview");
        katex.render(String.raw`c = \pm\sqrt{a^2 + b^2}`, element, {
            throwOnError: false,
            output: "mathml",
            displayMode: true
        });
        console.log(element);

    }

    return (
        // Please note that the below "<Theme>" component does not react to theme changes in Express.
        // You may use "addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        <Theme theme="express" scale="medium" color="light">
			<div className="container">
				<FieldLabel for="latex" size="l">
					LaTeX
				</FieldLabel>
				<Textfield id="latex" size="m" placeholder="Enter LaTeX expression">
				</Textfield>
			</div>
            <div className="container" id="mathpreview">
            </div>
            <div className="container">
                <Button onClick={previewKatex} size="l">
                    Preview
                </Button>
            </div>
			<div className="container">
				<FieldLabel for="slider" size="l">
					Font Size
				</FieldLabel>
				<Slider editable>
				</Slider>
			</div>
            <div className="container">
                <Button onClick={generateImage} size="l">
                    Add to design
                </Button>
            </div>
        </Theme>
    );
};

export default App;
