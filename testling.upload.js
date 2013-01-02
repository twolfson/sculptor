var test = require('testling');
test('the test name', function (t) {
    t.equal(2 + 2, 4);

    // t.log(window.navigator.appName);

    // t.createWindow('http://substack.net', { t : t }, function (win, $) {
    //     t.equal(win.document.title, 'The Universe of Discord');
        t.end();
    // });
});
