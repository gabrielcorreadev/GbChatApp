import React from "react"
import { HStack, ScrollView, Stack, useColorModeValue, View } from "native-base";
import { FeaturedStory } from "../../components/home/FeaturedMenu";
import { FocusAwareStatusBar } from "../../components/FocusAwareStatusBar";
import Conversation from "./conversation/Conversation";

export default function Chat() {
  return (
    <View flex={1}>
      <FocusAwareStatusBar  />
<Stack padding={3}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <HStack space="4" padding="2">
          <FeaturedStory
            title="Novo"
            bg="blue.600"
          />
          <FeaturedStory
            backgroundImage="https://www.perfectczechwomen.com/wp-content/uploads/2019/04/New-Profile-30-500x572.jpg"
            title="Ana Clara"
            bg="blue.600"
          />
                    <FeaturedStory
            backgroundImage="https://www.perfectczechwomen.com/wp-content/uploads/2019/04/New-Profile-15-500x580.jpg"
            title="Fernanda Lima"
            bg="blue.600"
          />
          <FeaturedStory
            backgroundImage="https://www.perfectczechwomen.com/wp-content/uploads/2019/05/pavla.jpeg"
            title="Maria Julia"
            bg="blue.600"
          />
        </HStack>
      </ScrollView>
      <HStack padding="2">
        <Conversation />
      </HStack>
    </Stack>
    </View>
  )
}