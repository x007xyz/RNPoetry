我们的目标是使用`react-native`实现诗词墨客App，诗词墨客App的灵感来自于GitHub热门项目[chinese-poetry](https://github.com/chinese-poetry/chinese-poetry)和它的衍生项目[weapp-poem](https://github.com/huangjianke/weapp-poem/)，`chinese-poetry`项目是最全中华古诗词数据库, 唐宋两朝近一万四千古诗人, 接近5.5万首唐诗加26万宋诗. 两宋时期1564位词人，21050首词。我们的App将使用这些数据实现古诗词的推荐、列表展示、详情展示等功能，现在我们进行第一阶段的工作，项目的基本构建，这一个阶段我们主要会涉及到以下几个方面：
1. `react-native`调试
2. 使用`react-navigation`实现路由管理
3. 使用`react-native-vector-icons`实现图标

![效果图](https://user-gold-cdn.xitu.io/2020/1/1/16f60c061faff0cf?w=366&h=732&f=gif&s=3469787)
实现的功能主要有：
1. 开机显示欢迎页面，然后自动跳转首页
2. 首页竖排展示诗词
3. 诗词信息列表展示，点击跳转详情页面

# 开始

安装好`react-native`环境后，我们运行`react-native init RNPoetry`命令生成项目，进入目录运行`yarn run ios or android`命令后就可以启动项目，工欲善其事必先利其器，首先我们不急着进行项目的开发先来学习一下`react-native`中的调试技巧。

首先我们先了解一下RN的`Developer Menu`，`Developer Menu`是`react-native`给开发者定制的一个开发者菜单，来帮助开发者调试RN应用，在Android模拟器中通过快捷键`Command⌘ + M`来打开，在iOS模拟器中通过快捷键`Command⌘ + D`快速打开。`Developer Menu`中有很多选项其中我们常用的有:
1. `Reload`手动重新加载项目，在Android模拟器中快捷键为`R,R`，在iOS模拟器中快捷键为`Command⌘ + R`，重新加载的内容是js，如果涉及到原生的修改需要重新启动项目。
2. `Debug`启动js远程调试功能，会主动打开Chrome创建一个“http://localhost:8081/debugger-ui.”标签页，在该标签页打开开发者功能就可以对RN进行调试。
3. `Show Inspector` 这个功能和Chrome中的审查元素功能是一样的，主要是查看元素布局和样式，当你的样式和你想要的效果不一致的时候，可以使用该功能查找原因。
4. `Enable Live Reload`这个选项提供项目动态加载的功能。当你的js代码发生变化之后，RN会自动的生成bundle然后传输到模拟器或手机上。

了解了RN中的调试技巧后我们就正式进行入到项目的开发中吧！

# 安装需要的包
```
yarn add react-navigation react-native-reanimated react-native-gesture-handler react-native-screens react-navigation-stack react-navigation-tabs react-native-vector-icons
```

## react-navigation相关包的安装和配置

react-navigation是RN的常用的导航组件，我们运行命令`yarn add react-navigation`来安装`react-navigation`，然后运行` yarn add react-native-reanimated react-native-gesture-handler react-native-screens`来安装相关的依赖包，如果是iOS需要确保安装了Cocoapods然后运行命令：
```
cd ios
pod install
cd ..
```
在Android中为了完成`react-native-screens`的安装必须在android/app/build.gradle 中 dependencies 选项中添加下面这两行:
```
implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'
```
为了完成`react-native-gesture-handler`的安装必须在MainActivity.java 中做如下修改:
```java
package com.reactnavigation.example;

import com.facebook.react.ReactActivity;
<!--添加内容-->
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {
    @Override
    protected String getMainComponentName() {
        return "Example";
    }
    <!--添加内容-->
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
```
以上是在RN为0.6以上版本需要进行的操作，如果是0.6一下还需要link操作，具体查看[这里](https://reactnavigation.org/docs/zh-Hans/getting-started.html)。

使用`react-navigation`实现导航肯定会用到导航器，导航器也可以看成是⼀个普通的React组件，你可以通过导航器来定义你的APP中的导航结构。导航器还可以渲染通⽤用元素，例如可以配置的标题栏和选项卡栏。

在`react-navigation`中有多种类型的导航器以适应不同的应用场景：
* createStackNavigator:类似普通的Navigator，导航上⽅方导航栏
* createTabNavigator:已弃⽤用，使⽤用createBottomTabNavigator、
* createMaterialTopTabNavigator替代
* createBottomTabNavigator:相当于IOS⾥里里⾯面的UITabBarController，屏幕下⽅方的标签栏
* createMaterialTopTabNavigator:屏幕顶部的Material设计主题标签栏
* createDrawerNavigator:抽屉效果，侧边滑出
* createSwitchNavigator:SwitchNavigator的⽤用途是⼀一次只显示⼀一个⻚页⾯面，常⽤用于welcome⻚页⾯面或
者登陆⻚页⾯面，这种⻚页⾯面没有回退操作。

我们可以通过不同的导航器来创建App，可以选择其中的一个也可以多个组合，这个根据具体的场景选择使用。在我们的项目中我们将用到`createStackNavigator`来实现基本的页面跳转，`createBottomTabNavigator`实现底部标签栏导航，`createSwitchNavigator`来实现启动欢迎页面。其中除了`createSwitchNavigator`在我们已经安装的`react-navigation`中，`createStackNavigator`在`react-navigation-stack`中， `createBottomTabNavigator`在`react-navigation-tabs`中，所以我们需要再在项目中添加这两个项目：
```
yarn add react-navigation-stack react-navigation-tabs
```

## react-native-vector-icons的安装

[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)是一个图标组件库，包含了多个图标库，也支持自定义图标的使用。运行命令`yarn add react-native-vector-icons`
来安装它，然后进行link操作`react-native link react-native-vector-icons`，在安卓中使用需要在android/app/build.gradle中添加：
```
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```
在iOS中link操作可能报错，我碰到的错误如下：
```
Build system information
error: Multiple commands produce '/Users/zhangxiangchen/Code/demo/RNPoetry/ios/build/RNPoetry/Build/Products/Debug-iphonesimulator/RNPoetry.app/Entypo.ttf':
1) Target 'RNPoetry' (project 'RNPoetry') has copy command from '/Users/zhangxiangchen/Code/demo/RNPoetry/node_modules/react-native-vector-icons/Fonts/Entypo.ttf' to '/Users/zhangxiangchen/Code/demo/RNPoetry/ios/build/RNPoetry/Build/Products/Debug-iphonesimulator/RNPoetry.app/Entypo.ttf'
2) That command depends on command in Target 'RNPoetry' (project 'RNPoetry'): script phase “[CP] Copy Pods Resources”
```
解决方式是使用xcode打开项目，然后在 target -> Build phase > Copy Pods Resources -> Output Files，移除`${TARGET_BUILD_DIR}/${UNLOCALIZED_RESOURCES_FOLDER_PATH}`，这个问题可能是由于cocoaPod版本导致的，你也可以通过升级cocoaPod来解决
```
gem install cocoapods --pre
```
除了link方法你也可以通过其他方式引入字体文件，具体查看[官方文档](https://github.com/oblador/react-native-vector-icons)；link操作引起的问题也可能是其他情况，具体可以查看[这里](https://www.jianshu.com/p/fdb1421f3c8b)。

# 构建页面
增加的目录结构：
![](https://user-gold-cdn.xitu.io/2020/1/2/16f65caf495156ea?w=582&h=528&f=png&s=95640)
## 使用react-navigation构建路由
![](https://user-gold-cdn.xitu.io/2020/1/2/16f65b51bb206f79?w=732&h=411&f=png&s=24977)
我们启动App,首先进入一个欢迎页面Welcome，在欢迎页面停留2s后，跳转到主页面Main，Welcome我们只会在启动时打开，也不会需要跳转或返回这个页面，所以我们使用SwitchNavigator来实现的；Main是由Home、Poetry、My通过BottomTabNavigator来实现，他们通过底部导航栏进行跳转；然后每个Tab页面其实都是由StackNavigator来实现的。

我们先了解下`createStackNavigator`方法，`createStackNavigator(RouteConfigs, StackNavigatorConfig)`方法接收两个值：
* `RouteConfigs` (必选)：路路由配置对象是从路路由名称到路路由配置的映射，告诉导航器器该路路由呈现什什
么。
* `StackNavigatorConfig` (可选)：配置导航器器的路路由(如：默认⾸首屏，navigationOptions，paths
等)样式(如，转场模式mode、头部模式等)。

`RouteConfigs`支持三个参数screen 、path 以及navigationOptions ；
* `screen` (必选)：指定⼀个 React 组件作为屏幕的主要显示内容，当这个组件被
createStackNavigator加载时，它会被分配一个navigation prop。
* `navigationOptions` (可选)：⽤以配置全局的屏幕导航选项如：title、headerRight、headerLeft
等；

`StackNavigatorConfig`更加复杂，支持配置的参数很多，这里我们不详细列举，把我们会用到的一些参数说一下：

* `initialRouteName`: 设置默认的页面组件，必须是上面已注册的页面组件。
* `initialRouteParams`: 初始路由的参数。
* `initialRouteKey` - 初始路由的可选标识符。
* `defaultNavigationOptions`: 屏幕导航的默认选项。
* `navigationOptions`: 导航器本身的导航选项，⽤于配置父导航器
* `mode`: ⻚面切换模式: 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal
效果)
    * `card`: 普通app常⽤用的左右切换。
    * `modal`: 上下切换。

然后我们使用Poetry和PoetryDetail来实现最基础的StackNavigator:
```js
import {createStackNavigator} from 'react-navigation-stack';
const PoetryStackNavigator = createStackNavigator(
  {
    Poetry: Poetry,
    PoetryDetail: {
      screen: PoetryDetail,
    },
  },
  {
    initialRouteName: 'Poetry',
  },
);
export default PoetryStackNavigator;
```
然后使用同样的方式实现Home、My的导航器，然后再使用`createBottomTabNavigator`来实现底部导航：
```js
createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarLabel: '首页',
      },
    },
    Poetry: {
      screen: PoetryStackNavigator,
      navigationOptions: {
        tabBarLabel: '诗词',
      },
    },
    My: {
      screen: MyStackNavigator,
      navigationOptions: {
        tabBarLabel: '我的',
      },
    },
  },
  {
    initialRouteName: 'Home'
  },
);
```
此时底部导航栏是没有图标的，我们引入`react-native-vector-icons`在底部导航栏中添加图片，`import Icon from 'react-native-vector-icons/FontAwesome';`引入图标，然后在`createBottomTabNavigator`的`StackNavigatorConfig`中添加：
```js
defaultNavigationOptions: ({navigation}) => ({
  tabBarIcon: ({tintColor}) => {
    const {routeName} = navigation.state;
    const mapIcon = {
      Home: 'home',
      My: 'user-circle',
      Poetry: 'tasks',
    };
    return <Icon name={mapIcon[routeName]} size={20} color={tintColor} />;
  },
}),
tabBarOptions: {
  activeTintColor: '#C20C0C',
  inactiveTintColor: 'gray',
},
```

`tabBarIcon`的返回值就是展示的图片，我们从`navigation.state`中获取`routeName`，然后映射为不同的图标返回，底部导航栏就会根据不同的`routeName`返回不同的。`tabBarOptions`设置底部导航栏在激活状态和非激活状态不同的颜色。

最后我们再来实现一下`switchNavigator`，代码实现相对简单：
```js
const switchNavigator = createSwitchNavigator({
  Init: WelcomeStackNavigator,
  Main: TabNavigator,
});
```
现在我们项目的基本结构已经完成了，启动一下我们的项目吧！启动项目我们会发现我们一直停留在Welcome，这是因为我们的页面并没有做任何处理，接下来我们来完成页面的实现。

## 页面的实现
Welcome页面是我们启动时看到的第一个页面，这个页面的主要功能是作为承接页面，用户停留一段时间后应该自动跳转至首页，使用`StyleSheet`创建简单的样式，然后使用定时器跳转到主页面：
```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C20C0C',
  },
  tips: {
    fontSize: 30,
    color: '#fff',
  },
});

class Welcome extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Main');
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.tips}> 诗词墨客 </Text>
      </View>
    );
  }
}
```
![](https://user-gold-cdn.xitu.io/2020/1/3/16f69671fba851c2?w=369&h=758&f=png&s=89604)
从Welcome页面跳转过来我们会进入到我们的首页之中，首页主要是需要实现一个文字竖排的效果；css中可以通过`writing-mode`进行设置，`writing-mode`有下面5个值：
* `horizontal-tb`
内容从左到右水平，从上到下垂直。下一条水平线位于上一条线的下方。
* `vertical-rl`
内容从上到下垂直流动，从右到左水平流动。下一条垂直线位于上一行的左侧。
* `vertical-lr`
内容从上到下垂直流动，从左到右水平流动。下一条垂直线位于前一行的右侧。
* `sideways-rl`
内容从上到下垂直流动，所有字形（即使是垂直脚本中的字形）也都向右侧设置。
* `sideways-lr`
内容从上到下垂直流动，所有字形（即使是垂直脚本中的字形）也朝左侧设置。

RN中也有一个类似的属性`writingDirection`，不过只支持三个属性'auto', 'ltr', 'rtl'，其中并没有能够设置文字竖排的属性，所以我们只能使用其他方式来实现文字竖排效果了；我的解决方案是将Text嵌套到View中，然后给View一个宽度，这个宽度使Text只能每行显示一个字，从视觉效果上来看的确是实现了，不过这个方案对标点符号的支持不是很完美。
```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef',
  },
  wrapper: {
    backgroundColor: '#fff',
    width: '80%',
    height: '80%',
    flexDirection: 'row-reverse',
    padding: 24,
    position: 'relative',
  },
  section: {
    width: 40,
  },
  contentText: {
    fontSize: 30,
  },
  title: {
    width: 20,
    position: 'absolute',
    right: 24,
    bottom: 24,
  },
  titleText: {
    fontSize: 16,
  },
});

class Home extends Component {
  static navigationOptions = {
    headerTitle: '首页',
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.section}>
            <Text style={styles.contentText}>
              欲出未出光辣達，千山萬山如火發。
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.contentText}>
              須臾走向天上來，逐却殘星趕却月。
            </Text>
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText}>「日詩」 宋太祖</Text>
          </View>
        </View>
      </View>
    );
  }
}
```
Home页面样式完成，并且现在的Home页面Header标题变为首页，这是因为我们在组件中设置了`navigationOptions`，每个页面的`navigationOptions`被用来设置页面的标题样式，可以是一个对象，也可以是一个函数，比如我们的PoetryDetail页面，我们的标题名称会根据内容改变，我们通过获取页面传值的信息，更新标题名称：
```
static navigationOptions = ({navigation}) => {
    const item = navigation.state.params.item;
    return {
      headerTitle: item.title,
    };
};
```
最好我们来实现Poetry和PoetryDetail页面，Poetry是一个列表页面，我们使用RN的`FlatList`组件来实现，`FlatList`是一个高效率的列表组件，它通过维护一个有限的渲染窗口（其中包含可见的元素），将渲染窗口之外的元素全部用合适的定长空白空间来代替，改善内存的使用，提高了大量数据情况下的渲染性能问题；这个渲染窗口能响应滚动行为，元素里可视区域越远优先级越低，越近优先级越高，但是当用户滑动过快的时候，会出现短暂空白的情况；它还支持上拉加载，下拉刷新等功能。

列表的元素我们通过`TouchableHighlight`来实现点击事件和效果，`TouchableHighlight`会产生一个变暗的效果，在RN中相应用户的点击事件，我们经常使用下面几个组件：
* TouchableWithoutFeedback：响应用户的点击事件，如果你想在处理点击事件的同时不显示任何视觉反馈，使用它是个不错的选择。
* TouchableHighlight：在TouchableWithoutFeedback的基础上添加了当按下时背景会变暗的效果。
* TouchableOpacity：相比TouchableHighlight在按下去会使背景变暗的效果，TouchableOpacity会在用户手指按下时降低按钮的透明度，而不会改变背景的颜色。
* TouchableNativeFeedback：在Android上还可以使用TouchableNativeFeedback，它会在用户手指按下时形成类似水波纹的视觉效果。注意，此组件只支持Android。

在`TouchableHighlight`上绑定onPress事件，跳转PoetryDetail页面并且把数组元素作为参数传递过去：
```js
class PoetryItem extends Component {
  render() {
    const {item, handler} = this.props;
    return (
      <TouchableHighlight onPress={() => handler()}>
        <View style={styles.item}>
          <View style={styles.itemHeader}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.authorText}>[宋] {item.author}</Text>
          </View>
          <View>
            <Text style={styles.contentText}>{item.paragraphs[0]}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

class Poetry extends Component {
  static navigationOptions = {
    headerTitle: '诗词',
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.contianer}>
        <FlatList
          data={list}
          renderItem={({item}) => (
            <PoetryItem
              item={item}
              handler={() => navigation.navigate('PoetryDetail', {item})}
            />
          )}
        />
      </View>
    );
  }
}
```
PoetryDetail就比较简单了，按照设计完成页面，除了之前提到的`navigationOptions`动态修改标题只剩下一些基础的样式编写。
 
![](https://user-gold-cdn.xitu.io/2020/1/3/16f69f6a0e55136f?w=366&h=732&f=gif&s=1005233)

完成后的效果如上图所示；这里我们会发现还有一个问题，就是当跳转PoetryDetail页面的时候，底部导航栏依旧存在，我们编写路由的时候，`StackNavigator`是被包含在`BottomTabNavigator`中的，即使`StackNavigator`的路由变化了，依旧是不会影响`BottomTabNavigator`导航器的底部导航栏。我们要在`StackNavigator`中对底部导航栏进行处理，在第一个路由时，显示底部导航栏然后在之后的路由不显示：
```js
PoetryStackNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
```
# 其他
本篇为诗词墨客App构建了一个基本项目框架，在下一篇文章中我们会通过网络请求来获取数据，使用`Redux`结合`react-navigation`来管理数据，使用`FlatList`组件的更多功能使我们的App根据完善。

项目仓库地址：[https://github.com/x007xyz/RNPoetry](https://github.com/x007xyz/RNPoetry)

