/* feedreader.js
 *
 * 这是 Jasmine 会读取的spec文件，它包含所有的要在你应用上面运行的测试。
 */

/* 我们把所有的测试都放在了 $() 函数里面。因为有些测试需要 DOM 元素。
 * 我们得保证在 DOM 准备好之前他们不会被运行。
 */
$(function() {

    /* 这是我们第一个测试用例 - 其中包含了一定数量的测试。这个用例的测试
     * 都是关于 Rss 源的定义的，也就是应用中的 allFeeds 变量。
    */

    describe('RSS Feeds', function() {
        /* 这是我们的第一个测试 - 它用来保证 allFeeds 变量被定义了而且
         * 不是空的。在你开始做这个项目剩下的工作之前最好实验一下这个测试
         * 比如你把 app.js 里面的 allFeeds 变量变成一个空的数组然后刷新
         * 页面看看会发生什么。
        */
        it('allFeeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* 测试遍历 allFeeds 对象里面的所有的源来保证有链接字段而且链接不是空的。
         */
         it('each feed has url which is be defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(null);
            }
        });

        /* 测试遍历 allFeeds 对象里面的所有的源来保证有名字字段而且不是空的。
         */
         it('each feed has name which is be defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(null);
            }
        });
    });

    describe('The menu', function() {
        /* 这是一个叫做 "The menu" 的测试用例 ，用来测试菜单的情况。*/

        /* 这个测试用例保证菜单元素默认是隐藏的。*/
        it('menu is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* 这个测试用例保证当菜单图标被点击的时候菜单会切换可见状态
          * 假如菜单隐藏，点击菜单图标应该显示；
          * 假如菜单显示，点击菜单图标应该隐藏；
          *以上通过，则测试成功。
          */
        it('toggling menu icon can show/hide menu', function() {
            var menuIcon = $('.menu-icon-link');
            if ($('body').hasClass('menu-hidden')) {
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toBe(false);
                console.log('menu has been shown');
            }
            if (!$('body').hasClass('menu-hidden')) {
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toBe(true);
                console.log('menu has been hidden');
            }
        });
    });

    describe('Initial Entries', function() {
        /* 这是一个叫做 "Initial Entries" 的测试用例, 用来测试数据被正确初始化 */

        /* 测试保证 loadFeed 函数被调用而且工作正常；
         * 并在 .feed 容器元素里面至少有一个 .entry 的元素。
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loadFeed() is working well', function() {
            expect($(".feed").find(".entry").length >= 1).toBeTruthy();
        });

    });

    describe('New Feed Selection', function() {
        /* 这是一个叫做 "New Feed Selection" 的测试用例, 用来测试加载新源是否正常 */

        /* 测试保证当用 loadFeed 函数加载一个新源的时候内容会真的改变。
         */

         var initialFeed, newFeed;

         beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeed = $( "div.feed" ).html();
                loadFeed(1, done);
            });
        });

         it('Feed Selection has been changed', function() {
            newFeed = $( "div.feed" ).html();
            expect(newFeed).not.toBe(initialFeed);
        });

        afterEach(function() {
            init();
        });

    });

}());
