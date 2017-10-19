// @flow


type Notifier = () => void;

const assertNotify = function assertNotify(
  testRunnerCallback: (Notifier) => void,
  numCalls: number = 1,
) {
  const testContext = {};
  testContext.notify = function notify() {
  };
  const notifyName = testContext.notify.name;
  spyOn(testContext, notifyName).and.callThrough();
  testRunnerCallback(testContext.notify);
  expect(testContext.notify.calls.count()).toEqual(numCalls);
};

export default assertNotify;
