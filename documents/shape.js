const skill = require('../data/skill.json');
module.exports = (shape) => {
    const {
        name,
        family,
        image,
        landingURL,
        Price
    } = shape;

    return {
        type: 'Alexa.Presentation.APL.RenderDocument',
        token: 'shape-composition',
        "document": {
            "type": "APL",
            "version": "1.0",
            "theme": "light",
            "import": [
                {
                    name: 'alexa-styles',
                    version: '1.0.0-beta'
                },
                {
                    "name": "alexa-layouts",
                    "version": "1.0.0"
                }
            ],
            "resources": [
                {
                    "description": "Stock color for the light theme",
                    "colors": {
                        "colorTextPrimary": "#eef0f0"
                    }
                },
                {
                    "description": "Stock color for the dark theme",
                    "when": "${viewport.theme == 'dark'}",
                    "colors": {
                        "colorTextPrimary": "#eef0f0"
                    }
                },
                {
                    "description": "Standard font sizes",
                    "dimensions": {
                        "textSizeBody": 20,
                        "textSizePrimary": 15,
                        "textSizeSecondary": 23,
                        "textSizeSecondaryHint": 25
                    }
                },
                {
                    "description": "Common spacing values",
                    "dimensions": {
                        "spacingThin": 6,
                        "spacingSmall": 12,
                        "spacingMedium": 24,
                        "spacingLarge": 48,
                        "spacingExtraLarge": 72
                    }
                },
                {
                    "description": "Common margins and padding",
                    "dimensions": {
                        "marginTop": 40,
                        "marginLeft": 60,
                        "marginRight": 60,
                        "marginBottom": 40
                    }
                }
            ],
            "styles": {
                "textStyleBase": {
                    "description": "Base font description; set color and core font family",
                    "values": [
                        {
                            "color": "@colorTextPrimary",
                            "fontFamily": "Amazon Ember"
                        }
                    ]
                },
                "textStyleBase0": {
                    "description": "Thin version of basic font",
                    "extend": "textStyleBase",
                    "values": {
                        "fontWeight": "100"
                    }
                },
                "textStyleBase1": {
                    "description": "Light version of basic font",
                    "extend": "textStyleBase",
                    "values": {
                        "fontWeight": "300",
                        "color": "#2ca32f"
                    }
                },
                "mixinBody": {
                    "values": {
                        "fontSize": "@textSizeBody"
                    }
                },
                "mixinPrimary": {
                    "values": {
                        "fontSize": "@textSizePrimary"
                    }
                },
                "mixinSecondary": {
                    "values": {
                        "fontSize": "@textSizeSecondary"
                    }
                },
                "textStylePrimary": {
                    "extend": [
                        "textStyleBase1",
                        "mixinPrimary"
                    ]
                },
                "textStyleSecondary": {
                    "extend": [
                        "textStyleBase0",
                        "mixinSecondary"
                    ]
                },
                "textStyleBody": {
                    "extend": [
                        "textStyleBase1",
                        "mixinBody"
                    ]
                },
                "textStyleSecondaryHint": {
                    "values": {
                        "fontFamily": "Bookerly",
                        "fontStyle": "italic",
                        "fontSize": "@textSizeSecondaryHint",
                        "color": "@colorTextPrimary"
                    }
                }
            },
            "layouts": {},
            "mainTemplate": {
                "parameters": [
                    "payload"
                ],
                "items": [
                    {
                        "type": "TouchWrapper",
                        "onPress": {
                            "type": "SendEvent",
                            "arguments": ["startEvent"]
                        },
                        items: [
                            {
                            "when": "${viewport.shape == 'round'}",
                            "type": "Container",
                            "direction": "column",
                            "width": "100vw",
                            "height": "100vh",
                            "alignItems": "center",
                            "justifyContent": "center",
                            "items": [
                                {
                                    "type": "Image",
                                    "source": "${payload.data.properties.trueBackgroundImage.sources[0].url}",
                                    "scale": "best-fill",
                                    "position": "absolute",
                                    "width": "100vw",
                                    "height": "100vh"
                                },
                                {
                                    "type": "ScrollView",
                                    "width": "100vw",
                                    "height": "100vh",
                                    "item": [
                                        {
                                            "type": "Container",
                                            "direction": "column",
                                            "alignItems": "center",
                                            "paddingLeft": 40,
                                            "paddingRight": 40,
                                            "paddingTop": 10,
                                            "paddingBottom": 5,
                                            "items": [
                                                {
                                                    "type": "AlexaHeader",
                                                },
                                                {
                                                    "type": "Text",
                                                    "text": "<b>${payload.data.properties.textContent.title.text}</b>",
                                                    "style": "textStyleBody",
                                                    "width": "90vw",
                                                    "paddingTop": 70,
                                                    "textAlign": "center"
                                                },
                                                {
                                                    "type": "Text",
                                                    "text": "${payload.data.properties.textContent.subtitle.text}",
                                                    "style": "textStylePrimary",
                                                    "width": "90vw",
                                                    "textAlign": "center"
                                                },
                                                {
                                                    "type": "Text",
                                                    "text": "${payload.data.properties.textContent.primaryText.text}",
                                                    "paddingTop": 100,
                                                    "style": "textStylePrimary",
                                                    "width": "90vw",
                                                    "textAlign": "center"
                                                },
                                                {
                                                    "type": "Image",
                                                    "source": "${payload.data.properties.image.sources[0].url}",
                                                    "paddingBottom": 150,
                                                    "scale": "best-fit",
                                                    "width": "40vw",
                                                    "height": "30vh",
                                                    "position": "absolute",
                                                },
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                            {
                                "type": "Container",
                                "width": "100vw",
                                "height": "100vh",
                                "items": [
                                    {
                                        "type": "Image",
                                        "source": "${payload.data.properties.backgroundImage.sources[0].url}",
                                        "scale": "best-fill",
                                        "width": "100vw",
                                        "height": "100vh",
                                        "position": "absolute"
                                    },
                                    {
                                        "type": "AlexaHeader",
                                        "headerTitle": "${payload.data.properties.title}",
//                            "headerAttributionImage": "${payload.data.properties.logoUrl}"
                                    },
                                    {
                                        "type": "Container",
                                        "direction": "row",
                                        "paddingLeft": 40,
                                        "paddingRight": 72,
                                        "grow": 1,
                                        "items": [
                                            {
                                                "type": "Image",
                                                "source": "${payload.data.properties.image.sources[0].url}",
                                                "width": 340,
                                                "height": 360,
                                                "scale": "best-fit",
                                                "align": "center"
                                            },
                                            {
                                                "type": "ScrollView",
                                                "height": "60vh",
                                                "shrink": 1,
                                                "item": [
                                                    {
                                                        "type": "Container",
                                                        "items": [
                                                            {
                                                                "type": "Text",
                                                                "text": "<b>${payload.data.properties.textContent.title.text}</b>",
                                                                "style": "textStyleBody"
                                                            },
                                                            {
                                                                "type": "Text",
                                                                "text": "${payload.data.properties.textContent.subtitle.text}",
                                                                "style": "textStylePrimary"
                                                            },
                                                            {
                                                                "type": "Text",
                                                                "text": "${payload.data.properties.textContent.primaryText.text}",
                                                                "paddingTop": 40,
                                                                "style": "textStylePrimary"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }]
            }
        },
        "datasources": {
            "data": {
                "type": "object",
                properties: {
                    "trueBackgroundImage": {
                        "contentDescription": null,
                        "smallSourceUrl": null,
                        "largeSourceUrl": null,
                        "sources": [
                            {
                                "url": skill.dealbackground,
                                "size": "small",
                                "widthPixels": 0,
                                "heightPixels": 0
                            },
                            {
                                "url": skill.dealbackground,
                                "size": "large",
                                "widthPixels": 0,
                                "heightPixels": 0
                            }
                        ]
                    },
                    "backgroundImage": {
                        "sources": [
                            {
                                "url": skill.dealbackground,
                                "size": "small",
                                "widthPixels": 0,
                                "heightPixels": 0
                            },
                            {
                                "url": skill.dealbackground,
                                "size": "large",
                                "widthPixels": 0,
                                "heightPixels": 0
                            }
                        ]
                    },
                    "title": skill.title_display,
                    "image": {
                        "sources": [
                            {
                                "url": image,
                                "size": "small",
                                "widthPixels": 0,
                                "heightPixels": 0
                            },
                            {
                                "url": image,
                                "size": "large",
                                "widthPixels": 0,
                                "heightPixels": 0
                            }
                        ]
                    },
                    "textContent": {
                        "title": {
                            "type": "PlainText",
                            "text": name
                        },
                        "subtitle": {
                            "type": "PlainText",
                            "text": Price
                        },
                        "primaryText": {
                            "type": "PlainText",
                            "text": ""
                        },
                    },
//                "logoUrl": skill.logo,
                    "hintText": skill.hint
                }
            }
        }
    };
};
