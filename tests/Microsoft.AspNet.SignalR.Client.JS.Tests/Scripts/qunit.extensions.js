﻿(function ($, window) {
    QUnit.asyncTimeoutTest = function (name, timeout, test) {
        /// <summary>Runs an async test with a specified timeout.</summary>
        /// <param name="name" type="String">The name of the test.</param>
        /// <param name="timeout" type="Number">The number of milliseconds to wait before timing out the test.</param>
        /// <param name="test" type="Function">
        ///     The test function to be run, which accepts an end function parameter which should be called when the test is finished.&#10;
        ///     The test function can optionally accept a second parameter containing wrappers for all of QUnit's assertions (http://api.qunitjs.com/category/assert/).
        ///     These assertions will not be invoked if the test has already completed preventing an unwanted assertion failure during a subsequent test.
        ///     The test function can optionally return a cleanup function to be run when the test is finished (either successfully or timed out).&#10;
        ///     e.g.
        ///     function doTest(end, assert) {&#10;
        ///         var somethingExpensive = new Expensive();&#10;
        ///         assert.ok(true, "Test passed");&#10;
        ///         return function() {&#10;
        ///             somethingExpensive.stop();&#10;
        ///         };&#10;
        ///     }&#10;
        /// </param>

        QUnit.asyncTest(name, function () {
            var timeoutId,
                testCleanup,
                hasFinished = false,
                assert = {
                    deepEqual: function (actual, expected, message) {
                        if (!hasFinished) {
                            QUnit.deepEqual(actual, expected, message);
                        }
                    },
                    equal: function (actual, expected, message) {
                        if (!hasFinished) {
                            QUnit.equal(actual, expected, message);
                        }
                    },
                    notDeepEqual: function (actual, expected, message) {
                        if (!hasFinished) {
                            QUnit.notDeepEqual(actual, expected, message);
                        }
                    },
                    notEqual: function (actual, expected, message) {
                        if (!hasFinished) {
                            QUnit.notEqual(actual, expected, message);
                        }
                    },
                    notStrictEqual: function (actual, expected, message) {
                        if (!hasFinished) {
                            QUnit.notStrictEqual(actual, expected, message);
                        }
                    },
                    ok: function (state, message) {
                        if (!hasFinished) {
                            QUnit.ok(state, message);
                        }
                    },
                    strictEqual: function (actual, expected, message) {
                        if (!hasFinished) {
                            QUnit.strictEqual(actual, expected, message);
                        }
                    },
                    throws: function (block, expected, message) {
                        if (!hasFinished) {
                            QUnit.throws(block, expected, message);
                        }
                    }
                };

            function end(){ 
                if (!hasFinished) {
                    clearTimeout(timeoutId);
                    hasFinished = true;
                    testCleanup();
                    QUnit.start();
                }
            }

            timeoutId = setTimeout(function () {
                assert.ok(false, "Test timed out.");
                end();
            }, timeout);

            testCleanup = test(end, assert) || $.noop;

            if (!$.isFunction(testCleanup)) {
                throw new Error("Return value of test must be falsey or a function");
            }
        });
    };

    QUnit.skip = {
        test: function () { },
        asyncTest: function () { },
        asyncTimeoutTest: function () { },
    };
})($, window);