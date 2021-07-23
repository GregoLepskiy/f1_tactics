import {useCallback, useEffect, useState} from "react";
import {NativeModules, Platform} from "react-native";
import setupTitles from '../json/SettingsNames.json';
import colorsJSON from '../json/Colors.json';

export const useImage = () => {
    const [load, setLoaded] = useState(false);
    const [images, setImages] = useState([]);
    const [teams, setTeams] = useState([]);
    const [gpTitles, setGPTitles] = useState([]);
    const [colors, setColors] = useState([]);
    const [language, setLanguage] = useState([]);
    const imgLoad = useCallback(() => {
        return [
            require('./HYPERSOFT.png'),
            require('./ULTRASOFT.png'),
            require('./SUPERSOFT.png'),
            require('./SOFT.png'),
            require('./MEDIUM.png'),
            require('./HARD.png'),
            require('./SUPERHARD.png'),
            require('./INTERMEDIATE.png'),
            require('./WET.png')
        ];
    }, []);

    const teamLoad = useCallback(() => {
        return [
            require('./ferrari.png'),
            require('./mercedes.png'),
            require('./red_bull.png'),
            require('./mclaren.png'),
            require('./racing_point.png'),
            require('./renault.png'),
            require('./toro_rosso.png'),
            require('./sauber.png'),
            require('./haas.png'),
            require('./williams.png')
        ];
    }, []);

    const languageLoad = useCallback(() => {
        const lang = (NativeModules.I18nManager.localeIdentifier).split('_')[0];
        if (lang === 'en') return setupTitles[1].titles;
        else if (lang === 'ru') return setupTitles[0].titles;
        else return [];
    }, []);

    useEffect(() => {
        setImages(imgLoad());
        setTeams(teamLoad());
        setLanguage(languageLoad());
        setColors(colorsJSON);
        setLoaded(true);
    }, [imgLoad, teamLoad, languageLoad, load]);

    return { load, tyres : images, teams, setupTitles : language, colors };
}