class fakeTranslationService {
  constructor() {
    this.locales = [];
  }
  async getMessage(langId, key) {
    this.locales.push({
      langId,
      key
    });
    return key;
  }
}
const fk = new fakeTranslationService();
export default fk;
