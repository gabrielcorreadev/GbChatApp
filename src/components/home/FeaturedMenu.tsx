import React from "react"
import { Square, Box, Image, ZStack, Icon } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const FeaturedStory = ({ backgroundImage, bg, title }: any) => (
    <Square height={200} width="140" rounded="10" bg={bg}>
    <ZStack alignItems="center" justifyContent="center">
      {backgroundImage ?
          <Image
            source={{
              uri: backgroundImage,
            }}
            alt="teste"
            height="200" width="140" 
            rounded="10"
          />  
      : null}
      {backgroundImage ? <Box backgroundColor="#00000078" height="200" width="140" rounded="10" /> : null}
      <Box
      flex={1}
      alignItems="center"
      justifyContent="flex-end"
        _text={{
          fontWeight: "bold",
          fontSize: "md",
          color: "white",
        }}

      >
        {title}
      </Box>
    </ZStack>
  </Square>
);