import { Injectable } from '@nestjs/common';
import { Logger } from 'log4js';
import { getLogger } from '../../common';
import { MysqlService } from '../../mysql2';
import { User } from '../bean/user.bean';
import { UserPage } from '../interfaces/user.page.interface';
import { SqlGenerator } from 'mysqlnard';

@Injectable()
export class UserDao {
  private logger: Logger = getLogger(UserDao.name);

  constructor(private readonly mysqlService: MysqlService) {}

  async getUserByPage(pageOffset, pageNumber): Promise<UserPage> {
    const sql = new SqlGenerator('select')
      .field({
        user_name: 'username',
        id: 'id',
        pin: 'pin',
        nick_name: 'nickName',
        user_id: 'userId',
        account_non_expired: 'accountNonExpired',
        account_non_locked: 'accountNonLocked',
        credentials_non_expired: 'accountNonLocked',
        enable: 'enable',
        mail: 'mail',
        mail_code: 'mailCode',
        age_level: 'ageLevel',
        client_limit: 'clientLimit',
        avatar: 'avatar',
        auth_type: 'authType',
        create_at: 'createAt',
        update_at: 'updateAt',
        is_admin: 'isAdmin',
      })
      .limit(pageOffset, pageNumber)
      .from('tf_b_user')
      .build();

    const countSql = new SqlGenerator('select')
      .field({
        'count(id)': 'total',
      })
      .from('tf_b_user')
      .build();

    const [userList] = await this.mysqlService.execute(sql);
    const [userCount] = await this.mysqlService.execute(countSql);
    const count: number = (userCount[0]['total'] as number) || 0;
    const users: User[] = userList as User[];
    return {
      users,
      count,
    };
  }

  async saveUser(user: User): Promise<boolean> {
    const sql = new SqlGenerator('insert')
      .into({
        id: user.id,
        user_name: user.username,
        nick_name: user.nickName,
        user_id: user.userId,
        account_non_expired: user.accountNonExpired,
        account_non_locked: user.accountNonLocked,
        credentials_non_expired: user.credentialsNonExpired,
        enable: user.enable,
        mail: user.mail,
        mail_code: user.mailCode,
        age_level: user.ageLevel,
        client_limit: user.clientLimit,
        avatar: user.avatar,
        auth_type: user.authType,
        is_admin: user.isAdmin,
      })
      .from('tf_b_user')
      .build();
    const [changeRow] = await this.mysqlService.execute(sql);
    this.logger.debug('[saveUser] changeRow', changeRow);
    if (changeRow) {
      return true;
    }
    return false;
  }
}
