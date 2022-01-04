import ChipIcon from '../../../../common/icons/outline/ChipIcon';
import CloudIcon from '../../../../common/icons/outline/CloudIcon';
import CogIcon from '../../../../common/icons/outline/CogIcon';
import CurrencyPoundIcon from '../../../../common/icons/outline/CurrencyPoundIcon';
import QuestionMarkIcon from '../../../../common/icons/outline/QuestionMarkIcon';
import AdvisorInfo from '../../../../common/types/AdvisorInfo';

const Advisors: AdvisorInfo[] = [
  {
    title: 'Price-Focused',
    features: [
      'Focuses on the reduction of the total cost of all instances.',
      'Best for long-running services with relaxed availability guarantees.',
    ],
    icon: CurrencyPoundIcon,
    isConfigurable: false,
    advisor: {
      type: 'weighted',
      weights: {
        availability: 0.2,
        performance: 0.2,
        price: 0.6,
      },
    },
  },
  {
    title: 'Performance-Focused',
    features: [
      'Focuses on selecting resources with the most powerful CPUs.',
      'Best for services which rely on a lot of parallel computation.',
    ],
    icon: ChipIcon,
    isConfigurable: false,
    advisor: {
      type: 'weighted',
      weights: {
        availability: 0.2,
        performance: 0.6,
        price: 0.2,
      },
    },
  },
  {
    title: 'Availability-Focused',
    features: [
      'Focuses on selecting resources with the highest availability.',
      'Best for services which are central to the functionality of applications.',
    ],
    icon: CloudIcon,
    isConfigurable: false,
    advisor: {
      type: 'weighted',
      weights: {
        availability: 0.6,
        performance: 0.2,
        price: 0.2,
      },
    },
  },
  {
    title: 'Random',
    features: [
      'Selects a random instance which has at least the minimum required memory.',
      'Useful for benchmarks, but not recommended for real-world use.',
    ],
    icon: QuestionMarkIcon,
    isConfigurable: false,
    advisor: {
      type: 'random',
      weights: {
        availability: 0,
        performance: 0,
        price: 0,
      },
    },
  },
  {
    title: 'Custom',
    features: ['Configure how instances should be selected to your liking.'],
    icon: CogIcon,
    isConfigurable: true,
    advisor: {
      type: 'weighted',
      weights: {
        availability: 0.33,
        performance: 0.33,
        price: 0.33,
      },
    },
  },
];
export default Advisors;
