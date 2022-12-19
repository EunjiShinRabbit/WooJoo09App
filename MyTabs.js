import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    // 탭 전체적인 형테 설정
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
          position: 'absolute',
          activeTintColor: '#e91e63',
          // #8679d9
          tabBarStyle: {
              height: 60,
              paddingTop: 8,
              paddingBottom: 8,
          }
      }}
      tabBarOptions = {{
        activeTintColor: "#8679d9",
      }}
      >
        {/* 아래부터는 하단 탭바 설정 */}
      <Tab.Screen name="홈" component={HomeMenu}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen name="검색" component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      /> */}
      <Tab.Screen name="등록" component={Write}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="pencil" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="우주톡" component={Chatting}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-sharp" color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen name="MY" component={MyPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-sharp" color={color} size={size} />
          ),
        }}
       />
    </Tab.Navigator>
  );
}

function HomeMenu({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // 첫번째 화면 띄우기
  useFocusEffect(
      React.useCallback(() => {
          webViewRef.current.injectJavaScript('location.href="' + 'http://13.209.198.107/' + '"');
          console.log("useFocusEffect : google.co.kr");
          setLoading(false);
      }, [])
  );

  // 로딩중이면 로딩 애니메이션 띄우기
  function LoadAnimation() {
      return (<Spinner visible={loading} />)
  }

  return (
      <SafeAreaView style={styles.container}>
          <WebView
              ref={webViewRef}
              onLoad={() => setLoading(false)}
              source={{ uri: 'http://13.209.198.107/' }}
          />
          {loading && <LoadAnimation />}
      </SafeAreaView>
  )
}

// function Search({ navigation }) {
//   const webViewRef = useRef(null);
//   const [loading, setLoading] = useState(true);

//   function LoadAnimation() {
//       return (<Spinner visible={loading} />)
//   }

//   return (
//       <SafeAreaView style={styles.container}>
//           <Text>안녕하세요. 여기는 Search 입니다.</Text>
//       </SafeAreaView>
//   )
// }

function Write({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
      return (<Spinner visible={loading} />)
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView
          ref={webViewRef}
          onLoad={() => setLoading(false)}
          source={{ uri: 'http://13.209.198.107/write' }}
      />
      {loading && <LoadAnimation />}
    </SafeAreaView>
  )
}

function Chatting({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
      return (<Spinner visible={loading} />)
  }

  return (
    <SafeAreaView style={styles.container}>
    <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: 'http://13.209.198.107/chat' }}
    />
    {loading && <LoadAnimation />}
  </SafeAreaView>
  )
}

function MyPage({ navigation }) {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);

  function LoadAnimation() {
      return (<Spinner visible={loading} />)
  }

  return (
    <SafeAreaView style={styles.container}>
    <WebView
        ref={webViewRef}
        onLoad={() => setLoading(false)}
        source={{ uri: 'http://13.209.198.107/member' }}
    />
    {loading && <LoadAnimation />}
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // 전체 영역을 다 잡는다는 것 flex 1
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
},
  text: { fontSize: 28, color: 'white' },
  icon: { fontSize: 36, color: 'white' },
})