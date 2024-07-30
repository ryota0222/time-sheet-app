import utc from 'dayjs/plugin/utc'; // ES 2015

import timezone from 'dayjs/plugin/timezone'; // ES 2015
import dayjs from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;
