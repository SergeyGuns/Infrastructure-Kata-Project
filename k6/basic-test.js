import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // Ramp up to 20 VUs
    { duration: '1m', target: 20 },    // Stay at 20 VUs
    { duration: '30s', target: 0 },    // Ramp down to 0 VUs
  ],
};

export default function () {
  const response = http.get('http://nginx:80/health');
  check(response, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}