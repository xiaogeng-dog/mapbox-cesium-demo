// 仅在 Mapbox GL JS 地图加载完成后才能绘制，因此必须在地图的加载事件之后才能与 Drew 进行交互:
// map.on('load', function() {
//     draw.add({ .. });
//   });
/**
 *  Options选择
 */
// Keybindings，boolean (默认为 true) : 是否为绘图启用键盘交互。
// touchEnabled Boolean (默认为 true) : 是否为绘图启用触摸交互。
// BoxSelect，boolean (默认为 true) : 是否通过 shift + click + 拖动来启用框选择功能。如果为 false，则 shift + click + 拖动缩放到某个区域。
// clickBuffer，Number (默认值: 2) : 响应单击的任何特性或顶点(每个方向)周围的像素数。
// touchBuffer Number (默认值: 25) : 顶点(在每个方向)的任何特征周围的像素数，这些特征将响应一次触摸。
//
/**
 *  controls Object:
 *  隐藏或显示单个控件。每个属性的名称都是一个控件，值是一个布尔值，指示该控件是打开还是关闭。
 *  可用的控件名称有 point, line_string, polygon, trash（删除回收）, combine_features（功能组合） 和 uncombine_features（非功能组合）。
 *  默认情况下，所有控件都处于打开状态。若要更改该默认值，请使用 displayControlsDefault
 */
// displayControlsDefault，boolean (default: true) : 控件的默认值。例如，如果希望默认关闭所有控件，并指定允许包含控件的列表，请使用 displayControlsDefault: false
// styles Array < Object > : 映射样式对象的数组。默认情况下，Drew 为您提供了一个地图样式。要了解重写样式，请参阅下面的样式绘制部分。
// modes Object: 用自己的模式覆盖默认模式。MapboxDraw.modes可用于查看默认值。更多关于自定义模式的信息可以在这里找到。
// defaultMode，String (默认值: 'simple_select') : 用户将首先加载的模式(from mode)。
// userProperties，boolean (default: false) : 一个特性的属性也可用于样式设置，并以 user_作为前缀，例如，['==', 'user_custom_label', 'Example']
