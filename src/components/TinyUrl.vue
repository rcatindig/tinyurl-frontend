<template>
  <div class="flex-container">
    <div class="form">
      <div class="form-group">
        <label for="">Long Url</label>
        <input class="long-url-input" type="text" v-model="formData.long_url" />
      </div>
      <div class="form-group">
        <label for="">Alias</label>
        <input class="long-url-input" type="text" v-model="formData.alias"  placeholder="OPTIONAL"/>
      </div>
      <button class="btn-generate" @click="generateTinyUrl()">GENERATE!</button>
    </div>
    <div class="url-container">
        <input class="search-text" type="text" v-model="search" placeholder="SEARCH..." >
        <div class="url-list">
      
          <div class="list" v-for="url in urls" :key="url">
            <div class="short-url">{{url.short_url}}</div>
            <div class="long-url">{{url.long_url}}</div>
          </div>

        </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: ()=> {
   return{ 
    urls:[],
    page: 1,
    longUrl: '',
    alias: '',
    formData: {},
    search: "",
   }
  },
  computed: {
    urlList() {
      
      return this.urls;
    }
  },
  watch: {
    async search() {

        this.urls = [];
        await this.loadUrlList();
        
    }
  },
  mounted:  async function () {

    
   await this.loadUrlList();

    const listElm = document.querySelector('.url-list');
    listElm.addEventListener('scroll', async(e) => {
      if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        console.log(e)
        this.page++;
        await this.loadUrlList();
      }
    });
    
  },
  methods:{
    loadUrlList:  async function () {

      let parameters = {
        page: this.page
      }

      if(this.search != "") {
        parameters.search = this.search;
      } 
    


      let result= await axios.get(`${process.env.VUE_APP_APIURL}/urls`, { params: parameters});
      // console.log(result.data.data)
      const resultData = result.data.data;

      resultData.forEach(data => {
        this.urls.push(data);
      }, this)
    },
    generateTinyUrl: async function () {
     
      await axios.post(`${process.env.VUE_APP_APIURL}/urls`, this.formData)

      this.formData = {};
      this.urls = [];
      this.loadUrlList();
      
    }
  }
}
</script>
<style>
.flex-container {
  display: flex;
  flex-wrap: nowrap;
}

.flex-container > .form {
  background-color: #f1f1f1;
  width: 40%;
  margin: 10px;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
}

.search-text {
  height: 50px;
  font-size: 40px;
}

.form-group > input {
  display: block ;
  height: 50px;
  margin: 12px;
  width: 60%;
  font-size: 40px;
}

.form-group > label {
  text-align: left;
  display: block;
  margin: 12px;
}

.url-container {
  width: 60%;
}

.flex-container >  .url-container > .url-list {
  background-color: #f1f1f1;
  
  margin: 10px;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
}

.url-list {
  height: 500px;
  overflow: auto;
}

.url-list .list {
  text-align: left;
  padding: 5px;
  background-color: white;
  line-height: 1;
  margin: 12px;
}


.short-url {
  font-weight: bold;
  font-size: 1em;
}

.long-url {
  font-size: 20px;
}

.btn-generate {
  height: 50px;
  font-size: 40px;
}
</style>