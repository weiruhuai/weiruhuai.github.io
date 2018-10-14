<template>
<div id="single-blog">
    <h1>{{blog.title}}</h1>
    <article>{{blog.content}}</article>
    <p class="author">作者：{{blog.author}}</p>
    <p class="category">分类：</p>
    <ul>
      <li v-for="category in blog.categories" :key="category">
        {{category}}
      </li>
    </ul>
    <button class="btn" @click="deleteSingleBlog()"></button>
</div>
</template>

<script>
export default {
  name: "single-blog",
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    };
  },
  created() {
    this.$http
      .get(
        "https://wd9083549662nsgjpz.wilddogio.com/posts/" + this.id + ".json"
      )
      .then(function(data) {
        // console.log(data);
        return data.json();
      })
      .then(function(data) {
        this.blog = data;
      });
  },
  methods: {
    deleteSingleBlog() {
      this.$http
        .delete(
          "https://wd9083549662nsgjpz.wilddogio.com/posts/" + this.id + ".json"
        )
        .then(response => {
          this.$router.push({ path: "/" });
        });
    }
  }
};
</script>

<style>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background:url("../images/1.jpg") no-repeat;
  background-size: cover;
  border: 1px dotted #aaa;
  margin-top: 20px;
}
#single-blog  h1{
  font-size: 30px;
  text-align: center;
  margin-top: 0;
}
#single-blog .author{
  display: inline-block;
  margin-right: 50px;
}
#single-blog .category{
  margin-right: 50px;
}
#single-blog .btn{
  height: 30px;
  width: 30px;
  background:url("../images/delete.png");
  background-size: cover;
  cursor: pointer;
}

</style>
