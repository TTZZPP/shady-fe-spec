/** @type {import('stylelint').Config} */
export default {
  defaultSeverity: 'warning',
  plugins: ['stylelint-scss'],
  rules: {
    // 避免使用已废弃的 @ 规则，防止代码中使用不再被支持的特性
    'at-rule-no-deprecated': null,
    // 禁止在声明属性值中使用已废弃的关键字，保证代码使用的关键字是有效的
    'declaration-property-value-keyword-no-deprecated': true,
    // 防止选择器的优先级出现降序情况，避免样式覆盖混乱
    'no-descending-specificity': true,
    // 禁止在声明块中使用重复的自定义属性，保持代码简洁
    'declaration-block-no-duplicate-custom-properties': true,
    // 禁止在声明块中使用重复的属性，避免冗余代码
    'declaration-block-no-duplicate-properties': true,
    // 禁止在字体族中使用重复的名称，确保字体族定义的唯一性
    'font-family-no-duplicate-names': true,
    // 禁止在关键帧块中使用重复的选择器，保证关键帧选择器的唯一性
    'keyframe-block-no-duplicate-selectors': true,
    // 禁止在文件中使用重复的 @import 规则，避免重复导入资源
    'no-duplicate-at-import-rules': true,
    // 禁止使用重复的选择器，减少代码冗余
    'no-duplicate-selectors': true,
    // 禁止出现空的块，避免无意义的代码块
    'block-no-empty': true,
    // 禁止出现空的注释，避免无意义的注释
    'comment-no-empty': true,
    // 禁止出现空的源代码文件，避免创建空文件
    'no-empty-source': true,
    // 禁止 @ 规则的前置部分出现无效内容，保证 @ 规则的语法正确
    'at-rule-prelude-no-invalid': true,
    // 禁止使用无效的十六进制颜色值，确保颜色值的有效性
    'color-no-invalid-hex': true,
    // 禁止在 calc 函数中使用无空格分隔的运算符，保证 calc 函数的可读性
    'function-calc-no-unspaced-operator': true,
    // 禁止在关键帧声明中使用 !important，保持关键帧样式的优先级正常
    'keyframe-declaration-no-important': true,
    // 禁止使用无效的媒体查询，确保媒体查询的语法正确
    'media-query-no-invalid': true,
    // 禁止使用无效的命名网格区域，保证网格布局的正确性
    'named-grid-areas-no-invalid': true,
    // 禁止使用无效的双斜杠注释，避免不符合规范的注释
    'no-invalid-double-slash-comments': true,
    // 禁止在 @import 规则中使用无效的位置，保证 @import 规则的正确使用
    'no-invalid-position-at-import-rule': true,
    // 禁止字符串中出现换行符，保持字符串的完整性
    'string-no-newline': true,
    // 禁止语法字符串中出现无效内容，确保语法字符串的正确性
    'syntax-string-no-invalid': true,
    // 禁止出现不规则的空白字符，保持代码的整洁
    'no-irregular-whitespace': true,
    // 禁止自定义属性缺少 var 函数，确保自定义属性的正确使用
    'custom-property-no-missing-var-function': true,
    // 禁止字体族中缺少通用字体关键字，保证字体的兼容性
    'font-family-no-missing-generic-family-keyword': true,
    // 禁止线性渐变函数使用非标准方向，保证渐变方向的一致性
    'function-linear-gradient-no-nonstandard-direction': true,
    // 禁止声明块中使用简写属性覆盖其他属性，避免样式冲突
    'declaration-block-no-shorthand-property-overrides': true,
    // 禁止使用无法匹配的 ANB 选择器，确保选择器的有效性
    'selector-anb-no-unmatchable': true,
    // 禁止使用未知的注释注解，保证注释注解的有效性
    'annotation-no-unknown': true,
    // 禁止 @ 规则描述符使用未知内容，确保 @ 规则描述符的正确性
    'at-rule-descriptor-no-unknown': true,
    // 禁止 @ 规则描述符的值使用未知内容，确保 @ 规则描述符值的正确性
    'at-rule-descriptor-value-no-unknown': true,
    // 禁止使用未知的 @ 规则，确保 @ 规则的有效性
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    // 禁止声明属性值使用未知内容，确保属性值的有效性
    'declaration-property-value-no-unknown': true,
    // 禁止使用未知的函数，确保函数的有效性
    'function-no-unknown': true,
    // 禁止使用未知的媒体特性名称，确保媒体特性名称的有效性
    'media-feature-name-no-unknown': true,
    // 禁止使用未知的媒体特性名称和值，确保媒体特性的有效性
    'media-feature-name-value-no-unknown': true,
    // 禁止使用未知的动画名称，确保动画名称的有效性
    'no-unknown-animations': true,
    // 禁止使用未知的自定义媒体，确保自定义媒体的有效性
    'no-unknown-custom-media': true,
    // 禁止使用未知的自定义属性，确保自定义属性的有效性
    'no-unknown-custom-properties': true,
    // 禁止使用未知的属性，确保属性的有效性
    'property-no-unknown': true,
    // 禁止使用未知的伪类选择器，确保伪类选择器的有效性
    'selector-pseudo-class-no-unknown': true,
    // 禁止使用未知的伪元素选择器，确保伪元素选择器的有效性
    'selector-pseudo-element-no-unknown': true,
    // 禁止使用未知的类型选择器，确保类型选择器的有效性
    'selector-type-no-unknown': true,
    // 禁止使用未知的单位，确保单位的有效性
    'unit-no-unknown': true,

    // 禁止使用供应商前缀的 @ 规则，促进代码的兼容性和标准化
    'at-rule-no-vendor-prefix': true,
    // 长度为零的值不使用单位，保持代码简洁
    'length-zero-no-unit': true,
    // 禁止使用供应商前缀的媒体特性名称，促进代码的兼容性和标准化
    'media-feature-name-no-vendor-prefix': true,
    // 禁止使用供应商前缀的属性，促进代码的兼容性和标准化
    'property-no-vendor-prefix': true,
    // 禁止使用供应商前缀的选择器，促进代码的兼容性和标准化
    'selector-no-vendor-prefix': true,
    // 禁止使用供应商前缀的值，促进代码的兼容性和标准化
    'value-no-vendor-prefix': true,
    // 函数名使用小写，保持代码风格一致
    'function-name-case': ['lower', { severity: 'error' }],
    // 类型选择器使用小写，保持代码风格一致
    'selector-type-case': ['lower', { severity: 'error' }],
    // 关键字值使用小写，保持代码风格一致
    'value-keyword-case': ['lower', { severity: 'error' }],
    // 在 @ 规则前总是添加空行，但在块级 @ 规则后紧跟同名非块级 @ 规则以及第一个嵌套 @ 规则时除外，忽略注释后和块内部的情况
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested'],
        ignore: ['after-comment', 'inside-block'],
      },
    ],
    // 在注释前总是添加空行，但第一个嵌套注释除外，忽略注释后的情况
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    // 在自定义属性前总是添加空行，但在注释后和同一块内部时除外，忽略注释后的情况
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-comment', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block'],
      },
    ],
    // 在声明前总是添加空行，但在注释后、第一个嵌套声明和同一块内部时除外，忽略注释后的情况
    // 'declaration-empty-line-before': [
    //   'always',
    //   {
    //     except: ['after-comment', 'first-nested'],
    //     ignore: ['after-comment', 'after-declaration', 'inside-single-line-block'],
    //   },
    // ],
    // 在规则前总是添加空行，但第一个嵌套规则和注释后除外，忽略注释后的情况
    'rule-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    // 单行声明块中最多只能有一个声明，保持代码简洁
    'declaration-block-single-line-max-declarations': 1,
    // 数字的最大精度为 2 位小数，保持数字的一致性
    'number-max-precision': 2,
    // 除颜色外，alpha 值使用数字表示，保持代码风格一致
    'alpha-value-notation': ['number', { exclude: ['color'] }],
    // 颜色函数使用现代表示法，保持代码风格一致
    'color-function-notation': 'modern',
    // 十六进制颜色使用短格式，保持代码简洁
    'color-hex-length': 'short',
    // 字体权重使用数字表示，保持代码风格一致
    'font-weight-notation': 'numeric',
    // 色调度数使用数字表示，保持代码风格一致
    'hue-degree-notation': 'number',
    // 导入使用字符串表示法，保持代码风格一致
    'import-notation': 'string',
    // 关键帧选择器使用百分比表示法，保持代码风格一致
    'keyframe-selector-notation': 'percentage',
    // 亮度使用百分比表示，保持代码风格一致
    'lightness-notation': 'percentage',
    // 媒体特性范围使用上下文相关表示法，保持代码风格一致
    // 'media-feature-range-notation': 'context',
    // 否定选择器使用简单表示法，保持代码简洁
    'selector-not-notation': 'simple',
    // 伪元素选择器使用双冒号表示法，保持代码风格一致
    'selector-pseudo-element-colon-notation': 'double',
    // 类选择器的命名模式必须符合正则表达式，保持命名规范
    'selector-class-pattern': '^[a-z][a-z0-9]*(-[a-z0-9]+)*$',
    // 字体族名称总是使用引号，除非是关键字，保持代码风格一致
    'font-family-name-quotes': 'always-unless-keyword',
    // 函数中的 URL 总是使用引号，保持代码风格一致
    'function-url-quotes': 'always',
    // 选择器中的属性总是使用引号，保持代码风格一致
    'selector-attribute-quotes': 'always',
    // 禁止声明块中出现冗余的长格式属性，保持代码简洁
    'declaration-block-no-redundant-longhand-properties': true,
    // 禁止简写属性中出现冗余的值，保持代码简洁
    'shorthand-property-no-redundant-values': true,
    // 注释内部总是有空白字符，保持注释的可读性
    'comment-whitespace-inside': 'always',
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
};
