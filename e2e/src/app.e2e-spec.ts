import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should load a scoresheet from the API and calculate the running scores', () => {
    page.navigateTo();

    var loadBtn = element(by.id('btn-game-new'));
    loadBtn.click().then(function () {
      browser.sleep(2000)

      var table = element(by.id('scoresheet'));
      expect(table.isPresent()).toBe(true);
    })

    afterEach(async () => {
      // Assert that there are no errors emitted from the browser
      const logs = await browser.manage().logs().get(logging.Type.BROWSER);
      expect(logs).not.toContain(jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry));
    });
  });
});