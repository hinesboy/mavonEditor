### 图片上传

#### 方式1：图片上传至文件服务器

> 每次添加图片触发上传
```javascript
<template>
    <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
</template>
exports default {
    methods: {
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           axios({
               url: 'server url',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
               // $vm.$img2Url 详情见本页末尾
               $vm.$img2Url(pos, url);
           })
        }
    }
}
```

> 统一上传多张图片
```javascript
<template>
    <!--点击按钮触发图片统一上传-->
    <button @click="uploadimg">upload</button>
    <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
</template>
exports default {
    data(){
        return {
            img_file: {}
        }
    },
    methods: {
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 缓存图片信息
            this.img_file[pos] = $file;
        },
        $imgDel(pos){
            delete this.img_file[pos];
        },
        uploadimg($e){
            // 第一步.将图片上传到服务器.
            var formdata = new FormData();
            for(var _img in this.img_file){
                formdata.append(_img, this.img_file[_img]);
            }
            axios({
                url: 'server url',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((res) => {
                /**
                 * 例如：返回数据为 res = [[pos, url], [pos, url]...]
                 * pos 为原图片标志（0）
                 * url 为上传后图片的url地址
                 */
                 // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                for (var img in res) {
                    // $vm.$img2Url 详情见本页末尾
                    $vm.$img2Url(img[0], img[1]);
                }
            })
        },
    }
}
```

#### 方式2：直接将图片保存为base64编码

```javascript
<template>
    <mavon-editor ref=md @imgAdd="$imgAdd" v-model="mdStr" @imgDel="$imgDel"></mavon-editor>
</template>
exports default {
    data() {
        return {
            mdStr: '### demo \n ![image](0)'
        };
    },
    mounted() {
        // 如果原始md字符串中存在曾上传的图片， 则需要将对应<img>中的src替换为base64
        this.$nextTick(() => {
            // $vm.$imgUpdateByUrl 详情见本页末尾
            $vm.$imgUpdateByUrl(0, base64内容);
        }
    },
    methods: {
        $imgAdd(pos, $file){
            // 将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           axios({
               url: 'server url',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((flag) => {
           })
        }
    }
}
```

### 图片事件
| name 方法名        |            params 参数            | describe 描述                              |
| ----------------   | :-----------------------------: | ---------------------------------------- |
| $vm.$refs.toolbar_left.$imgDelByFilename(>=**2.1.6**) |  String: filename | 主动删除对应图片文件, 如果成功返回TRUE，否则返回FALSE, (并将其从 `md` 源码中删除 (>=**2.4.16**)) |
| $vm.$refs.toolbar_left.$imgAddByFilename(>=**2.1.6**) |  String: filename, File: file | 添加对应图片文件，文件别名为filename(filename 必须为 ./filename 样式), 如果成功返回TRUE，否则返回FALSE |
| $vm.$refs.toolbar_left.$imgUpdateByFilename(>=**2.1.6**) |  String: filename, File: file | 更新对应文件名的图片文件(filename 必须为 ./filename 样式), 如果成功返回TRUE，否则返回FALSE |
| $vm.$imgUpdateByUrl(>=**2.1.5**)    |  String: filename, String: url | 将<img>标签src相对路径值替换为url(如./0 -> http://path/to/png/some.png) |
| $vm.$imgAddByUrl(>=**2.1.11**)    |  String: filename, String: url | 同上(如./0 -> http://path/to/png/some.png) |
| $vm.$img2Url(>=**2.1.11**)    |  String: filename, String: url | 将md源码中图片文件名替换为url(如`![h](./0)` -> `![h](http://path/to/png/some.png)`) |
| $vm.$imglst2Url(>=**2.1.11**)    |  Array: filenameLst | 同上(filenameLst: [[filename, url], ...]) |

**注意**: `$vm`指为`mavonEditor`实例，可以通过如下两种方式获取
1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，此时`$vm`即为`mavonEditor`
2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>， 此时`$vm`为 `this.$refs.md`
