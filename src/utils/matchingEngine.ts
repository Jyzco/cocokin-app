import { Place, UserFilter } from '../types';

export function calculateSuitability(place: Place, filter: UserFilter): { score: number; reason: string } {
  let score = 0;
  const reasons: string[] = [];

  // 1. Budget Score (Weight: 25%)
  if (filter.maxBudget > 0) {
    if (place.avgBudget <= filter.maxBudget) {
      score += 25;
      reasons.push(`Budget pas (Rp ${place.avgBudget.toLocaleString('id-ID')} vs budget maks Rp ${filter.maxBudget.toLocaleString('id-ID')})`);
    } else {
      const overRatio = place.avgBudget / filter.maxBudget;
      if (overRatio <= 1.3) {
        score += 15;
        reasons.push(`Budget sedikit melampaui (${Math.round((overRatio - 1) * 100)}%)`);
      } else {
        score += 5;
      }
    }
  } else {
    score += 25;
  }

  // 2. Distance Score (Weight: 25%)
  if (filter.maxDistance > 0) {
    if (place.distanceKm <= filter.maxDistance) {
      score += 25;
      reasons.push(`Jarak dekat (${place.distanceKm} km dari lokasimu)`);
    } else {
      const distRatio = place.distanceKm / filter.maxDistance;
      if (distRatio <= 1.5) {
        score += 15;
      } else {
        score += 5;
      }
    }
  } else {
    score += 25;
  }

  // 3. Atmosphere Score (Weight: 25%)
  if (filter.atmosphere.length > 0) {
    const matchedAtmos = filter.atmosphere.filter(a => place.atmosphere.includes(a));
    const atmosRatio = matchedAtmos.length / filter.atmosphere.length;
    score += Math.round(atmosRatio * 25);
    if (matchedAtmos.length > 0) {
      reasons.push(`Suasana ${matchedAtmos.join(', ')}`);
    }
  } else {
    score += 25;
  }

  // 4. Facilities Score (Weight: 25%)
  if (filter.facilities.length > 0) {
    const matchedFacs = filter.facilities.filter(f => place.facilities.includes(f));
    const facsRatio = matchedFacs.length / filter.facilities.length;
    score += Math.round(facsRatio * 25);
    if (matchedFacs.length > 0) {
      reasons.push(`Fasilitas lengkap (${matchedFacs.slice(0, 2).join(', ')})`);
    }
  } else {
    score += 25;
  }

  // Bonus/Activity alignment
  if (filter.activity && filter.activity !== 'Semua' && place.activities.includes(filter.activity)) {
    reasons.unshift(`Ideal untuk ${filter.activity}`);
  }

  // Ensure bounded between 50 and 99
  const finalScore = Math.min(99, Math.max(52, score));
  const summaryReason = reasons.length > 0 ? reasons.slice(0, 3).join(' • ') : place.matchReason;

  return {
    score: finalScore,
    reason: summaryReason
  };
}

export function rankPlaces(places: Place[], filter: UserFilter): Place[] {
  return places
    .map(place => {
      const { score, reason } = calculateSuitability(place, filter);
      return {
        ...place,
        suitabilityScore: score,
        matchReason: reason
      };
    })
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}
