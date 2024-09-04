import pool from "../helpers/db.js";

const getNewUsers = async (req, res, next) => {
  try {
    const { rows: newSignupsTodayResult } = await pool.query(
      "SELECT COUNT(*) AS new_signups_today FROM usr WHERE created_at >= CURRENT_DATE"
    );

    const { rows: newSignupsThisMonthResult } = await pool.query(
      "SELECT COUNT(*) AS new_signups_this_month FROM usr WHERE created_at >= date_trunc('month',CURRENT_DATE)"
    );
    const { rows: activeUsersTodayResult } = await pool.query(
      "SELECT COUNT(*) AS active_users_today FROM usr WHERE last_active >= CURRENT_DATE"
    );
    const { rows: activeUsersThisMonthResult } = await pool.query(
      " SELECT COUNT(*) AS active_users_this_month FROM usr WHERE last_active >= date_trunc('month', CURRENT_DATE)"
    );
    const { rows: newStartersTodayResult } = await pool.query(
      "SELECT COUNT(*) AS new_starters_today FROM usr WHERE role='starter' AND role_updated_at >= CURRENT_DATE"
    );

    const { rows: newStartersThisMonthResult } = await pool.query(
      "SELECT COUNT(*) AS new_starters_this_month FROM usr WHERE role='starter' AND role_updated_at >= date_trunc('month',CURRENT_DATE)"
    );
    const { rows: newPremiumsTodayResult } = await pool.query(
      "SELECT COUNT(*) AS new_premiums_today FROM usr WHERE role='premium' AND role_updated_at >= CURRENT_DATE"
    );

    const { rows: newPremiumsThisMonthResult } = await pool.query(
      "SELECT COUNT(*) AS new_premiums_this_month FROM usr WHERE role='premium' AND role_updated_at >= date_trunc('month',CURRENT_DATE)"
    );
    const { rows: totalUsers } = await pool.query(
      "SELECT COUNT(*) AS total_users FROM usr"
    );
    const { rows: totalStarters } = await pool.query(
      "SELECT COUNT(*) AS total_starters FROM usr WHERE role='starter'"
    );

    const { rows: totalPremiums } = await pool.query(
      "SELECT COUNT(*) AS total_premiums FROM usr WHERE role='premium'"
    );
    const { rows: totalVips } = await pool.query(
      "SELECT COUNT(*) AS total_vips FROM usr WHERE role='vip'"
    );

    const { rows: visitsToday } = await pool.query(
      "SELECT COUNT(DISTINCT visitor_id) AS unique_visits_today FROM visits WHERE visit_time >= CURRENT_DATE"
    );
    const { rows: visitsThisMonth } = await pool.query(
      "SELECT COUNT(DISTINCT visitor_id) AS unique_visits_this_month FROM visits WHERE visit_time >= DATE_TRUNC('month', CURRENT_DATE)"
    );

    res.status(200).json({
      newSignupsToday: parseInt(newSignupsTodayResult[0].new_signups_today, 10),
      newSignupsThisMonth: parseInt(
        newSignupsThisMonthResult[0].new_signups_this_month,
        10
      ),
      activeUsersToday: parseInt(
        activeUsersTodayResult[0].active_users_today,
        10
      ),
      activeUsersThisMonth: parseInt(
        activeUsersThisMonthResult[0].active_users_this_month,
        10
      ),
      newStartersToday: parseInt(
        newStartersTodayResult[0].new_starters_today,
        10
      ),
      newStartersThisMonth: parseInt(
        newStartersThisMonthResult[0].new_starters_this_month,
        10
      ),
      newPremiumsToday: parseInt(
        newPremiumsTodayResult[0].new_premiums_today,
        10
      ),
      newPremiumsThisMonth: parseInt(
        newPremiumsThisMonthResult[0].new_premiums_this_month,
        10
      ),
      totalUsers: parseInt(totalUsers[0].total_users, 10),
      totalStarters: parseInt(totalStarters[0].total_starters, 10),
      totalPremiums: parseInt(totalPremiums[0].total_premiums, 10),
      totalVips: parseInt(totalVips[0].total_vips, 10),
      visitsToday: parseInt(visitsToday[0].unique_visits_today, 10),
      visitsThisMonth: parseInt(
        visitsThisMonth[0].unique_visits_this_month,
        10
      ),
    });
  } catch (error) {
    next(error);
  }
};

export default getNewUsers;
