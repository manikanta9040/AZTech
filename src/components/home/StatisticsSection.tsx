import { motion } from 'framer-motion';
import { Calendar, Globe, Users, GraduationCap, type LucideIcon } from 'lucide-react';
import { mockStatistics, type StatisticItem } from '../../data/statistics';

const statIcons: Record<StatisticItem['iconName'], LucideIcon> = {
  Calendar,
  Globe,
  Users,
  GraduationCap,
};

export function StatisticsSection() {
  return (
    <section className="az-stats-section" aria-labelledby="stats-heading">
      <div className="az-container">
        <h2 id="stats-heading" className="sr-only">
          AZTech Key Statistics & Global Reach
        </h2>

        <div className="az-stats-grid">
          {mockStatistics.map((stat, i) => {
            const Icon = statIcons[stat.iconName] || Users;
            return (
              <motion.div
                key={stat.id}
                className="az-stat-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="az-stat-card__icon-wrap">
                  <Icon size={24} className="az-stat-card__icon" aria-hidden="true" />
                </div>
                <div className="az-stat-card__value">{stat.value}</div>
                <div className="az-stat-card__label">{stat.label}</div>
                <p className="az-stat-card__desc az-caption">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StatisticsSection;
