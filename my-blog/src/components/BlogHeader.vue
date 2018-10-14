<template>
    <div class="blogheader">
        <ul>
            <li>
                <router-link to="/" exact>博客</router-link>
                <router-link to="/add" exact>写博客</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "blog-header"
};
</script>

<style scoped>
.blogheader{
    /* height: 300px; */
    background:url("../images/2.jpg") no-repeat;
    background-size: cover;
}
ul {
  list-style-type: none;
  text-align: center;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  padding: 30px;
}
a{
    color: #fff;
    text-decoration: none;
    padding: 12px;
    border-radius: 5px;
}
nav{
    background: crimson;
    padding: 30px 0;
    margin-bottom: 40px;
}
.router-link-active{
    background: rgba(255, 255, 255, 0.8);
    color: #444;
}
</style>