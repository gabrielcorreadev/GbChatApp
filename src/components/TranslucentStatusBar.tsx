import * as React from 'react';
import { Platform, StatusBar, StyleSheet, ImageBackground } from "react-native";

export function TranslucentStatusBar(props: any) {

    React.useEffect(() => {
        StatusBar.setBarStyle("light-content");
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor("rgba(0,0,0,0)");
            StatusBar.setTranslucent(true);
        }
    }, []);

    return <StatusBar />;
}