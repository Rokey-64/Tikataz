import { MeiliSearch } from 'meilisearch';
import 'dotenv/config';
import './database/mongo.js';
import tagModel from './models/tagModel.js';

const meiliClient = new MeiliSearch({
  host: process.env.MEILI_HOST,
  apiKey: process.env.MEILI_API_KEY,
});

const index = meiliClient.index('tags'); // tên index tùy bạn chọn

async function syncData() {
  try {
    const docs = await tagModel.find({}).lean(); // lấy dữ liệu từ Mongo

    const transformedDocs = docs.map(doc => {
      const {
        _id,
        description = {},
        company = {},
        prediction = {}
      } = doc;

      const combinedText = [
        description.description,
        ...(description.intro || []),
        company.companyname,
        company.title,
        ...(prediction.keywords || [])
      ].filter(Boolean); // lọc null, undefined, ''

      return {
        id: _id.toString(), // Meili cần chuỗi cho ID
        keywords: combinedText
      };
    });

    const res = await index.addDocuments(transformedDocs);
    console.log('Documents added to MeiliSearch:', res);

  } catch (error) {
    console.error('Error syncing to MeiliSearch:', error);
  }
}

syncData();