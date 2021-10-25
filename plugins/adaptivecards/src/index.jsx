import * as React from 'react';
import AdaptiveCard from 'react-adaptivecards';

import { updateAdaptiveCardCSSCheaply } from './styles';

const AdaptiveCards = (props) => {
    const { theme, onSendMessage, message } = props;

    React.useEffect(() => {
        updateAdaptiveCardCSSCheaply(theme);
    }, []);

    const cardPayload = message.data._plugin.payload;
    const altText = message.data._plugin.altText;

    const card = React.useMemo(() => {
        const onActionSubmit = (params) => {
            onSendMessage("", { "adaptivecards": params && params.data });
        }

        const hostConfig = {
            "fontFamily": theme.fontFamily
        }

        return (
            <AdaptiveCard
                payload={cardPayload}
                onActionSubmit={onActionSubmit}
                hostConfig={hostConfig}
                altText={altText}
            />
        );
    }, [cardPayload]);

    return (
        <div className='adaptivecard-wrapper'>
            {card}
        </div>
    )
}

const adaptivecardsPlugin = {
    match: 'adaptivecards',
    component: AdaptiveCards,
    options: {
        fullwidth: true
    }
}

if (!window.cognigyWebchatMessagePlugins) {
    window.cognigyWebchatMessagePlugins = []
}

window.cognigyWebchatMessagePlugins.push(adaptivecardsPlugin);
