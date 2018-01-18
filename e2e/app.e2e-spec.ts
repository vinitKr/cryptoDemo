import { CryptoAppPage } from './app.po';

describe('crypto-app App', () => {
  let page: CryptoAppPage;

  beforeEach(() => {
    page = new CryptoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
