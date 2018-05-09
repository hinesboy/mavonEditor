### Upload images

#### method 1: Upload to File server

> Each time you add a image to trigger the upload
```javascript
<template>
    <mavon-editor ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"></mavon-editor>
</template>
exports default {
    methods: {
        // bind @imgAdd event
        $imgAdd(pos, $file){
           / step 1. upload image to server.
           var formdata = new FormData();
           formdata.append('image', $file);
           axios({
               url: 'server url',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               // step 2. replace url ![...](./0) -> ![...](url)
               // $vm.$img2Url. The details at the end of this page
               $vm.$img2Url(pos, url);
           })
        }
    }
}
```

> Multiple images unified upload
```javascript
<template>
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
        // bind @imgAdd event
        $imgAdd(pos, $file){
            // cache images info
            this.img_file[pos] = $file;
        },
        $imgDel(pos){
            delete this.img_file[pos];
        },
        uploadimg($e){
           // step 1. upload images to server.
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
                 * eg：res = [[pos, url], [pos, url]...]
                 */
                // step 2. replace url ![...](0) -> ![...](url)
                for (var img in res) {
                    // $vm.$img2Url. The details at the end of this page
                    $vm.$img2Url(img[0], img[1]);
                }
            })
        },
    }
}
```

#### method 2:base64

```javascript
<template>
    <mavon-editor ref=md @imgAdd="$imgAdd" v-model="mdStr" @imgDel="$imgDel"></mavon-editor>
</template>
exports default {
    data() {
        return {
            mdStr: '### demo \n ![image](./0)'
        };
    },
    mounted() {
        // init: replace <img src="base64">
        this.$nextTick(() => {
            // $vm.$imgUpdateByUrl. The details at the end of this page
            $vm.$imgUpdateByUrl('./0', base64);
        }
    },
    methods: {
        $imgAdd(pos, $file){
            // upload image(base64)
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

### image methods
| name      |            params         | describe      |
| ----------------   | :-----------------------------: | ---------------------------------------- |
| $vm.$refs.toolbar_left.$imgDelByFilename(>=**2.1.6**) |  String: filename | Delete the image by filename, return true if sucess, false otherwise, (and it will remove from `md` (>=**2.4.16**)) |
| $vm.$refs.toolbar_left.$imgAddByFilename(>=**2.1.6**) |  String: filename, File: file | Add the image by filename (The filename alias style must be "./filename"), return true if sucess, false otherwise |
| $vm.$refs.toolbar_left.$imgUpdateByFilename(>=**2.1.6**) |  String: filename, File: file | Update the image by filename(The filename alias style must be "./filename"), return true if sucess, false otherwise |
| $vm.$imgUpdateByUrl(>=**2.1.6**)    |  String: filename, String: url | Update filename to url(example: ./0 -> http://path/to/png/some.png) |
| $vm.$imgAddByUrl(>=**2.1.11**)    |  String: filename, String: url | Same as above |
| $vm.$img2Url(>=**2.1.11**)    |  String: filename, String: url | replace filename to url(example: `![h](./0)` -> `![h](http://path/to/png/some.png)`) |
| $vm.$imglst2Url(>=**2.1.11**)    |  Array: filenameLst | Same as above(filenameLst: [[filename, url], ...]) |

**Notice**: `$vm` => reference instance of component, you can get it:
1. `import {mavonEditor} from ...`: `$vm` == `mavonEditor`
2. `<mavon-editor ref=md ></mavon-editor>: `$vm` == `this.$refs.md`
