export default function formatApiData(data) {
  return data.map((el) => {
    if (
      el.day === '01' ||
      el.day === '05' ||
      el.day === '10' ||
      el.day === '15' ||
      el.day === '20' ||
      el.day === '25' ||
      el.day === '30'
    ) {
      return el;
    } else {
      el.day = '';
      return el;
    }
  });
}
