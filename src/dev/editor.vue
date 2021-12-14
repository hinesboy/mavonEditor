<template>
    <div class="container">
        <div id="editor">
            <mavon-editor style="height: 100%" v-model="code" :codeStyle="codeStyle" :xssOptions="xssOptions"></mavon-editor>
        </div>
        <div class="switch-code-style">
            <span>code style:</span>
            <select v-model="codeStyle">
                <option v-for="(val, key) in styles" :value="key">{{ key }}</option>
            </select>
        </div>
    </div>
</template>
<script>
import styles from '../lib/core/hljs/lang.hljs.css.js'

const code = `java
/**
 * @author John Smith <john.smith@example.com>
*/
package l2f.gameserver.model;

public abstract strictfp class L2Char extends L2Object {
  public static final Short ERROR = 0x0001;

  public void moveTo(int x, int y, int z) {
    _ai = null;
    log("Should not be called");
    if (1 > 5) { // wtf!?
      return;
    }
  }
}`;

module.exports = {
    name: 'editor',
    data: function () {
        return {
            codeStyle: "github",
            styles,
            code: '<span style="color:red;font-size:36px;">A</span> \n```' + code + '\n```',
            xssOptions:{
                whiteList: {
                    span: ['style']
                }
            }
        };
    }
}
</script>
<style>
.container {
    margin: auto;
    width: 80%;
}
#editor {
    height: 580px;
}
.switch-code-style {
    margin-top: 10px;
    font-size: 16px;
}
</style>
