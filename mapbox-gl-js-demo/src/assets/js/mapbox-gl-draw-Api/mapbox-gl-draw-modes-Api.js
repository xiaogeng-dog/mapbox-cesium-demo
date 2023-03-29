/**
 * 默认情况下，MapboxDrew 提供了一些模式。这些模式的目的是涵盖所需的基本功能 MapboxDrawto 创建核心 GeoJSON 特性类型。
 * 除此之外，MapboxDraw 还支持自定义模式。请按此浏览详情。
 *
 *
 * 模式名字符串可以在 Draw.mode 中作为枚举使用。
 *
 */
/**
 * simple_select
 * Draw.modes.SIMPLE_SELECT === 'simple_select'
 * 允许您选择、删除和拖动特性。
 * 在这种模式下，用户可以更改特性的选定状态。
 *
 * Drew 默认处于 simple_select 模式，
 * 每次用户完成绘制功能或退出 direct_select 模式时，
 * 它都会自动转换为 simple_select 模式。
 */

/**
 * direct_select
 * Draw.modes.DIRECT_SELECT === 'direct_select'
 * 允许您选择、删除和拖动顶点; 以及拖动特性。
 * direct_select 模式不适用于点特性，因为它们没有顶点。
 * 当用户单击所选线条或多边形的顶点时，Drew 进入 direct_select 模式。因此 direct_select 模式通常遵循 simple_select 模式。
 *
 */
/**
 * draw_line_string
 * Draw.modes.DRAW_LINE_STRING === 'draw_line_string'
 * 允许您绘制 LineString 特性。
 *
 * draw_polygon
 * Draw.modes.DRAW_POLYGON === 'draw_polygon'
 * 允许您绘制多边形特征。
 *
 * draw_point
 * Draw.modes.DRAW_POINT === 'draw_point'
 * 允许您绘制 Point 特性。
 */
