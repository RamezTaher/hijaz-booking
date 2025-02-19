import { LocaleData } from 'ngx-bootstrap/chronos/locale/locale.class';

const symbolMap: { [key: string]: string } = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  0: '0',
};
const numberMap: { [key: string]: string } = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '0': '0',
};
const pluralForm = function (num: number): number {
  return num === 0
    ? 0
    : num === 1
    ? 1
    : num === 2
    ? 2
    : num % 100 >= 3 && num % 100 <= 10
    ? 3
    : num % 100 >= 11
    ? 4
    : 5;
};
const plurals: {
  [key: string]: [string, string, [string, string], string, string, string];
} = {
  s: [
    'أقل من ثانية',
    'ثانية واحدة',
    ['ثانيتان', 'ثانيتين'],
    '%d ثوان',
    '%d ثانية',
    '%d ثانية',
  ],
  m: [
    'أقل من دقيقة',
    'دقيقة واحدة',
    ['دقيقتان', 'دقيقتين'],
    '%d دقائق',
    '%d دقيقة',
    '%d دقيقة',
  ],
  h: [
    'أقل من ساعة',
    'ساعة واحدة',
    ['ساعتان', 'ساعتين'],
    '%d ساعات',
    '%d ساعة',
    '%d ساعة',
  ],
  d: [
    'أقل من يوم',
    'يوم واحد',
    ['يومان', 'يومين'],
    '%d أيام',
    '%d يومًا',
    '%d يوم',
  ],
  M: [
    'أقل من شهر',
    'شهر واحد',
    ['شهران', 'شهرين'],
    '%d أشهر',
    '%d شهرا',
    '%d شهر',
  ],
  y: [
    'أقل من عام',
    'عام واحد',
    ['عامان', 'عامين'],
    '%d أعوام',
    '%d عامًا',
    '%d عام',
  ],
};
const pluralize = function (u: string) {
  return function (num: number, withoutSuffix: boolean): string {
    const f = pluralForm(num);
    let str = plurals[u][pluralForm(num)];
    if (f === 2) {
      str = str[withoutSuffix ? 0 : 1];
    }

    return (str as string).replace(/%d/i, num.toString());
  };
};
const months: string[] = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

export const arLocale: LocaleData = {
  abbr: 'ar',
  months,
  monthsShort: months,
  weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
  weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
  weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'D/\u200FM/\u200FYYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm',
  },
  meridiemParse: /ص|م/,
  isPM(input: string) {
    return 'م' === input;
  },
  meridiem(hour: number, minute: number, isLower: boolean) {
    if (hour < 12) {
      return 'ص';
    } else {
      return 'م';
    }
  },
  calendar: {
    sameDay: '[اليوم عند الساعة] LT',
    nextDay: '[غدًا عند الساعة] LT',
    nextWeek: 'dddd [عند الساعة] LT',
    lastDay: '[أمس عند الساعة] LT',
    lastWeek: 'dddd [عند الساعة] LT',
    sameElse: 'L',
  },
  relativeTime: {
    future: 'بعد %s',
    past: 'منذ %s',
    s: pluralize('s'),
    ss: pluralize('s'),
    m: pluralize('m'),
    mm: pluralize('m'),
    h: pluralize('h'),
    hh: pluralize('h'),
    d: pluralize('d'),
    dd: pluralize('d'),
    M: pluralize('M'),
    MM: pluralize('M'),
    y: pluralize('y'),
    yy: pluralize('y'),
  },
  preparse(str: string): string {
    return str
      .replace(/[1234567890]/g, function (match) {
        return numberMap[match];
      })
      .replace(/،/g, ',');
  },
  postformat(str: string) {
    return str
      .replace(/\d/g, function (match) {
        return symbolMap[match];
      })
      .replace(/,/g, '،');
  },
  week: {
    dow: 6, // Saturday is the first day of the week.
    doy: 12, // The week that contains Jan 1st is the first week of the year.
  },
};
