import {useEffect, useState} from "react";
import * as Font from "expo-font";

export const useFont = () => {
    const [loaded, setLoaded] = useState(false);

    const fontLoaded = async () => {
        await Font.loadAsync({
            F1Regular: require('../assets/fonts/Formula1-Regular.otf'),
            F1Bold: require('../assets/fonts/Formula1-Bold.otf'),
            F1Wide: require('../assets/fonts/Formula1-Wide.otf'),
        });
    };

    useEffect(() => {
        fontLoaded().then(() =>
            setLoaded(true));
    }, [fontLoaded]);

    return { loaded };
}