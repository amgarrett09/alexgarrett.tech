!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}({2:function(e,t){Vue.component("ProjectBox",{template:'\n    <div class="projectbox">\n      <h3>{{ project.title }}</h3>\n      <div class="projectimage">\n        <img :src="project.image" :alt="project.imageAlt" />\n      </div>\n      <p>{{ project.description }}</p>\n      <div style="text-align: center;">\n        <button \n          class="projectdetail"\n          @click.prevent="openPopup"\n        >\n          <strong>Learn More</strong>\n        </button>\n      </div>\n    </div>  \n  ',props:{project:{type:Object,required:!0,default:[]}},methods:{openPopup:function(){this.$emit("open-popup",this.project.popupId)}}}),Vue.component("ProjectPopup",{template:'\n    <div\n      class="project-popup"\n      :class="{ \'pop-disabled\': hidden, \'active-popup\': !hidden }"\n      :aria-hidden="hidden"\n    >\n      <div style="text-align: right">\n        <button class="close-popup" @click="closePopup">Close</button>\n      </div>\n\n      <h1>{{ content.title }}</h1>\n      <p><strong>Challenge</strong>: {{ content.challenge }}</p>\n      <p><strong>Solution</strong>: {{ content.solution}}</p>\n      <p><strong>Result</strong>: {{ content.result }}</p>\n      <div style="text-align: center">\n        <a target="_blank" :href="content.link">\n          <button class="viewproject">\n            <strong>View Site</strong>\n          </button>\n        </a>\n      </div>\n      <br>\n      <br>\n    </div>\n  ',methods:{closePopup:function(){this.$emit("close-popup")}},props:{activePopup:{type:String,required:!0,default:""},content:{type:Object,required:!0,default:{}}},computed:{hidden:function(){return this.activePopup!==this.content.id}}});new Vue({el:"#project-display",template:'\n    <div class="project-display">\n      <ProjectBox v-for="(project, index) in projects" \n        :key="project.id" \n        :project="projects[index]"\n        @open-popup="displayPopup" \n      />\n      <ProjectPopup v-for="(popup, index) in popups"\n        :key="popup.title"\n        :content="popups[index]"\n        :activePopup="activePopup"\n        @close-popup="hidePopup"\n      />\n    </div>\n  ',methods:{displayPopup:function(e){this.activePopup=e},hidePopup:function(e){this.activePopup=""}},data:{message:"Hello World!",projects:[{id:0,title:"Hockey Scrub",description:"An NHL player stat tracking app built using Next.js and React. \n          Implements a fast autocompletion algorithm for search, and clean, \n          easy-to-read UI design.",image:"/static/blog/images/projects/hockey_scrub_thumbnail.png",imageAlt:"Hockey Scrub",popupId:"hockey-scrub-popup"},{id:1,title:"css-minifier.rs",description:"A CLI tool for minifying css that can be used\n          standalone or inside a Unix-style pipeline, written in Rust.",image:"/static/blog/images/projects/css-minifier-thumbnail.png",imageAlt:"css-minifier.rs",popupId:"css-minifier-popup"},{id:2,title:"alexgarrett.tech",description:"My personal website, built with Python and Django.\n          Includes CRUD functionality and interaction with a SQL database,\n          along with robust form validation and HTML/JavaScript escaping.",image:"/static/blog/images/projects/blog_thumbnail.png",imageAlt:"Blog",popupId:"blog-popup"},{id:3,title:"Audible Sights",description:'A web app which converts images to sound in a way that\n          conveys spatial information, potentially allowing users to "see"\n          with their ears.',image:"/static/blog/images/projects/audible_sights_thumbnail.png",imageAlt:"Audible Sights",popupId:"audible-sights-popup"}],activePopup:"",popups:[{id:"hockey-scrub-popup",title:"Hockey Scrub",challenge:"\n          I wanted to build a fast and easy to use\n          stat tracking app to allow users to quickly look up info about current\n          and past players in the National Hockey League, with a cleaner and more\n          pleasant experience than some other, similar applications. I also wanted\n          to implement a very fast player search with autocompletion.\n        ",solution:"\n          I used the React and the Next.js framework to\n          build the UI and general app structure, and reached out to the NHL's own\n          stats API to fetch player stats. For the player search component, I\n          wrote an autocompletion library that uses a prefix trie data structure\n          for efficient generation of suggestions. The autocompletion is\n          implemented as part of a REST API, which the front-end player search\n          component fetches from.\n        ",result:"\n          Hockey Scrub is an app where users can very\n          quickly and easily look up players and their stats, and the experience\n          is snappy and satisfying. The UI has minimal clutter and is quite\n          readable. The app is effective as a quick reference, and in the future I\n          want to expand the number of stats it tracks. With React's modular\n          nature, that should be pretty straightforward.\n        ",link:"https://hockey-scrub.site"},{id:"css-minifier-popup",title:"css.minifier.rs",challenge:"\n          I needed a fast and pleasant-to-use CSS\n          minification tool to make my web development workflow more efficient.\n        ",solution:"\n          I built my own CSS minifier CLI tool using\n          Rust and the Clap library. I implemented my own CSS parsing rules, and\n          used Clap in conjunction with my own implementation for parsing standard in\n          to build comprehensive parsing of user input.\n        ",result:"\n          This CSS minification tool is super faster than\n          some common minification tools, compressing input in O(n) time (in contrast\n          to regex-based methods, for example). The interface is simple, and app can\n          minify user-specified files individually, or it can take input piped from\n          another application and minify files based on that. The latter enables\n          fast minification of large numbers of files with minimal user input.\n        ",link:"https://github.com/amgarrett09/rust-css-minifier"},{id:"blog-popup",title:"alexgarrett.tech",challenge:"\n          I needed a web-site and a blog to showcase\n          the projects I'm working on. The blog app needed to allow me to easily\n          create, edit, and publish posts, all while having good security.\n        ",solution:"\n          I built a blog app from the ground up with\n          the help of the Django web framework. I learned about MVC-style web\n          development, writing models to handle database entries, and using Python\n          functions to serve the content to the user. I implemented forms for\n          post-creation that have Markdown support, and on the back-end there is\n          robust validation and HTML-escaping to prevent cross-site scripting and\n          similar attacks.\n        ",result:"\n          The blog on alexgarrett.tech is fast and\n          reliable application that has exactly the features I need without bloat.\n          Additionally, the app is secure, preventing XSS and CSRF attacks. In the\n          process of building it I also became quite familiar with Django and\n          Python.\n        ",link:"https://www.alexgarrett.tech/blog/"},{id:"audible-sights-popup",title:"Audible Sights",challenge:'\n          I was fascinated by research on\n          neuroplasticity which appeared to show that humans (and other animals)\n          who lose their sight can learn to "see" with other senses. I wanted to\n          create a web app that would illustrate how "seeing with sound" might\n          work.\n        ',solution:"\n          I used vanilla JavaScript and the browser's\n          Web Audio API to convert images to sound. Image brightness data is\n          converted into gain values which are fed to numerous Web Audio\n          oscillators. The gain data is updated by scanning images left to right.\n          I used ES6 classes to make the image conversion its own module with a\n          relatively simple API, and I used Webpack to compress the JavaScript\n          files and to transpile them to an older version of JavaScript with more\n          compatibility.\n        ",result:"\n          Audible Sights is a good proof of concept which\n          shows how devices or apps which help the blind see with their ears could\n          work. Users can try out the conversion on pre-set demo images, or upload\n          their own images to experience what they sound like. The API for the\n          image conversion itself is also easy-to-use and the image conversion\n          module could be easily reused if the app's features were to be expanded.\n        ",link:"https://audible-sights.herokuapp.com"}]}})}});