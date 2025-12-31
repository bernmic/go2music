package mongodb

import (
	"context"
	"go2music/database"
	"go2music/model"
	"time"

	"github.com/rs/xid"
	log "github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func (db *MongoDB) CreateUser(user model.User) (*model.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	user.Id = xid.New().String()
	user.Password, _ = database.HashPassword(user.Password)
	_, err := db.UsersCollection.InsertOne(ctx, user)
	if err != nil {
		return nil, err
	}
	log.Infof("new user %s added", user.Username)

	return &user, nil
}

func (db *MongoDB) CreateIfNotExistsUser(user model.User) (*model.User, error) {
	u, err := db.FindUserByUsername(user.Username)
	if err == nil {
		return u, nil
	}
	return db.CreateUser(user)
}

func (db *MongoDB) UpdateUser(user model.User) (*model.User, error) {
	log.Fatalf("update user not implemented")
	return &user, nil
}

func (db *MongoDB) DeleteUser(id string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	dr, err := db.UsersCollection.DeleteOne(ctx, bson.D{{"Id", id}})
	if err != nil {
		return err
	}
	if dr.DeletedCount != 1 {
		log.Warnf("expected to delete 1 user, deleted %d", dr.DeletedCount)
	}
	return nil
}

func (db *MongoDB) FindUserById(id string) (*model.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	result := model.User{}
	err := db.UsersCollection.FindOne(ctx, bson.D{{"id", id}}).Decode(&result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (db *MongoDB) FindUserByUsername(username string) (*model.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	result := model.User{}
	err := db.UsersCollection.FindOne(ctx, bson.D{{"username", username}}).Decode(&result)
	if err != nil {
		return nil, err
	}

	return &result, nil
}

func (db *MongoDB) FindAllUsers(filter string, paging model.Paging) ([]*model.User, int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	findOptions := options.Find()
	findOptions.SetSort(buildSort(paging))
	pageSize := int64(paging.Size)
	if pageSize == 0 {
		pageSize = int64(10)
	}
	if pageSize >= 0 {
		findOptions.SetLimit(pageSize)
		findOptions.SetSkip(pageSize * int64(paging.Page))
	}
	filterMap := make(map[string]string)
	if filter != "" {
		filterMap["Username"] = filter
	}
	cur, err := db.UsersCollection.Find(ctx, buildFilter(filterMap), findOptions)
	if err != nil {
		return nil, 0, err
	}
	defer func() {
		err := cur.Close(ctx)
		if err != nil {
			log.Warning("failed to close cursor")
		}
	}()
	users := make([]*model.User, 0)
	for cur.Next(ctx) {
		var result model.User
		if err := cur.Decode(&result); err != nil {
			return nil, 0, err
		}
		users = append(users, &result)
	}
	if err := cur.Err(); err != nil {
		return nil, 0, err
	}
	return users, len(users), nil
}
