import { Center, Image, View } from "native-base";
import React from "react";

export function SplashScreen() {
    return (
        <View bg="primary.900" flex="1">
            <Center
                bg="primary.900"
                flex="1"
            >
                <Image
                    source={require('../assets/app/logo.png')}
                    width="158"
                    height="158"
                    size={'md'}

                    alt="Alternate Text"
                />
            </Center>
        </View>
    )
}